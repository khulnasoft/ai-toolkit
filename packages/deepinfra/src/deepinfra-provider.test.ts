import { DeepInfraImageModel } from './deepinfra-image-model';
import { createDeepInfra } from './deepinfra-provider';
import {
  OpenAICompatibleChatLanguageModel,
  OpenAICompatibleCompletionLanguageModel,
  OpenAICompatibleEmbeddingModel,
} from '@ai-toolkit/openai-compatible';
import { LanguageModelV1, EmbeddingModelV1 } from '@ai-toolkit/provider';
import { loadApiKey } from '@ai-toolkit/provider-utils';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

// Add type assertion for the mocked class
const OpenAICompatibleChatLanguageModelMock =
  OpenAICompatibleChatLanguageModel as unknown as Mock;

vi.mock('@ai-toolkit/openai-compatible', () => ({
  OpenAICompatibleChatLanguageModel: vi.fn(),
  OpenAICompatibleCompletionLanguageModel: vi.fn(),
  OpenAICompatibleEmbeddingModel: vi.fn(),
}));

vi.mock('@ai-toolkit/provider-utils', () => ({
  loadApiKey: vi.fn().mockReturnValue('mock-api-key'),
  withoutTrailingSlash: vi.fn(url => url),
}));

vi.mock('./deepinfra-image-model', () => ({
  DeepInfraImageModel: vi.fn(),
}));

describe('DeepInfraProvider', () => {
  let mockLanguageModel: LanguageModelV1;
  let mockEmbeddingModel: EmbeddingModelV1<string>;

  beforeEach(() => {
    // Mock implementations of models
    mockLanguageModel = {
      // Add any required methods for LanguageModelV1
    } as LanguageModelV1;
    mockEmbeddingModel = {
      // Add any required methods for EmbeddingModelV1
    } as EmbeddingModelV1<string>;

    // Reset mocks
    vi.clearAllMocks();
  });

  describe('createDeepInfra', () => {
    it('should create a DeepInfraProvider instance with default options', () => {
      const provider = createDeepInfra();
      const model = provider('model-id');

      // Use the mocked version
      const constructorCall =
        OpenAICompatibleChatLanguageModelMock.mock.calls[0];
      const config = constructorCall[2];
      config.headers();

      expect(loadApiKey).toHaveBeenCalledWith({
        apiKey: undefined,
        environmentVariableName: 'DEEPINFRA_API_KEY',
        description: "DeepInfra's API key",
      });
    });

    it('should create a DeepInfraProvider instance with custom options', () => {
      const options = {
        apiKey: 'custom-key',
        baseURL: 'https://custom.url',
        headers: { 'Custom-Header': 'value' },
      };
      const provider = createDeepInfra(options);
      const model = provider('model-id');

      const constructorCall =
        OpenAICompatibleChatLanguageModelMock.mock.calls[0];
      const config = constructorCall[2];
      config.headers();

      expect(loadApiKey).toHaveBeenCalledWith({
        apiKey: 'custom-key',
        environmentVariableName: 'DEEPINFRA_API_KEY',
        description: "DeepInfra's API key",
      });
    });

    it('should return a chat model when called as a function', () => {
      const provider = createDeepInfra();
      const modelId = 'foo-model-id';
      const settings = { user: 'foo-user' };

      const model = provider(modelId, settings);
      expect(model).toBeInstanceOf(OpenAICompatibleChatLanguageModel);
    });
  });

  describe('chatModel', () => {
    it('should construct a chat model with correct configuration', () => {
      const provider = createDeepInfra();
      const modelId = 'deepinfra-chat-model';
      const settings = { user: 'foo-user' };

      const model = provider.chatModel(modelId, settings);

      expect(model).toBeInstanceOf(OpenAICompatibleChatLanguageModel);
      expect(OpenAICompatibleChatLanguageModelMock).toHaveBeenCalledWith(
        modelId,
        settings,
        expect.objectContaining({
          provider: 'deepinfra.chat',
          defaultObjectGenerationMode: 'json',
        }),
      );
    });
  });

  describe('completionModel', () => {
    it('should construct a completion model with correct configuration', () => {
      const provider = createDeepInfra();
      const modelId = 'deepinfra-completion-model';
      const settings = { user: 'foo-user' };

      const model = provider.completionModel(modelId, settings);

      expect(model).toBeInstanceOf(OpenAICompatibleCompletionLanguageModel);
    });
  });

  describe('textEmbeddingModel', () => {
    it('should construct a text embedding model with correct configuration', () => {
      const provider = createDeepInfra();
      const modelId = 'deepinfra-embedding-model';
      const settings = { user: 'foo-user' };

      const model = provider.textEmbeddingModel(modelId, settings);

      expect(model).toBeInstanceOf(OpenAICompatibleEmbeddingModel);
    });
  });

  describe('image', () => {
    it('should construct an image model with correct configuration', () => {
      const provider = createDeepInfra();
      const modelId = 'deepinfra-image-model';
      const settings = { maxImagesPerCall: 2 };

      const model = provider.image(modelId, settings);

      expect(model).toBeInstanceOf(DeepInfraImageModel);
      expect(DeepInfraImageModel).toHaveBeenCalledWith(
        modelId,
        settings,
        expect.objectContaining({
          provider: 'deepinfra.image',
          baseURL: 'https://api.deepinfra.com/v1/inference',
        }),
      );
    });

    it('should use default settings when none provided', () => {
      const provider = createDeepInfra();
      const modelId = 'deepinfra-image-model';

      const model = provider.image(modelId);

      expect(model).toBeInstanceOf(DeepInfraImageModel);
      expect(DeepInfraImageModel).toHaveBeenCalledWith(
        modelId,
        {},
        expect.any(Object),
      );
    });

    it('should respect custom baseURL', () => {
      const customBaseURL = 'https://custom.api.deepinfra.com';
      const provider = createDeepInfra({ baseURL: customBaseURL });
      const modelId = 'deepinfra-image-model';

      const model = provider.image(modelId);

      expect(DeepInfraImageModel).toHaveBeenCalledWith(
        modelId,
        expect.any(Object),
        expect.objectContaining({
          baseURL: `${customBaseURL}/inference`,
        }),
      );
    });
  });
});
