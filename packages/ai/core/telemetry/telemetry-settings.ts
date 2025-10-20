import { AttributeValue, Tracer } from '@opentelemetry/api';
import { PerformanceMonitoringConfig } from './performance-monitor';

/**
 * Telemetry configuration.
 */
// This is meant to be both flexible for custom app requirements (metadata)
// and extensible for standardization (example: functionId, more to come).
export type TelemetrySettings = {
  /**
   * Enable or disable telemetry. Disabled by default while experimental.
   */
  isEnabled?: boolean;

  /**
   * Enable or disable input recording. Enabled by default.
   *
   * You might want to disable input recording to avoid recording sensitive
   * information, to reduce data transfers, or to increase performance.
   */
  recordInputs?: boolean;

  /**
   * Enable or disable output recording. Enabled by default.
   *
   * You might want to disable output recording to avoid recording sensitive
   * information, to reduce data transfers, or to increase performance.
   */
  recordOutputs?: boolean;

  /**
   * Identifier for this function. Used to group telemetry data by function.
   */
  functionId?: string;

  /**
   * Additional information to include in the telemetry data.
   */
  metadata?: Record<string, AttributeValue>;

  /**
   * A custom tracer to use for the telemetry data.
   */
  tracer?: Tracer;

  /**
   * Enhanced telemetry settings for detailed analytics.
   */
  enhanced?: {
    /**
     * Enable detailed performance metrics collection.
     */
    enablePerformanceMonitoring?: boolean;

    /**
     * Enable token usage tracking.
     */
    enableTokenTracking?: boolean;

    /**
     * Enable cache hit/miss tracking.
     */
    enableCacheTracking?: boolean;

    /**
     * Enable detailed timing metrics.
     */
    enableDetailedTiming?: boolean;

    /**
     * Custom analytics endpoint for exporting metrics.
     */
    analyticsEndpoint?: string;

    /**
     * Performance monitoring configuration.
     */
    performanceMonitoring?: PerformanceMonitoringConfig;
  };
};
