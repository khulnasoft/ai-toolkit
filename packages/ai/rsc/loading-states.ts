/**
 * Optimistic updates and loading state utilities for RSC
 */

import { createStreamableValue } from './streamable-value/create-streamable-value';
import { AIActionError } from './error-handling';

/**
 * Loading state manager for RSC actions
 */
export class LoadingStateManager {
  private states = new Map<
    string,
    {
      isLoading: boolean;
      error: Error | null;
      data: any;
      timestamp: number;
    }
  >();

  /**
   * Set loading state for an action
   */
  setLoading(actionId: string, data?: any) {
    this.states.set(actionId, {
      isLoading: true,
      error: null,
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Set success state for an action
   */
  setSuccess(actionId: string, data: any) {
    this.states.set(actionId, {
      isLoading: false,
      error: null,
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Set error state for an action
   */
  setError(actionId: string, error: Error) {
    this.states.set(actionId, {
      isLoading: false,
      error,
      data: null,
      timestamp: Date.now(),
    });
  }

  /**
   * Get loading state for an action
   */
  getState(actionId: string) {
    return (
      this.states.get(actionId) || {
        isLoading: false,
        error: null,
        data: null,
        timestamp: 0,
      }
    );
  }

  /**
   * Check if an action is currently loading
   */
  isLoading(actionId: string): boolean {
    return this.getState(actionId).isLoading;
  }

  /**
   * Get error for an action
   */
  getError(actionId: string): Error | null {
    return this.getState(actionId).error;
  }

  /**
   * Get data for an action
   */
  getData(actionId: string): any {
    return this.getState(actionId).data;
  }

  /**
   * Clear state for an action
   */
  clear(actionId: string) {
    this.states.delete(actionId);
  }

  /**
   * Clear all states
   */
  clearAll() {
    this.states.clear();
  }

  /**
   * Get all active loading states
   */
  getActiveLoadings() {
    return Array.from(this.states.entries())
      .filter(([, state]) => state.isLoading)
      .map(([id, state]) => ({ id, ...state }));
  }
}

/**
 * Optimistic update manager
 */
export class OptimisticUpdateManager<T = any> {
  private pendingUpdates = new Map<
    string,
    {
      optimisticData: T;
      originalData?: T;
      timestamp: number;
      rollback?: () => void;
    }
  >();

  private loadingManager = new LoadingStateManager();

  /**
   * Apply optimistic update
   */
  applyOptimistic(
    actionId: string,
    optimisticData: T,
    originalData?: T,
    rollback?: () => void,
  ) {
    this.pendingUpdates.set(actionId, {
      optimisticData,
      originalData,
      timestamp: Date.now(),
      rollback,
    });

    this.loadingManager.setLoading(actionId, optimisticData);
  }

  /**
   * Commit optimistic update
   */
  commitOptimistic(actionId: string, finalData: T) {
    const update = this.pendingUpdates.get(actionId);
    if (update) {
      this.pendingUpdates.delete(actionId);
      this.loadingManager.setSuccess(actionId, finalData);
    }
  }

  /**
   * Rollback optimistic update
   */
  rollbackOptimistic(actionId: string) {
    const update = this.pendingUpdates.get(actionId);
    if (update) {
      update.rollback?.();
      this.pendingUpdates.delete(actionId);
      this.loadingManager.clear(actionId);
    }
  }

  /**
   * Handle action error
   */
  handleError(actionId: string, error: Error) {
    this.rollbackOptimistic(actionId);
    this.loadingManager.setError(actionId, error);
  }

  /**
   * Get optimistic data for an action
   */
  getOptimisticData(actionId: string): T | undefined {
    return this.pendingUpdates.get(actionId)?.optimisticData;
  }

  /**
   * Check if action has optimistic update
   */
  hasOptimisticUpdate(actionId: string): boolean {
    return this.pendingUpdates.has(actionId);
  }

  /**
   * Get loading state manager
   */
  getLoadingManager() {
    return this.loadingManager;
  }
}

/**
 * Creates an action wrapper with optimistic updates and loading states
 */
export function withOptimisticUpdates<
  T extends (...args: any[]) => Promise<any>,
>(
  action: T,
  options: {
    generateOptimisticData?: (...args: Parameters<T>) => any;
    onError?: (error: Error, actionId: string) => void;
    onSuccess?: (result: any, actionId: string) => void;
    rollbackOnError?: boolean;
  } = {},
) {
  const updateManager = new OptimisticUpdateManager();

  return (async (...args: Parameters<T>) => {
    const actionId = `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Apply optimistic update if generator is provided
      if (options.generateOptimisticData) {
        const optimisticData = options.generateOptimisticData(...args);
        updateManager.applyOptimistic(actionId, optimisticData);
      } else {
        updateManager.getLoadingManager().setLoading(actionId);
      }

      // Execute the action
      const result = await action(...args);

      // Commit optimistic update
      updateManager.commitOptimistic(actionId, result);

      options.onSuccess?.(result, actionId);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      updateManager.handleError(actionId, err);
      options.onError?.(err, actionId);

      if (options.rollbackOnError !== false) {
        updateManager.rollbackOptimistic(actionId);
      }

      throw err;
    }
  }) as T;
}

/**
 * React hook for managing loading states in client components
 */
export function useLoadingState(actionId: string) {
  const loadingManager = new LoadingStateManager();

  return {
    isLoading: loadingManager.isLoading(actionId),
    error: loadingManager.getError(actionId),
    data: loadingManager.getData(actionId),
    clear: () => loadingManager.clear(actionId),
  };
}

/**
 * Utility for creating loading UI components
 */
export function createLoadingUI<T>(
  renderLoading: (data?: T) => React.ReactNode,
  renderError: (error: Error) => React.ReactNode,
  renderSuccess: (data: T) => React.ReactNode,
) {
  return (actionId: string) => {
    const loadingManager = new LoadingStateManager();
    const state = loadingManager.getState(actionId);

    if (state.isLoading) {
      return renderLoading(state.data);
    }

    if (state.error) {
      return renderError(state.error);
    }

    if (state.data) {
      return renderSuccess(state.data);
    }

    return null;
  };
}
