import {
  AITOOLKITError,
  getErrorMessage,
  JSONValue,
} from '@ai-toolkit/provider';

const name = 'AI_ToolExecutionError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class ToolExecutionError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly toolName: string;
  readonly toolArgs: JSONValue;
  readonly toolCallId: string;

  constructor({
    toolArgs,
    toolName,
    toolCallId,
    cause,
    message = `Error executing tool ${toolName}: ${getErrorMessage(cause)}`,
  }: {
    message?: string;
    toolArgs: JSONValue;
    toolName: string;
    toolCallId: string;
    cause: unknown;
  }) {
    super({ name, message, cause });

    this.toolArgs = toolArgs;
    this.toolName = toolName;
    this.toolCallId = toolCallId;
  }

  static isInstance(error: unknown): error is ToolExecutionError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
