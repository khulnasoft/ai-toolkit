import { AITOOLKITError } from '@ai-toolkit/provider';

const name = 'AI_NoOutputSpecifiedError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

/**
Thrown when no output type is specified and output-related methods are called.
 */
export class NoOutputSpecifiedError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  constructor({ message = 'No output specified.' }: { message?: string } = {}) {
    super({ name, message });
  }

  static isInstance(error: unknown): error is NoOutputSpecifiedError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
