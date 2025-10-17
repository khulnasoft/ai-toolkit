import { AITOOLKITError } from './ai-toolkit-error';

const name = 'AI_TooManyEmbeddingValuesForCallError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class TooManyEmbeddingValuesForCallError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly provider: string;
  readonly modelId: string;
  readonly maxEmbeddingsPerCall: number;
  readonly values: Array<unknown>;

  constructor(options: {
    provider: string;
    modelId: string;
    maxEmbeddingsPerCall: number;
    values: Array<unknown>;
  }) {
    super({
      name,
      message:
        `Too many values for a single embedding call. ` +
        `The ${options.provider} model "${options.modelId}" can only embed up to ` +
        `${options.maxEmbeddingsPerCall} values per call, but ${options.values.length} values were provided.`,
    });

    this.provider = options.provider;
    this.modelId = options.modelId;
    this.maxEmbeddingsPerCall = options.maxEmbeddingsPerCall;
    this.values = options.values;
  }

  static isInstance(
    error: unknown,
  ): error is TooManyEmbeddingValuesForCallError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
