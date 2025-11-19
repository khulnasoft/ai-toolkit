/**
 * Converts an unknown error to a GatewayError.
 * 
 * @param error - The unknown error to convert
 * @returns A GatewayError instance
 */
export function asGatewayError(error: unknown): GatewayError {
  if (error instanceof GatewayError) {
    return error;
  }

  if (error instanceof Error) {
    return new GatewayError(error.message, error);
  }

  if (typeof error === 'string') {
    return new GatewayError(error);
  }

  return new GatewayError('An unknown error occurred');
}

/**
 * Gateway error class for handling gateway-specific errors.
 */
export class GatewayError extends Error {
  readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'GatewayError';
    this.cause = cause;
  }
}
