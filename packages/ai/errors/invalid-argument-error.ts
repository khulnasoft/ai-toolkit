import { AITOOLKITError } from '@ai-toolkit/provider';

const name = 'AI_InvalidArgumentError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class InvalidArgumentError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly parameter: string;
  readonly value: unknown;

  constructor({
    parameter,
    value,
    message,
  }: {
    parameter: string;
    value: unknown;
    message: string;
  }) {
    super({
      name,
      message: `Invalid argument for parameter ${parameter}: ${message}`,
    });

    this.parameter = parameter;
    this.value = value;
  }

  static isInstance(error: unknown): error is InvalidArgumentError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
