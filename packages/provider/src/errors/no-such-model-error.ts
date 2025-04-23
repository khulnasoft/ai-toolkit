import { AITOOLKITError } from './ai-toolkit-error';

const name = 'AI_NoSuchModelError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class NoSuchModelError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly modelId: string;
  readonly modelType: 'languageModel' | 'textEmbeddingModel' | 'imageModel';

  constructor({
    errorName = name,
    modelId,
    modelType,
    message = `No such ${modelType}: ${modelId}`,
  }: {
    errorName?: string;
    modelId: string;
    modelType: 'languageModel' | 'textEmbeddingModel' | 'imageModel';
    message?: string;
  }) {
    super({ name: errorName, message });

    this.modelId = modelId;
    this.modelType = modelType;
  }

  static isInstance(error: unknown): error is NoSuchModelError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
