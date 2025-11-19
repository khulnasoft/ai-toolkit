import { AITOOLKITError } from '@ai-toolkit/provider';
import type { SingleRequestTextStreamPart } from '../core/generate-text/run-tools-transformation';

const name = 'AI_InvalidStreamPartError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class InvalidStreamPartError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly chunk: SingleRequestTextStreamPart<any>;

  constructor({
    chunk,
    message,
  }: {
    chunk: SingleRequestTextStreamPart<any>;
    message: string;
  }) {
    super({ name, message });

    this.chunk = chunk;
  }

  static isInstance(error: unknown): error is InvalidStreamPartError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
