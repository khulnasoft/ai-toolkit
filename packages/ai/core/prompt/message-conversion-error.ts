import { AITOOLKITError } from '@ai-toolkit/provider';
import { Message } from '@ai-toolkit/ui-utils';

const name = 'AI_MessageConversionError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class MessageConversionError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly originalMessage: Omit<Message, 'id'>;

  constructor({
    originalMessage,
    message,
  }: {
    originalMessage: Omit<Message, 'id'>;
    message: string;
  }) {
    super({ name, message });

    this.originalMessage = originalMessage;
  }

  static isInstance(error: unknown): error is MessageConversionError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
