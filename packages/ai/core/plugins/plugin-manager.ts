import { LanguageModel, Provider } from '../types';
import { EnhancedTelemetryCollector } from '../telemetry/enhanced-telemetry';
import { IntelligentCache } from '../cache/intelligent-cache';
import { RateLimiter } from '../rate-limiter/rate-limiter';

/**
 * Plugin metadata for registration and discovery.
 */
export interface PluginMetadata {
  /** Unique identifier for the plugin */
  id: string;

  /** Human-readable name */
  name: string;

  /** Plugin version */
  version: string;

  /** Plugin description */
  description?: string;

  /** Plugin author */
  author?: string;

  /** Supported AI providers */
  providers?: string[];

  /** Plugin capabilities */
  capabilities?: string[];

  /** Plugin configuration schema */
  configSchema?: Record<string, any>;

  /** Plugin dependencies */
  dependencies?: string[];
}

/**
 * Plugin context provided to plugins.
 */
export interface PluginContext {
  /** Telemetry collector for analytics */
  telemetry?: EnhancedTelemetryCollector;

  /** Cache instance for response caching */
  cache?: IntelligentCache;

  /** Rate limiter for API management */
  rateLimiter?: RateLimiter;

  /** Plugin configuration */
  config?: Record<string, any>;

  /** Logger instance */
  logger?: {
    info: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
    debug: (message: string, ...args: any[]) => void;
  };
}

/**
 * Base plugin interface that all plugins must implement.
 */
export interface AIPlugin {
  /** Plugin metadata */
  metadata: PluginMetadata;

  /**
   * Initialize the plugin with the provided context.
   */
  initialize(context: PluginContext): Promise<void>;

  /**
   * Clean up resources when the plugin is unloaded.
   */
  destroy(): Promise<void>;

  /**
   * Check if the plugin is compatible with the current environment.
   */
  isCompatible(): boolean;
}

/**
 * Provider enhancement plugin for modifying provider behavior.
 */
export interface ProviderPlugin extends AIPlugin {
  /**
   * Enhance a language model with additional capabilities.
   */
  enhanceLanguageModel?(
    model: LanguageModel,
    provider: Provider,
    context: PluginContext,
  ): Promise<LanguageModel>;

  /**
   * Enhance a provider with additional functionality.
   */
  enhanceProvider?(
    provider: Provider,
    context: PluginContext,
  ): Promise<Provider>;
}

/**
 * Middleware plugin for intercepting and modifying requests/responses.
 */
export interface MiddlewarePlugin extends AIPlugin {
  /**
   * Process requests before they are sent to providers.
   */
  onRequest?: (request: any, context: PluginContext) => Promise<any>;

  /**
   * Process responses after they are received from providers.
   */
  onResponse?: (response: any, context: PluginContext) => Promise<any>;

  /**
   * Handle errors that occur during request processing.
   */
  onError?: (error: Error, context: PluginContext) => Promise<void>;
}

/**
 * Cache plugin for customizing caching behavior.
 */
export interface CachePlugin extends AIPlugin {
  /**
   * Determine if a request should be cached.
   */
  shouldCache?: (request: any, context: PluginContext) => Promise<boolean>;

  /**
   * Generate a custom cache key for a request.
   */
  generateCacheKey?: (request: any, context: PluginContext) => Promise<string>;

  /**
   * Validate cached responses before returning them.
   */
  validateCachedResponse?: (
    response: any,
    context: PluginContext,
  ) => Promise<boolean>;
}

/**
 * Analytics plugin for custom telemetry and monitoring.
 */
export interface AnalyticsPlugin extends AIPlugin {
  /**
   * Record custom metrics.
   */
  recordMetric?: (
    name: string,
    value: number,
    tags?: Record<string, string>,
    context?: PluginContext,
  ) => Promise<void>;

  /**
   * Record custom events.
   */
  recordEvent?: (
    event: string,
    properties?: Record<string, any>,
    context?: PluginContext,
  ) => Promise<void>;
}

/**
 * Plugin manager for loading, managing, and coordinating plugins.
 */
export class PluginManager {
  private plugins = new Map<string, AIPlugin>();
  private pluginOrder: string[] = [];
  private context: PluginContext;

  constructor(context: PluginContext = {}) {
    this.context = context;
  }

  /**
   * Register a plugin with the manager.
   */
  async register(plugin: AIPlugin): Promise<void> {
    if (this.plugins.has(plugin.metadata.id)) {
      throw new Error(`Plugin ${plugin.metadata.id} is already registered`);
    }

    // Check compatibility
    if (!plugin.isCompatible()) {
      throw new Error(
        `Plugin ${plugin.metadata.id} is not compatible with the current environment`,
      );
    }

    // Check dependencies
    if (plugin.metadata.dependencies) {
      for (const dependency of plugin.metadata.dependencies) {
        if (!this.plugins.has(dependency)) {
          throw new Error(
            `Plugin ${plugin.metadata.id} requires ${dependency} which is not registered`,
          );
        }
      }
    }

    // Initialize the plugin
    await plugin.initialize(this.context);

    // Add to registry
    this.plugins.set(plugin.metadata.id, plugin);
    this.pluginOrder.push(plugin.metadata.id);

    this.context.logger?.info(
      `Plugin ${plugin.metadata.id} registered successfully`,
    );
  }

