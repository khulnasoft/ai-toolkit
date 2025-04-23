import { AITOOLKITError, getErrorMessage } from '@ai-toolkit/provider';

const name = 'AI_InvalidToolArgumentsError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class InvalidToolArgumentsError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly toolName: string;
  readonly toolArgs: string;

  constructor({
    toolArgs,
    toolName,
    cause,
    message = `Invalid arguments for tool ${toolName}: ${getErrorMessage(
      cause,
    )}`,
  }: {
    message?: string;
    toolArgs: string;
    toolName: string;
    cause: unknown;
  }) {
    super({ name, message, cause });

    this.toolArgs = toolArgs;
    this.toolName = toolName;
  }

  static isInstance(error: unknown): error is InvalidToolArgumentsError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
