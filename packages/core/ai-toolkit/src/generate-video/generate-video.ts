import type { DataContent } from '@ai-toolkit/provider-utils';

export type GenerateVideoPrompt =
  | string
  | {
      image: DataContent;
      text?: string;
    };

export async function experimental_generateVideo({
  model,
  prompt,
  n = 1,
  maxVideosPerCall,
  aspectRatio,
  resolution,
  duration,
  fps,
  seed,
  frameImages,
  inputReferences,
  generateAudio,
  providerOptions,
  maxRetries,
  abortSignal,
  headers,
  poll,
  webhook,
}: {
  model: unknown;
  prompt: GenerateVideoPrompt;
  n?: number;
  maxVideosPerCall?: number;
  aspectRatio?: `${number}:${number}` | 'adaptive';
  resolution?: `${number}x${number}`;
  duration?: number;
  fps?: number;
  seed?: number;
  frameImages?: Array<{
    image: DataContent;
    frameType: 'first_frame' | 'last_frame';
  }>;
  inputReferences?: Array<
    DataContent | { data: DataContent; mediaType?: string }
  >;
  generateAudio?: boolean;
  providerOptions?: Record<string, Record<string, unknown>>;
  maxRetries?: number;
  abortSignal?: AbortSignal;
  headers?: Record<string, string>;
  poll?: unknown;
  webhook?: unknown;
}): Promise<unknown> {
  void model;
  void prompt;
  void n;
  void maxVideosPerCall;
  void aspectRatio;
  void resolution;
  void duration;
  void fps;
  void seed;
  void frameImages;
  void inputReferences;
  void generateAudio;
  void providerOptions;
  void maxRetries;
  void abortSignal;
  void headers;
  void poll;
  void webhook;
  throw new Error('experimental_generateVideo not implemented in stub');
}
