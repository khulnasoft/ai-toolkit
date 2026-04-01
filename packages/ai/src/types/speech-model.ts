import {
  SpeechModelV2,
  SpeechModelV3,
  SpeechModelV4,
} from '@ai-toolkit/provider';

/**
 * Speech model that is used by the AI TOOLKIT.
 */
export type SpeechModel =
  | string
  | SpeechModelV4
  | SpeechModelV3
  | SpeechModelV2;
