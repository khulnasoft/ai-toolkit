import { OpenAICompatibleCompletionSettings } from '@ai-toolkit/openai-compatible';
import { DeepInfraChatModelId } from './deepinfra-chat-settings';

// Use the same model IDs as chat
export type DeepInfraCompletionModelId = DeepInfraChatModelId;

export interface DeepInfraCompletionSettings
  extends OpenAICompatibleCompletionSettings {}
