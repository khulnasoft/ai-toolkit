import { Attributes, Span, Tracer } from '@opentelemetry/api';
import { TelemetrySettings } from './telemetry-settings';

/**
 * Enhanced telemetry metrics for detailed usage analytics.
 */
export interface EnhancedTelemetryMetrics {
  /** Request timing information */
  timing: {
    startTime: number;
    endTime?: number;
    duration?: number;
    networkLatency?: number;
  };

  /** Resource usage metrics */
  resources: {
    memoryUsage?: number;
    cpuUsage?: number;
    tokensUsed?: number;
    inputTokens?: number;
    outputTokens?: number;
  };

  /** Performance indicators */
  performance: {
    throughput?: number; // tokens per second
    firstTokenLatency?: number;
    timeToFirstByte?: number;
  };

  /** Quality metrics */
  quality: {
    success: boolean;
    errorType?: string;
    retryCount?: number;
    cacheHit?: boolean;
  };

  /** Usage patterns */
  usage: {
    operationType: string;
    model: string;
    provider: string;
    endpoint?: string;
    userAgent?: string;
  };
}

/**
 * Enhanced telemetry collector for comprehensive usage analytics.
 */
export class EnhancedTelemetryCollector {
  private metrics: EnhancedTelemetryMetrics;
  private span?: Span;
  private startTime: number;

  constructor(
    private tracer: Tracer,
    private telemetrySettings?: TelemetrySettings,
    private operationName: string = 'ai.operation',
  ) {
    this.startTime = performance.now();
    this.metrics = {
      timing: { startTime: this.startTime },
      resources: {},
      performance: {},
      quality: { success: true },
      usage: { operationType: 'unknown', model: '', provider: '' },
    };
  }

  /**
   * Start collecting metrics for a new operation.
   */
  startSpan(attributes: Attributes = {}): void {
    if (!this.telemetrySettings?.isEnabled) return;

    this.span = this.tracer.startSpan(this.operationName, { attributes });
  }

  /**
   * Record operation details.
   */
  recordOperation(
    operationType: string,
    model: string,
    provider: string,
  ): void {
    this.metrics.usage = {
      operationType,
      model,
      provider,
      endpoint: `${provider}/${model}`,
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    };
  }

  /**
   * Record timing information.
   */
  recordTiming(endTime?: number): void {
    const now = endTime || performance.now();
    this.metrics.timing.endTime = now;
    this.metrics.timing.duration = now - this.metrics.timing.startTime;

    if (this.span) {
      this.span.setAttribute(
        'ai.timing.duration_ms',
        this.metrics.timing.duration,
      );
    }
  }

  /**
   * Record token usage.
   */
  recordTokens(
    inputTokens?: number,
    outputTokens?: number,
    totalTokens?: number,
  ): void {
    if (inputTokens !== undefined) {
      this.metrics.resources.inputTokens = inputTokens;
      if (this.span) this.span.setAttribute('ai.tokens.input', inputTokens);
    }

    if (outputTokens !== undefined) {
      this.metrics.resources.outputTokens = outputTokens;
      if (this.span) this.span.setAttribute('ai.tokens.output', outputTokens);
    }

    if (totalTokens !== undefined) {
      this.metrics.resources.tokensUsed = totalTokens;
      if (this.span) this.span.setAttribute('ai.tokens.total', totalTokens);
    }

    // Calculate throughput if we have duration
    if (this.metrics.timing.duration && totalTokens) {
      this.metrics.performance.throughput =
        (totalTokens / this.metrics.timing.duration) * 1000;
      if (this.span)
        this.span.setAttribute(
          'ai.performance.throughput',
          this.metrics.performance.throughput,
        );
    }
  }

  /**
   * Record performance metrics.
   */
  recordPerformance(
    firstTokenLatency?: number,
    timeToFirstByte?: number,
  ): void {
    if (firstTokenLatency !== undefined) {
      this.metrics.performance.firstTokenLatency = firstTokenLatency;
      if (this.span)
        this.span.setAttribute(
          'ai.performance.first_token_latency_ms',
          firstTokenLatency,
        );
    }

    if (timeToFirstByte !== undefined) {
      this.metrics.performance.timeToFirstByte = timeToFirstByte;
      if (this.span)
        this.span.setAttribute(
          'ai.performance.time_to_first_byte_ms',
          timeToFirstByte,
        );
    }
  }

  /**
   * Record error information.
   */
  recordError(error: Error, retryCount: number = 0): void {
    this.metrics.quality.success = false;
    this.metrics.quality.errorType = error.name;
    this.metrics.quality.retryCount = retryCount;

    if (this.span) {
      this.span.recordException({
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      this.span.setStatus({ code: 2, message: error.message }); // ERROR status
    }
  }

  /**
   * Record cache hit information.
   */
  recordCacheHit(hit: boolean): void {
    this.metrics.quality.cacheHit = hit;
    if (this.span) this.span.setAttribute('ai.cache.hit', hit);
  }

  /**
   * Record network latency.
   */
  recordNetworkLatency(latency: number): void {
    this.metrics.timing.networkLatency = latency;
    if (this.span) this.span.setAttribute('ai.network.latency_ms', latency);
  }

  /**
   * Record memory usage if available.
   */
  recordMemoryUsage(): void {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const memory = (performance as any).memory;
      this.metrics.resources.memoryUsage = memory.usedJSHeapSize;

      if (this.span) {
        this.span.setAttribute(
          'ai.resources.memory_mb',
          Math.round(memory.usedJSHeapSize / 1024 / 1024),
        );
      }
    }
  }

  /**
   * Get all collected metrics.
   */
  getMetrics(): EnhancedTelemetryMetrics {
    return { ...this.metrics };
  }

  /**
   * End the telemetry collection and return final metrics.
   */
  end(): EnhancedTelemetryMetrics {
    if (this.span && !this.span.isRecording()) {
      this.recordTiming();
    }

    if (this.span) {
      this.span.end();
    }

    return this.getMetrics();
  }

  /**
   * Export metrics to external analytics service.
   */
  async exportToAnalytics(analyticsEndpoint?: string): Promise<void> {
    if (!analyticsEndpoint) return;

    try {
      const metrics = this.getMetrics();

      // In a real implementation, you would send this to your analytics service
      // For now, we'll just log it in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Telemetry Metrics:', metrics);
      }

      // Example of how you might send to an analytics service:
      // await fetch(analyticsEndpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics)
      // });
    } catch (error) {
      // Silently fail - telemetry shouldn't break the application
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to export telemetry:', error);
      }
    }
  }
}
