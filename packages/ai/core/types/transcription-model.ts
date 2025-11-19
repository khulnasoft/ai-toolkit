import type {
  TranscriptionModelV1,
  TranscriptionModelV1CallWarning,
} from '@ai-toolkit/provider';

/**
Transcription model that is used by the AI TOOLKIT Core functions.
  */
export type TranscriptionModel = TranscriptionModelV1;

/**
Warning from the model provider for this call. The call will proceed, but e.g.
some settings might not be supported, which can lead to suboptimal results.
  */
export type TranscriptionWarning = TranscriptionModelV1CallWarning;
