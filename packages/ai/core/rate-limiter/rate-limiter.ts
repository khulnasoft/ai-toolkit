import { EnhancedTelemetryCollector } from '../telemetry/enhanced-telemetry';

/**
 * Rate limit configuration for a specific provider or endpoint.
 */
export interface RateLimitConfig {
  /** Maximum number of requests allowed */
  maxRequests: number;

  /** Time window in milliseconds */
  windowMs: number;

  /** Minimum delay between requests in milliseconds */
  minDelayMs?: number;

  /** Burst limit - allow extra requests in a short burst */
  burstLimit?: number;

  /** Burst window in milliseconds */
  burstWindowMs?: number;
}

/**
 * Rate limit status for a specific identifier.
 */
export interface RateLimitStatus {
  /** Number of requests remaining in current window */
  remaining: number;

  /** When the current window resets (timestamp) */
  resetTime: number;

  /** Total requests allowed in window */
  total: number;

  /** Whether the request would be allowed */
  allowed: boolean;

  /** Delay in milliseconds until next request is allowed */
  retryAfter?: number;
}

/**
 * Rate limit entry tracking requests for an identifier.
 */
interface RateLimitEntry {
  requests: number[];
  lastRequest: number;
  burstRequests: number[];
}

/**
 * Advanced rate limiter with burst handling and intelligent backoff.
 */
export class RateLimiter {
  private limits = new Map<string, RateLimitEntry>();
  private config: Map<string, RateLimitConfig>;
  private telemetryCollector?: EnhancedTelemetryCollector;

  constructor(
    config: Record<string, RateLimitConfig> = {},
    options: {
      telemetryCollector?: EnhancedTelemetryCollector;
    } = {},
  ) {
    this.config = new Map(Object.entries(config));
    this.telemetryCollector = options.telemetryCollector;
  }

  /**
   * Set rate limit configuration for a provider/endpoint.
   */
  setLimit(identifier: string, config: RateLimitConfig): void {
    this.config.set(identifier, config);
  }

  /**
   * Remove rate limit configuration for a provider/endpoint.
   */
  removeLimit(identifier: string): void {
    this.config.delete(identifier);
  }

  /**
   * Check if a request is allowed and update rate limit counters.
   */
  checkLimit(identifier: string): RateLimitStatus {
    const config = this.config.get(identifier);
    if (!config) {
      // No rate limit configured, allow all requests
      return {
        remaining: Infinity,
        resetTime: 0,
        total: Infinity,
        allowed: true,
      };
    }

    const now = Date.now();
    let entry = this.limits.get(identifier);

    if (!entry) {
      entry = {
        requests: [],
        lastRequest: 0,
        burstRequests: [],
      };
      this.limits.set(identifier, entry);
    }

    // Clean old requests outside the window
    this.cleanOldRequests(entry, config, now);

    // Check burst limits
    const burstStatus = this.checkBurstLimit(entry, config, now);
    if (!burstStatus.allowed) {
      this.recordRateLimitHit(identifier, 'burst');

      return {
        remaining: 0,
        resetTime: now + (config.burstWindowMs || 1000),
        total: config.burstLimit || 0,
        allowed: false,
        retryAfter: config.burstWindowMs || 1000,
      };
    }

    // Check main rate limit
    if (entry.requests.length >= config.maxRequests) {
      const oldestRequest = Math.min(...entry.requests);
      const resetTime = oldestRequest + config.windowMs;

      this.recordRateLimitHit(identifier, 'main');

      return {
        remaining: 0,
        resetTime,
        total: config.maxRequests,
        allowed: false,
        retryAfter: Math.max(0, resetTime - now),
      };
    }

    // Check minimum delay between requests
    if (config.minDelayMs && now - entry.lastRequest < config.minDelayMs) {
      this.recordRateLimitHit(identifier, 'delay');

      return {
        remaining: entry.requests.length,
        resetTime: entry.lastRequest + config.minDelayMs,
        total: config.maxRequests,
        allowed: false,
        retryAfter: config.minDelayMs - (now - entry.lastRequest),
      };
    }

    // Request is allowed
    this.recordRequest(entry, now);
    this.recordRateLimitHit(identifier, 'allowed');

    return {
      remaining: config.maxRequests - entry.requests.length - 1,
      resetTime: Math.min(...entry.requests) + config.windowMs,
      total: config.maxRequests,
      allowed: true,
    };
  }

