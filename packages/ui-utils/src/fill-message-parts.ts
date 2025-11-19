import { getMessageParts } from './get-message-parts';
import type { Message, UIMessage } from './types';

export function fillMessageParts(messages: Message[]): UIMessage[] {
  return messages.map(message => ({
    ...message,
    parts: getMessageParts(message),
  }));
}
