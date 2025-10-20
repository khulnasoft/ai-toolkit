import { EnhancedTelemetryCollector } from '../telemetry/enhanced-telemetry';

/**
 * Cache entry for AI responses.
 */
export interface CacheEntry<T = any> {
  /** The cached response data */
  data: T;

  /** Timestamp when this entry was created */
  createdAt: number;

  /** Timestamp when this entry was last accessed */
  accessedAt: number;

  /** Number of times this entry has been accessed */
  accessCount: number;

  /** Time-to-live in milliseconds */
  ttl: number;

  /** Cache key used to store this entry */
  key: string;

  /** Metadata about the cached response */
  metadata?: {
    model?: string;
    provider?: string;
    tokensUsed?: number;
    responseTime?: number;
  };
}

/**
 * Cache configuration options.
 */
export interface CacheConfig {
  /** Maximum number of entries to keep in cache */
  maxEntries?: number;

  /** Default TTL for cache entries in milliseconds */
  defaultTtl?: number;

  /** Maximum memory usage in MB */
  maxMemoryUsage?: number;

  /** Cache storage strategy */
  storage?: 'memory' | 'localStorage' | 'indexedDB';

  /** Enable cache statistics tracking */
  enableStats?: boolean;

  /** Cleanup interval in milliseconds */
  cleanupInterval?: number;
}

/**
 * Cache statistics for monitoring.
 */
export interface CacheStats {
  /** Total number of cache hits */
  hits: number;

  /** Total number of cache misses */
  misses: number;

  /** Hit rate percentage */
  hitRate: number;

  /** Total number of entries in cache */
  entryCount: number;

  /** Total memory usage in bytes */
  memoryUsage: number;

  /** Average response time for cached responses */
  averageResponseTime: number;

  /** Number of evictions due to TTL */
  evictions: number;
}

/**
 * Intelligent cache for AI responses with advanced features.
 */
