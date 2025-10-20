/**
 * Error handling utilities for AI RSC actions
 */

export class AIActionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly cause?: Error,
  ) {
    super(message);
    this.name = 'AIActionError';
  }
}

export class AIRateLimitError extends AIActionError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429);
    this.name = 'AIRateLimitError';
  }
}

export class AIAuthenticationError extends AIActionError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_REQUIRED', 401);
    this.name = 'AIAuthenticationError';
  }
}

export class AIAuthorizationError extends AIActionError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_FAILED', 403);
    this.name = 'AIAuthorizationError';
  }
}

export class AIValidationError extends AIActionError {
  constructor(
    message: string,
    public readonly errors: Record<string, string[]>,
  ) {
    super(message, 'VALIDATION_FAILED', 400);
    this.name = 'AIValidationError';
  }
}

/**
 * Wraps an AI action with comprehensive error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  action: T,
  options: {
    logErrors?: boolean;
    includeStackTrace?: boolean;
    transformError?: (error: Error) => Error;
  } = {},
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await action(...args);
    } catch (error) {
      const {
        logErrors = true,
        includeStackTrace = false,
        transformError,
      } = options;
      const err = error instanceof Error ? error : new Error(String(error));

      if (logErrors) {
        console.error('AI Action Error:', {
          name: err.name,
          message: err.message,
          stack: includeStackTrace ? err.stack : undefined,
          args,
        });
      }

      if (transformError) {
        throw transformError(err);
      }

      // Re-throw known AI errors
      if (error instanceof AIActionError) {
        throw error;
      }

      // Wrap unknown errors
      throw new AIActionError(
        err.message || 'An unexpected error occurred',
        'INTERNAL_ERROR',
        500,
        err,
      );
    }
  }) as T;
}

/**
 * Creates a safe wrapper for AI actions that handles common error patterns
 */
export function createSafeAction<T extends (...args: any[]) => Promise<any>>(
  action: T,
  options: {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {},
) {
  const { timeout = 30000, retries = 0, retryDelay = 1000, onRetry } = options;

  return withErrorHandling(async (...args: Parameters<T>) => {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Add timeout wrapper
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(
            () => reject(new AIActionError('Action timeout', 'TIMEOUT', 408)),
            timeout,
          );
        });

        return await Promise.race([action(...args), timeoutPromise]);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        lastError = err;

        // Don't retry certain errors
        if (
          error instanceof AIAuthenticationError ||
          error instanceof AIAuthorizationError ||
          error instanceof AIValidationError ||
          error instanceof AIRateLimitError
        ) {
          throw error;
        }

        if (attempt < retries) {
          onRetry?.(err, attempt + 1);
          await new Promise(resolve =>
            setTimeout(resolve, retryDelay * (attempt + 1)),
          );
          continue;
        }
      }
    }

    throw lastError!;
  });
}