  /**
   * Unregister a plugin from the manager.
   */
  async unregister(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} is not registered`);
    }

    // Remove from order array
    const index = this.pluginOrder.indexOf(pluginId);
    if (index > -1) {
      this.pluginOrder.splice(index, 1);
    }

    // Destroy the plugin
    await plugin.destroy();

    // Remove from registry
    this.plugins.delete(pluginId);

    this.context.logger?.info(`Plugin ${pluginId} unregistered successfully`);
  }

  /**
   * Get a registered plugin by ID.
   */
  getPlugin<T extends AIPlugin = AIPlugin>(pluginId: string): T | undefined {
    return this.plugins.get(pluginId) as T | undefined;
  }

  /**
   * Get all registered plugins.
   */
  getAllPlugins(): AIPlugin[] {
    return this.pluginOrder.map(id => this.plugins.get(id)!);
  }

  /**
   * Get plugins that implement a specific interface.
   */
  getPluginsByType<T extends AIPlugin>(
    pluginType: new (...args: any[]) => T,
  ): T[] {
    return this.getAllPlugins().filter((plugin): plugin is T => {
      // Check if plugin is an instance of the provided class constructor
      try {
        return plugin instanceof pluginType;
      } catch {
        // If instanceof fails, check by duck typing
        return this.hasPluginInterface(plugin, pluginType);
      }
    });
  }

  private hasPluginInterface(
    plugin: AIPlugin,
    pluginType: new (...args: any[]) => any,
  ): boolean {
    // Duck typing check for plugin interfaces
    const pluginProto = Object.getPrototypeOf(plugin);

    // Check for common plugin interface methods
    if (pluginType === MiddlewarePlugin) {
      return (
        'onRequest' in pluginProto ||
        'onResponse' in pluginProto ||
        'onError' in pluginProto
      );
    }

    if (pluginType === ProviderPlugin) {
      return (
        'enhanceLanguageModel' in pluginProto ||
        'enhanceProvider' in pluginProto
      );
    }

    if (pluginType === CachePlugin) {
      return (
        'shouldCache' in pluginProto ||
        'generateCacheKey' in pluginProto ||
        'validateCachedResponse' in pluginProto
      );
    }

    if (pluginType === AnalyticsPlugin) {
      return 'recordMetric' in pluginProto || 'recordEvent' in pluginProto;
    }

    return false;
  }

  /**
   * Execute middleware plugins for request processing.
   */
  async executeMiddleware(
    type: 'request' | 'response' | 'error',
    data: any,
    context: PluginContext = {},
  ): Promise<any> {
    const middlewarePlugins = this.getPluginsByType(MiddlewarePlugin);

    for (const plugin of middlewarePlugins) {
      try {
        const middlewarePlugin = plugin as MiddlewarePlugin;

        if (type === 'request' && middlewarePlugin.onRequest) {
          data = await middlewarePlugin.onRequest(data, {
            ...this.context,
            ...context,
          });
        } else if (type === 'response' && middlewarePlugin.onResponse) {
          data = await middlewarePlugin.onResponse(data, {
            ...this.context,
            ...context,
          });
        } else if (type === 'error' && middlewarePlugin.onError) {
          await middlewarePlugin.onError(data, { ...this.context, ...context });
        }
      } catch (error) {
        this.context.logger?.error(
          `Error in plugin ${plugin.metadata.id}:`,
          error,
        );
        // Continue with other plugins even if one fails
      }
    }

    return data;
  }

  /**
   * Apply provider enhancements from plugins.
   */
  async enhanceProvider(
    provider: Provider,
    context: PluginContext = {},
  ): Promise<Provider> {
    const providerPlugins = this.getPluginsByType(ProviderPlugin);
    let enhancedProvider = provider;

    for (const plugin of providerPlugins) {
      try {
        const providerPlugin = plugin as ProviderPlugin;

        if (providerPlugin.enhanceProvider) {
          enhancedProvider = await providerPlugin.enhanceProvider(
            enhancedProvider,
            { ...this.context, ...context },
          );
        }
      } catch (error) {
        this.context.logger?.error(
          `Error enhancing provider in plugin ${plugin.metadata.id}:`,
          error,
        );
      }
    }

    return enhancedProvider;
  }

  /**
   * Apply language model enhancements from plugins.
   */
  async enhanceLanguageModel(
    model: LanguageModel,
    provider: Provider,
    context: PluginContext = {},
  ): Promise<LanguageModel> {
    const providerPlugins = this.getPluginsByType(ProviderPlugin);
    let enhancedModel = model;

    for (const plugin of providerPlugins) {
      try {
        const providerPlugin = plugin as ProviderPlugin;

        if (providerPlugin.enhanceLanguageModel) {
          enhancedModel = await providerPlugin.enhanceLanguageModel(
            enhancedModel,
            provider,
            { ...this.context, ...context },
          );
        }
      } catch (error) {
        this.context.logger?.error(
          `Error enhancing language model in plugin ${plugin.metadata.id}:`,
          error,
        );
      }
    }

    return enhancedModel;
  }

  /**
   * Execute cache-related plugin hooks.
   */
  async executeCacheHooks(
    hook: 'shouldCache' | 'generateKey' | 'validate',
    request: any,
    response?: any,
    context: PluginContext = {},
  ): Promise<any> {
    const cachePlugins = this.getPluginsByType(CachePlugin);

    for (const plugin of cachePlugins) {
      try {
        const cachePlugin = plugin as CachePlugin;

        if (hook === 'shouldCache' && cachePlugin.shouldCache) {
          const shouldCache = await cachePlugin.shouldCache(request, {
            ...this.context,
            ...context,
          });
          if (shouldCache === false) return false;
        }

        if (hook === 'generateKey' && cachePlugin.generateCacheKey) {
          const customKey = await cachePlugin.generateCacheKey(request, {
            ...this.context,
            ...context,
          });
          if (customKey) return customKey;
        }

        if (
          hook === 'validate' &&
          cachePlugin.validateCachedResponse &&
          response
        ) {
          const isValid = await cachePlugin.validateCachedResponse(response, {
            ...this.context,
            ...context,
          });
          if (isValid === false) return false;
        }
      } catch (error) {
        this.context.logger?.error(
          `Error in cache plugin ${plugin.metadata.id}:`,
          error,
        );
      }
    }

    return true; // Default behavior
  }

  /**
   * Record custom metrics through analytics plugins.
   */
  async recordMetric(
    name: string,
    value: number,
    tags?: Record<string, string>,
    context: PluginContext = {},
  ): Promise<void> {
    const analyticsPlugins = this.getPluginsByType(AnalyticsPlugin);

    for (const plugin of analyticsPlugins) {
      try {
        const analyticsPlugin = plugin as AnalyticsPlugin;

        if (analyticsPlugin.recordMetric) {
          await analyticsPlugin.recordMetric(name, value, tags, {
            ...this.context,
            ...context,
          });
        }
      } catch (error) {
        this.context.logger?.error(
          `Error recording metric in plugin ${plugin.metadata.id}:`,
          error,
        );
      }
    }
  }

  /**
   * Record custom events through analytics plugins.
   */
  async recordEvent(
    event: string,
    properties?: Record<string, any>,
    context: PluginContext = {},
  ): Promise<void> {
    const analyticsPlugins = this.getPluginsByType(AnalyticsPlugin);

    for (const plugin of analyticsPlugins) {
      try {
        const analyticsPlugin = plugin as AnalyticsPlugin;

        if (analyticsPlugin.recordEvent) {
          await analyticsPlugin.recordEvent(event, properties, {
            ...this.context,
            ...context,
          });
        }
      } catch (error) {
        this.context.logger?.error(
          `Error recording event in plugin ${plugin.metadata.id}:`,
          error,
        );
      }
    }
  }

  /**
   * Get plugin registry status.
   */
  getStatus(): {
    totalPlugins: number;
    plugins: Array<{
      id: string;
      name: string;
      version: string;
      type: string;
    }>;
  } {
    return {
      totalPlugins: this.plugins.size,
      plugins: this.pluginOrder.map(id => {
        const plugin = this.plugins.get(id)!;
        return {
          id: plugin.metadata.id,
          name: plugin.metadata.name,
          version: plugin.metadata.version,
          type: plugin.constructor.name,
        };
      }),
    };
  }

  /**
   * Clear all plugins.
   */
  async clear(): Promise<void> {
    const pluginIds = [...this.pluginOrder];

    for (const pluginId of pluginIds) {
      await this.unregister(pluginId);
    }
  }
}

/**
 * Global plugin manager instance.
 */
let globalPluginManager: PluginManager | null = null;

/**
 * Get or create the global plugin manager instance.
 */
export function getGlobalPluginManager(context?: PluginContext): PluginManager {
  if (!globalPluginManager) {
    globalPluginManager = new PluginManager(context || {});
  }
  return globalPluginManager;
}

/**
 * Create a new plugin manager instance with custom context.
 */
export function createPluginManager(context: PluginContext): PluginManager {
  return new PluginManager(context);
}
