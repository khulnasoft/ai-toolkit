import { AITOOLKITError } from '@ai-toolkit/provider';

const name = 'AI_InvalidMessageRoleError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class InvalidMessageRoleError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly role: string;

  constructor({
    role,
    message = `Invalid message role: '${role}'. Must be one of: "system", "user", "assistant", "tool".`,
  }: {
    role: string;
    message?: string;
  }) {
    super({ name, message });

    this.role = role;
  }

  static isInstance(error: unknown): error is InvalidMessageRoleError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
