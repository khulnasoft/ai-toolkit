import { AITOOLKITError, getErrorMessage } from '@ai-toolkit/provider';
import { InvalidToolArgumentsError } from './invalid-tool-arguments-error';
import { NoSuchToolError } from './no-such-tool-error';

const name = 'AI_ToolCallRepairError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class ToolCallRepairError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly originalError: NoSuchToolError | InvalidToolArgumentsError;

  constructor({
    cause,
    originalError,
    message = `Error repairing tool call: ${getErrorMessage(cause)}`,
  }: {
    message?: string;
    cause: unknown;
    originalError: NoSuchToolError | InvalidToolArgumentsError;
  }) {
    super({ name, message, cause });
    this.originalError = originalError;
  }

  static isInstance(error: unknown): error is ToolCallRepairError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
