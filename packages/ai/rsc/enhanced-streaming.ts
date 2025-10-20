/**
 * Enhanced streaming utilities for RSC
 */

import { createStreamableValue } from './streamable-value/create-streamable-value';
import { AIActionError } from './error-handling';

/**
 * Enhanced streaming response with better error handling and progress tracking
 */
export class EnhancedStreamableValue<T> {
  private stream: ReturnType<typeof createStreamableValue<T>>;
  private progress: number = 0;
  private isComplete: boolean = false;
  private error: Error | null = null;
  private startTime: number = Date.now();

  constructor(initialValue?: T) {
    this.stream = createStreamableValue(initialValue);
  }

  get value() {
    return this.stream.value;
  }

  /**
   * Append data to the stream
   */
  append(data: T extends string ? string : T) {
    if (this.isComplete || this.error) {
      return;
    }

    try {
      this.stream.append(data);
      this.progress += 1;
    } catch (err) {
      this.error =
        err instanceof Error ? err : new Error('Stream append failed');
      throw this.error;
    }
  }

  /**
   * Mark the stream as complete
   */
  done(finalValue?: T) {
    if (this.isComplete) {
      return;
    }

    this.isComplete = true;
    this.progress = 100;

    try {
      this.stream.done(finalValue);
    } catch (err) {
      this.error =
        err instanceof Error ? err : new Error('Stream completion failed');
      throw this.error;
    }
  }

  /**
   * Handle errors in the stream
   */
  error(error: Error) {
    this.error = error;
    this.isComplete = true;

    try {
      this.stream.error(error);
    } catch (err) {
      console.error('Failed to handle stream error:', err);
    }
  }

  /**
   * Get stream statistics
   */
  getStats() {
    return {
      progress: this.progress,
      isComplete: this.isComplete,
      hasError: !!this.error,
      duration: Date.now() - this.startTime,
      error: this.error?.message,
    };
  }

  /**
   * Wait for the stream to complete
   */
  async waitForCompletion(timeout?: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const checkCompletion = () => {
        if (this.isComplete) {
          if (this.error) {
            reject(this.error);
          } else {
            resolve(this.stream.value);
          }
          return;
        }

        if (timeout && Date.now() - startTime > timeout) {
          reject(new AIActionError('Stream timeout', 'STREAM_TIMEOUT', 408));
          return;
        }

        setTimeout(checkCompletion, 10);
      };

      checkCompletion();
    });
  }
}

/**
 * Creates an enhanced streamable value with better error handling
 */
export function createEnhancedStreamableValue<T>(initialValue?: T) {
  return new EnhancedStreamableValue<T>(initialValue);
}

/**
 * Stream wrapper that provides progress tracking and error recovery
 */
export function withStreamProgress<
  T extends (...args: any[]) => AsyncGenerator<any, any, any>,
>(
  generatorFn: T,
  options: {
    onProgress?: (progress: number) => void;
    onError?: (error: Error) => void;
    onComplete?: (result: any) => void;
    timeout?: number;
  } = {},
): T {
  return async function* (...args: Parameters<T>) {
    const { onProgress, onError, onComplete, timeout = 30000 } = options;
    const startTime = Date.now();
    let progress = 0;

    try {
      const generator = generatorFn(...args);

      while (true) {
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(
            () =>
              reject(
                new AIActionError('Stream timeout', 'STREAM_TIMEOUT', 408),
              ),
            timeout,
          );
        });

        const resultPromise = generator.next();
        const result = await Promise.race([resultPromise, timeoutPromise]);

        if (result.done) {
          progress = 100;
          onProgress?.(progress);
          onComplete?.(result.value);
          yield result.value;
          break;
        }

        progress += 10; // Increment progress for each chunk
        onProgress?.(Math.min(progress, 90)); // Cap at 90% until completion

        yield result.value;
      }
    } catch (error) {
      const streamError =
        error instanceof Error ? error : new Error('Stream error');
      onError?.(streamError);

      throw new AIActionError(
        `Stream failed: ${streamError.message}`,
        'STREAM_ERROR',
        500,
        streamError,
      );
    }
  } as T;
}

/**
 * Debounced streaming utility to reduce UI updates
 */
export function createDebouncedStream<T>(
  stream: EnhancedStreamableValue<T>,
  debounceMs: number = 50,
) {
  let timeoutId: NodeJS.Timeout;
  let pendingData: T[] = [];

  return {
    append: (data: T) => {
      pendingData.push(data);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (pendingData.length > 0) {
          const combinedData = pendingData.join('') as T;
          stream.append(combinedData);
          pendingData = [];
        }
      }, debounceMs);
    },

    flush: () => {
      clearTimeout(timeoutId);
      if (pendingData.length > 0) {
        const combinedData = pendingData.join('') as T;
        stream.append(combinedData);
        pendingData = [];
      }
    },

    done: () => {
      clearTimeout(timeoutId);
      stream.done();
    },
  };
}