  /**
   * Get current rate limit status without consuming a request.
   */
  getStatus(identifier: string): RateLimitStatus | null {
    const config = this.config.get(identifier);
    if (!config) return null;

    const now = Date.now();
    const entry = this.limits.get(identifier);

    if (!entry) {
      return {
        remaining: config.maxRequests,
        resetTime: now + config.windowMs,
        total: config.maxRequests,
        allowed: true,
      };
    }

    this.cleanOldRequests(entry, config, now);

    if (entry.requests.length >= config.maxRequests) {
      const oldestRequest = Math.min(...entry.requests);
      return {
        remaining: 0,
        resetTime: oldestRequest + config.windowMs,
        total: config.maxRequests,
        allowed: false,
        retryAfter: Math.max(0, oldestRequest + config.windowMs - now),
      };
    }

    return {
      remaining: config.maxRequests - entry.requests.length,
      resetTime: Math.min(...entry.requests) + config.windowMs,
      total: config.maxRequests,
      allowed: true,
    };
  }

  /**
   * Reset rate limit counters for an identifier.
   */
  reset(identifier: string): void {
    this.limits.delete(identifier);
  }

  /**
   * Get all configured rate limits.
   */
  getAllLimits(): Record<string, RateLimitConfig> {
    const result: Record<string, RateLimitConfig> = {};
    for (const [key, value] of this.config.entries()) {
      result[key] = value;
    }
    return result;
  }

  private cleanOldRequests(
    entry: RateLimitEntry,
    config: RateLimitConfig,
    now: number,
  ): void {
    const windowStart = now - config.windowMs;

    // Clean main requests
    entry.requests = entry.requests.filter(time => time > windowStart);

    // Clean burst requests
    if (config.burstWindowMs) {
      const burstWindowStart = now - config.burstWindowMs;
      entry.burstRequests = entry.burstRequests.filter(
        time => time > burstWindowStart,
      );
    }
  }

  private checkBurstLimit(
    entry: RateLimitEntry,
    config: RateLimitConfig,
    now: number,
  ): { allowed: boolean } {
    if (!config.burstLimit || !config.burstWindowMs) {
      return { allowed: true };
    }

    const burstWindowStart = now - config.burstWindowMs;

    // Clean old burst requests
    entry.burstRequests = entry.burstRequests.filter(
      time => time > burstWindowStart,
    );

    return {
      allowed: entry.burstRequests.length < config.burstLimit,
    };
  }

  private recordRequest(entry: RateLimitEntry, now: number): void {
    entry.requests.push(now);
    entry.lastRequest = now;

    // Also record in burst tracking if enabled
    const config = this.config.get(
      Object.keys(this.config).find(key => this.limits.get(key) === entry)!,
    );

    if (config?.burstLimit) {
      entry.burstRequests.push(now);
    }
  }

  private recordRateLimitHit(identifier: string, type: string): void {
    if (this.telemetryCollector) {
      // Record rate limiting event for analytics
      this.telemetryCollector.recordCacheHit(type === 'allowed'); // Using cache hit as a proxy for success
    }
  }
}

/**
 * Default rate limit configurations for popular AI providers.
 */
export const DEFAULT_RATE_LIMITS: Record<string, RateLimitConfig> = {
  openai: {
    maxRequests: 10000, // 10k requests per minute
    windowMs: 60 * 1000,
    minDelayMs: 100, // 100ms between requests
    burstLimit: 50,
    burstWindowMs: 1000,
  },
  anthropic: {
    maxRequests: 1000, // 1k requests per minute
    windowMs: 60 * 1000,
    minDelayMs: 1000, // 1 second between requests
    burstLimit: 10,
    burstWindowMs: 1000,
  },
  google: {
    maxRequests: 2400, // 2.4k requests per minute
    windowMs: 60 * 1000,
    minDelayMs: 25, // 25ms between requests
    burstLimit: 100,
    burstWindowMs: 1000,
  },
};

/**
 * Global rate limiter instance.
 */
let globalRateLimiter: RateLimiter | null = null;

/**
 * Get or create the global rate limiter instance.
 */
export function getGlobalRateLimiter(
  config: Record<string, RateLimitConfig> = DEFAULT_RATE_LIMITS,
  options: { telemetryCollector?: EnhancedTelemetryCollector } = {},
): RateLimiter {
  if (!globalRateLimiter) {
    globalRateLimiter = new RateLimiter(config, options);
  }
  return globalRateLimiter;
}

/**
 * Create a new rate limiter instance with custom configuration.
 */
export function createRateLimiter(
  config: Record<string, RateLimitConfig>,
  options: { telemetryCollector?: EnhancedTelemetryCollector } = {},
): RateLimiter {
  return new RateLimiter(config, options);
}
