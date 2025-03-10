import {
  LanguageModelV1,
  ProviderV1,
  ImageModelV1,
} from '@ai-toolkit/provider';
import {
  FetchFunction,
  generateId,
  loadSetting,
  Resolvable,
  withoutTrailingSlash,
} from '@ai-toolkit/provider-utils';
import {
  GoogleVertexModelId,
  GoogleVertexSettings,
} from './google-vertex-settings';
import {
  GoogleVertexEmbeddingModelId,
  GoogleVertexEmbeddingSettings,
} from './google-vertex-embedding-settings';
import { GoogleVertexEmbeddingModel } from './google-vertex-embedding-model';
import { GoogleGenerativeAILanguageModel } from '@ai-toolkit/google/internal';
import { GoogleVertexImageModel } from './google-vertex-image-model';
import {
  GoogleVertexImageModelId,
  GoogleVertexImageSettings,
} from './google-vertex-image-settings';
import { GoogleVertexConfig } from './google-vertex-config';
import { isSupportedFileUrl } from './google-vertex-supported-file-url';

export interface GoogleVertexProvider extends ProviderV1 {
  /**
Creates a model for text generation.
   */
  (
    modelId: GoogleVertexModelId,
    settings?: GoogleVertexSettings,
  ): LanguageModelV1;

  languageModel: (
    modelId: GoogleVertexModelId,
    settings?: GoogleVertexSettings,
  ) => LanguageModelV1;

  /**
   * Creates a model for image generation.
   */
  image(
    modelId: GoogleVertexImageModelId,
    settings?: GoogleVertexImageSettings,
  ): ImageModelV1;

  /**
Creates a model for image generation.
   */
  imageModel(
    modelId: GoogleVertexImageModelId,
    settings?: GoogleVertexImageSettings,
  ): ImageModelV1;
}

export interface GoogleVertexProviderSettings {
  /**
Your Google Vertex location. Defaults to the environment variable `GOOGLE_VERTEX_LOCATION`.
   */
  location?: string;

  /**
Your Google Vertex project. Defaults to the environment variable `GOOGLE_VERTEX_PROJECT`.
  */
  project?: string;

  /**
   * Headers to use for requests. Can be:
   * - A headers object
   * - A Promise that resolves to a headers object
   * - A function that returns a headers object
   * - A function that returns a Promise of a headers object
   */
  headers?: Resolvable<Record<string, string | undefined>>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;

  // for testing
  generateId?: () => string;

  /**
Base URL for the Google Vertex API calls.
     */
  baseURL?: string;
}

/**
Create a Google Vertex AI provider instance.
 */
export function createVertex(
  options: GoogleVertexProviderSettings = {},
): GoogleVertexProvider {
  const loadVertexProject = () =>
    loadSetting({
      settingValue: options.project,
      settingName: 'project',
      environmentVariableName: 'GOOGLE_VERTEX_PROJECT',
      description: 'Google Vertex project',
    });

  const loadVertexLocation = () =>
    loadSetting({
      settingValue: options.location,
      settingName: 'location',
      environmentVariableName: 'GOOGLE_VERTEX_LOCATION',
      description: 'Google Vertex location',
    });

  const loadBaseURL = () => {
    const region = loadVertexLocation();
    const project = loadVertexProject();
    return (
      withoutTrailingSlash(options.baseURL) ??
      `https://${region}-aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/google`
    );
  };

  const createConfig = (name: string): GoogleVertexConfig => {
    return {
      provider: `google.vertex.${name}`,
      headers: options.headers ?? {},
      fetch: options.fetch,
      baseURL: loadBaseURL(),
    };
  };

  const createChatModel = (
    modelId: GoogleVertexModelId,
    settings: GoogleVertexSettings = {},
  ) => {
    return new GoogleGenerativeAILanguageModel(modelId, settings, {
      ...createConfig('chat'),
      generateId: options.generateId ?? generateId,
      isSupportedUrl: isSupportedFileUrl,
    });
  };

  const createEmbeddingModel = (
    modelId: GoogleVertexEmbeddingModelId,
    settings: GoogleVertexEmbeddingSettings = {},
  ) =>
    new GoogleVertexEmbeddingModel(
      modelId,
      settings,
      createConfig('embedding'),
    );

  const createImageModel = (
    modelId: GoogleVertexImageModelId,
    settings: GoogleVertexImageSettings = {},
  ) => new GoogleVertexImageModel(modelId, settings, createConfig('image'));

  const provider = function (
    modelId: GoogleVertexModelId,
    settings?: GoogleVertexSettings,
  ) {
    if (new.target) {
      throw new Error(
        'The Google Vertex AI model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId, settings);
  };

  provider.languageModel = createChatModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  provider.image = createImageModel;
  provider.imageModel = createImageModel;

  return provider;
}
