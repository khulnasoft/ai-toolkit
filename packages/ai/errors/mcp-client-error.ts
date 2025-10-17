import { AITOOLKITError } from '@ai-toolkit/provider';

const name = 'AI_MCPClientError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

/**
 * An error occurred with the MCP client.
 */
export class MCPClientError extends AITOOLKITError {
  private readonly [symbol] = true;

  constructor({
    name = 'MCPClientError',
    message,
    cause,
  }: {
    name?: string;
    message: string;
    cause?: unknown;
  }) {
    super({ name, message, cause });
  }

  static isInstance(error: unknown): error is MCPClientError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
