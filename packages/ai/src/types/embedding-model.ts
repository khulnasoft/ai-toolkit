import {
  EmbeddingModelV2,
  EmbeddingModelV3,
  EmbeddingModelV4,
  EmbeddingModelV4Embedding,
} from '@ai-toolkit/provider';

/**
 * Embedding model that is used by the AI TOOLKIT.
 */
export type EmbeddingModel =
  | string
  | EmbeddingModelV4
  | EmbeddingModelV3
  | EmbeddingModelV2<string>;

/**
 * Embedding.
 */
export type Embedding = EmbeddingModelV4Embedding;
