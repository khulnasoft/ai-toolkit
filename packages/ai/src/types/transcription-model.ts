import {
  TranscriptionModelV2,
  TranscriptionModelV3,
  TranscriptionModelV4,
} from '@ai-toolkit/provider';

/**
 * Transcription model that is used by the AI TOOLKIT.
 */
export type TranscriptionModel =
  | string
  | TranscriptionModelV4
  | TranscriptionModelV3
  | TranscriptionModelV2;
