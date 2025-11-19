import type { OpenAICompatibleCompletionSettings } from '@ai-toolkit/openai-compatible';
import type { DeepInfraChatModelId } from './deepinfra-chat-settings';

// Use the same model IDs as chat
export type DeepInfraCompletionModelId = DeepInfraChatModelId;

export interface DeepInfraCompletionSettings
  extends OpenAICompatibleCompletionSettings {}
