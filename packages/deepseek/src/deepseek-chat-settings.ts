import type { OpenAICompatibleChatSettings } from '@ai-toolkit/openai-compatible';

// https://api-docs.deepseek.com/quick_start/pricing
export type DeepSeekChatModelId =
  | 'deepseek-chat'
  | 'deepseek-reasoner'
  | 'deepseek-coder'
  | (string & {});

export interface DeepSeekChatSettings extends OpenAICompatibleChatSettings {}
