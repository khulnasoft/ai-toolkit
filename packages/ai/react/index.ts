import {
  useChat as useChatReact,
  useCompletion as useCompletionReact,
  useAssistant as useAssistantReact,
  experimental_useObject as experimental_useObjectReact,
} from '@ai-toolkit/react';

/**
 * @deprecated Use `@ai-toolkit/react` instead.
 */
export const useChat = useChatReact;

/**
 * @deprecated Use `@ai-toolkit/react` instead.
 */
export const useCompletion = useCompletionReact;

/**
 * @deprecated Use `@ai-toolkit/react` instead.
 */
export const useAssistant = useAssistantReact;

/**
 * @deprecated Use `@ai-toolkit/react` instead.
 */
export const experimental_useObject = experimental_useObjectReact;

export type {
  /**
   * @deprecated Use `@ai-toolkit/react` instead.
   */
  CreateMessage,

  /**
   * @deprecated Use `@ai-toolkit/react` instead.
   */
  Message,

  /**
   * @deprecated Use `@ai-toolkit/react` instead.
   */
  UseChatOptions,

  /**
   * @deprecated Use `@ai-toolkit/react` instead.
   */
  UseChatHelpers,
} from '@ai-toolkit/react';