export class IntelligentCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    hitRate: 0,
    entryCount: 0,
    memoryUsage: 0,
    averageResponseTime: 0,
    evictions: 0,
  };

  private config: Required<CacheConfig>;
  private cleanupInterval?: NodeJS.Timeout;
  private telemetryCollector?: EnhancedTelemetryCollector;

  constructor(config: CacheConfig = {}) {
    this.config = {
      maxEntries: config.maxEntries ?? 1000,
      defaultTtl: config.defaultTtl ?? 5 * 60 * 1000, // 5 minutes
      maxMemoryUsage: config.maxMemoryUsage ?? 100, // 100MB
      storage: config.storage ?? 'memory',
      enableStats: config.enableStats ?? true,
      cleanupInterval: config.cleanupInterval ?? 60 * 1000, // 1 minute
    };

    this.startCleanupInterval();
  }

  /**
   * Set the telemetry collector for cache analytics.
   */
  setTelemetryCollector(collector: EnhancedTelemetryCollector): void {
    this.telemetryCollector = collector;
  }

  /**
   * Generate a cache key from request parameters.
   */
  generateKey(params: {
    model?: string;
    messages?: any[];
    prompt?: string;
    system?: string;
    temperature?: number;
    maxTokens?: number;
    [key: string]: any;
  }): string {
    // Create a normalized representation of the request
    const normalized = {
      model: params.model || 'unknown',
      messages: params.messages || [],
      prompt: params.prompt || '',
      system: params.system || '',
      temperature: params.temperature ?? 0,
      maxTokens: params.maxTokens ?? 0,
    };

    // Create a hash of the normalized parameters
    const hashInput = JSON.stringify(normalized);
    let hash = 0;

    for (let i = 0; i < hashInput.length; i++) {
      const char = hashInput.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return `${normalized.model}_${Math.abs(hash)}`;
  }

  /**
   * Store a response in the cache.
   */
  set(key: string, data: T, metadata?: CacheEntry<T>['metadata']): void {
    const now = Date.now();

    const entry: CacheEntry<T> = {
      data,
      createdAt: now,
      accessedAt: now,
      accessCount: 0,
      ttl: metadata?.responseTime
        ? Math.max(this.config.defaultTtl, metadata.responseTime * 2)
        : this.config.defaultTtl,
      key,
      metadata,
    };

    // Check if we need to evict entries
    this.evictIfNecessary();

    this.cache.set(key, entry);
    this.updateStats();

    if (this.telemetryCollector) {
      this.telemetryCollector.recordCacheHit(false); // Cache miss that led to set
    }
  }

  /**
   * Retrieve a response from the cache.
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.recordMiss();
      return null;
    }

    // Check if entry has expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.recordMiss();
      this.stats.evictions++;
      return null;
    }

    // Update access statistics
    entry.accessedAt = Date.now();
    entry.accessCount++;

    this.recordHit();

    if (this.telemetryCollector) {
      this.telemetryCollector.recordCacheHit(true);
    }

    return entry.data;
  }

  /**
   * Check if a cache entry exists and is valid.
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry !== undefined && !this.isExpired(entry);
  }

  /**
   * Remove a specific entry from the cache.
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
    this.updateStats();
  }

  /**
   * Get cache statistics.
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Get all cache keys (for debugging).
   */
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Export cache data for persistence.
   */
  export(): Array<{ key: string; entry: CacheEntry<T> }> {
    return Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      entry: { ...entry },
    }));
  }

  /**
   * Import cache data from persistence.
   */
  import(data: Array<{ key: string; entry: CacheEntry<T> }>): void {
    this.clear();

    for (const { key, entry } of data) {
      // Only import non-expired entries
      if (!this.isExpired(entry)) {
        this.cache.set(key, entry);
      }
    }

    this.updateStats();
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.createdAt > entry.ttl;
  }

  private evictIfNecessary(): void {
    // Evict expired entries first
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        this.stats.evictions++;
      }
    }

    // If still over capacity, evict least recently used entries
    if (this.cache.size >= this.config.maxEntries) {
      this.evictLRU();
    }
  }

  private evictLRU(): void {
    // Find the least recently used entry
    let lruKey: string | null = null;
    let lruTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.accessedAt < lruTime) {
        lruTime = entry.accessedAt;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
      this.stats.evictions++;
    }
  }

  private recordHit(): void {
    this.stats.hits++;
    this.updateHitRate();
  }

  private recordMiss(): void {
    this.stats.misses++;
    this.updateHitRate();
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  private updateStats(): void {
    this.stats.entryCount = this.cache.size;
    this.stats.memoryUsage = this.estimateMemoryUsage();

    if (this.stats.hits > 0) {
      // Estimate average response time based on cached entries
      let totalResponseTime = 0;
      let count = 0;

      for (const entry of this.cache.values()) {
        if (entry.metadata?.responseTime) {
          totalResponseTime += entry.metadata.responseTime;
          count++;
        }
      }

      this.stats.averageResponseTime =
        count > 0 ? totalResponseTime / count : 0;
    }
  }

  private estimateMemoryUsage(): number {
    // Rough estimation of memory usage
    let totalSize = 0;

    for (const [key, entry] of this.cache.entries()) {
      // Estimate size of key and entry
      totalSize += key.length * 2; // UTF-16 characters
      totalSize += JSON.stringify(entry).length * 2;
    }

    return totalSize;
  }

  private startCleanupInterval(): void {
    if (this.config.cleanupInterval > 0) {
      this.cleanupInterval = setInterval(() => {
        this.evictIfNecessary();
        this.updateStats();

        if (this.telemetryCollector) {
          this.telemetryCollector.recordCacheHit(this.stats.hitRate > 0);
        }
      }, this.config.cleanupInterval);
    }
  }

  /**
   * Destroy the cache and cleanup resources.
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

/**
 * Global cache instance for AI responses.
 */
let globalCache: IntelligentCache | null = null;

/**
 * Get or create the global cache instance.
 */
export function getGlobalCache<T = any>(
  config?: CacheConfig,
): IntelligentCache<T> {
  if (!globalCache) {
    globalCache = new IntelligentCache<T>(config);
  }
  return globalCache as IntelligentCache<T>;
}

/**
 * Create a new cache instance with custom configuration.
 */
export function createCache<T = any>(config: CacheConfig): IntelligentCache<T> {
  return new IntelligentCache<T>(config);
}
