import type { Attributes, Tracer } from '@opentelemetry/api';
import type { TelemetrySettings } from './telemetry-settings';

/**
 * System performance metrics.
 */
export interface SystemPerformanceMetrics {
  /** Memory information */
  memory: {
    used: number;
    total: number;
    percentage: number;
    heapUsed: number;
    heapTotal: number;
  };

  /** CPU information (if available) */
  cpu?: {
    usage: number;
    cores: number;
  };

  /** Network information */
  network?: {
    latency: number;
    bandwidth?: number;
  };

  /** Runtime information */
  runtime: {
    nodeVersion: string;
    platform: string;
    arch: string;
    uptime: number;
  };
}

/**
 * Performance monitoring configuration.
 */
export interface PerformanceMonitoringConfig {
  /** Enable memory monitoring */
  enableMemoryMonitoring?: boolean;

  /** Enable CPU monitoring (Node.js only) */
  enableCpuMonitoring?: boolean;

  /** Enable network monitoring */
  enableNetworkMonitoring?: boolean;

  /** Monitoring interval in milliseconds */
  interval?: number;

  /** Memory sampling interval */
  memorySamplingInterval?: number;
}

/**
 * Performance monitor for tracking system resources and application performance.
 */
export class PerformanceMonitor {
  private config: Required<PerformanceMonitoringConfig>;
  private intervals: Set<NodeJS.Timeout> = new Set();
  private memoryHistory: Array<{ timestamp: number; used: number }> = [];
  private isMonitoring = false;

  constructor(
    private tracer: Tracer,
    config: PerformanceMonitoringConfig = {},
  ) {
    this.config = {
      enableMemoryMonitoring: config.enableMemoryMonitoring ?? true,
      enableCpuMonitoring: config.enableCpuMonitoring ?? false,
      enableNetworkMonitoring: config.enableNetworkMonitoring ?? false,
      interval: config.interval ?? 5000, // 5 seconds
      memorySamplingInterval: config.memorySamplingInterval ?? 1000, // 1 second
    };
  }

  /**
   * Start performance monitoring.
   */
  start(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;

    // Memory monitoring
    if (this.config.enableMemoryMonitoring) {
      this.startMemoryMonitoring();
    }

    // CPU monitoring (Node.js only)
    if (this.config.enableCpuMonitoring && typeof process !== 'undefined') {
      this.startCpuMonitoring();
    }

    // Network monitoring
    if (this.config.enableNetworkMonitoring) {
      this.startNetworkMonitoring();
    }

    // Periodic system metrics collection
    this.startPeriodicMetrics();
  }

  /**
   * Stop performance monitoring.
   */
  stop(): void {
    this.isMonitoring = false;

    // Clear all intervals
    for (const interval of this.intervals) {
      clearInterval(interval);
    }
    this.intervals.clear();
  }

  /**
   * Get current system performance metrics.
   */
  getCurrentMetrics(): SystemPerformanceMetrics {
    return {
      memory: this.getMemoryMetrics(),
      cpu: this.getCpuMetrics(),
      network: this.getNetworkMetrics(),
      runtime: this.getRuntimeMetrics(),
    };
  }

  /**
   * Get memory usage history.
   */
  getMemoryHistory(): Array<{ timestamp: number; used: number }> {
    return [...this.memoryHistory];
  }

  /**
   * Export metrics as OpenTelemetry attributes.
   */
  exportAsAttributes(): Attributes {
    const metrics = this.getCurrentMetrics();

    return {
      'system.memory.used_mb': Math.round(metrics.memory.used / 1024 / 1024),
      'system.memory.total_mb': Math.round(metrics.memory.total / 1024 / 1024),
      'system.memory.percentage': Math.round(metrics.memory.percentage),
      'system.memory.heap_used_mb': Math.round(
        metrics.memory.heapUsed / 1024 / 1024,
      ),
      'system.memory.heap_total_mb': Math.round(
        metrics.memory.heapTotal / 1024 / 1024,
      ),
      'system.runtime.uptime_seconds': Math.round(
        metrics.runtime.uptime / 1000,
      ),
      'system.runtime.node_version': metrics.runtime.nodeVersion,
      'system.runtime.platform': metrics.runtime.platform,
      'system.runtime.arch': metrics.runtime.arch,
      ...(metrics.cpu && {
        'system.cpu.usage_percentage':
          Math.round(metrics.cpu.usage * 100) / 100,
        'system.cpu.cores': metrics.cpu.cores,
      }),
      ...(metrics.network && {
        'system.network.latency_ms': metrics.network.latency,
      }),
    };
  }

  private startMemoryMonitoring(): void {
    const interval = setInterval(() => {
      if (!this.isMonitoring) return;

      const memoryMetrics = this.getMemoryMetrics();
      this.memoryHistory.push({
        timestamp: Date.now(),
        used: memoryMetrics.used,
      });

      // Keep only last 100 samples
      if (this.memoryHistory.length > 100) {
        this.memoryHistory.shift();
      }
    }, this.config.memorySamplingInterval);

    this.intervals.add(interval);
  }

  private startCpuMonitoring(): void {
    if (typeof process === 'undefined') return;

    // CPU monitoring for Node.js
    const interval = setInterval(() => {
      if (!this.isMonitoring) return;

      const cpuUsage = process.cpuUsage();
      const totalCpu = process.cpuUsage();

      // This is a simplified CPU calculation
      // In a real implementation, you'd want to track over time
      if (this.tracer) {
        // Record CPU metrics as events
        this.tracer.startActiveSpan('cpu.monitoring').end();
      }
    }, this.config.interval);

    this.intervals.add(interval);
  }

  private startNetworkMonitoring(): void {
    // Network monitoring would typically involve measuring latency to key endpoints
    const interval = setInterval(() => {
      if (!this.isMonitoring) return;

      // In a real implementation, you might ping key services
      // For now, we'll just record that monitoring is active
      if (this.tracer) {
        this.tracer.startActiveSpan('network.monitoring').end();
      }
    }, this.config.interval);

    this.intervals.add(interval);
  }

  private startPeriodicMetrics(): void {
    const interval = setInterval(() => {
      if (!this.isMonitoring) return;

      // Export current metrics as span events
      const attributes = this.exportAsAttributes();

      if (this.tracer && Object.keys(attributes).length > 0) {
        const span = this.tracer.startSpan('performance.metrics');
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value as any);
        });
        span.end();
      }
    }, this.config.interval);

    this.intervals.add(interval);
  }

  private getMemoryMetrics() {
    const memory = (performance as any).memory || {};

    return {
      used: memory.usedJSHeapSize || 0,
      total: memory.totalJSHeapSize || 0,
      percentage: memory.totalJSHeapSize
        ? (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
        : 0,
      heapUsed: memory.usedJSHeapSize || 0,
      heapTotal: memory.totalJSHeapSize || 0,
    };
  }

  private getCpuMetrics() {
    if (typeof process === 'undefined') return undefined;

    return {
      usage: 0, // Would need more sophisticated tracking
      cores: require('os').cpus().length,
    };
  }

  private getNetworkMetrics() {
    // Network metrics would require actual network requests
    // This is a placeholder for future implementation
    return {
      latency: 0,
    };
  }

  private getRuntimeMetrics() {
    return {
      nodeVersion: process?.version || 'unknown',
      platform: process?.platform || 'unknown',
      arch: process?.arch || 'unknown',
      uptime: process?.uptime ? process.uptime() * 1000 : 0,
    };
  }
}
