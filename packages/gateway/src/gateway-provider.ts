import type {
  EmbeddingModelV1,
  LanguageModelV1,
  ProviderV1,
} from '@ai-toolkit/provider';
import type {
  FetchFunction,
} from '@ai-toolkit/provider-utils';
import {
  generateId,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-toolkit/provider-utils';
import { GatewayLanguageModel } from './gateway-language-model';
import type {
  GatewayModelId,
  GatewaySettings,
} from './gateway-settings';
import { GatewayEmbeddingModel } from './gateway-embedding-model';
import type {
  GatewayEmbeddingModelId,
  GatewayEmbeddingSettings,
} from './gateway-embedding-settings';
import { asGatewayError } from './errors/as-gateway-error';

export interface GatewayProvider extends ProviderV1 {
  (
    modelId: GatewayModelId,
    settings?: GatewaySettings,
  ): LanguageModelV1;

  languageModel(
    modelId: GatewayModelId,
    settings?: GatewaySettings,
  ): LanguageModelV1;

  chat(
    modelId: GatewayModelId,
    settings?: GatewaySettings,
  ): LanguageModelV1;

  textEmbeddingModel(
    modelId: GatewayEmbeddingModelId,
    settings?: GatewayEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  embedding(
    modelId: GatewayEmbeddingModelId,
    settings?: GatewayEmbeddingSettings,
  ): EmbeddingModelV1<string>;
}

export function createGateway(
  options: {
    baseURL?: string;
    apiKey?: string;
    headers?: Record<string, string>;
    fetch?: FetchFunction;
  } = {},
): GatewayProvider {
  const baseURL = withoutTrailingSlash(
    options.baseURL ?? loadGatewayBaseUrl(),
  );

  const getHeaders = () => ({
    'Authorization': `Bearer ${options.apiKey ?? loadGatewayApiKey()}`,
    'Content-Type': 'application/json',
    ...options.headers,
  });

  const createLanguageModel = (
    modelId: GatewayModelId,
    settings: GatewaySettings = {},
  ) =>
    new GatewayLanguageModel({
      modelId,
      baseURL,
      apiKey: options.apiKey,
      headers: getHeaders(),
      fetch: options.fetch,
      ...settings,
    });

  const createEmbeddingModel = (
    modelId: GatewayEmbeddingModelId,
    settings: GatewayEmbeddingSettings = {},
  ) =>
    new GatewayEmbeddingModel({
      modelId,
      baseURL,
      apiKey: options.apiKey,
      headers: getHeaders(),
      fetch: options.fetch,
      ...settings,
    });

  const provider = (modelId: GatewayModelId, settings?: GatewaySettings) =>
    createLanguageModel(modelId, settings);

  provider.languageModel = createLanguageModel;
  provider.chat = createLanguageModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  provider.embedding = createEmbeddingModel;

  return provider as GatewayProvider;
}

function loadGatewayBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.GATEWAY_BASE_URL ?? 'https://gateway.ai';
  }
  
  return 'https://gateway.ai';
}

function loadGatewayApiKey(): string {
  if (typeof window === 'undefined') {
    const apiKey = process.env.GATEWAY_API_KEY;
    if (apiKey == null) {
      throw new asGatewayError('GATEWAY_API_KEY environment variable is not set');
    }
    return apiKey;
  }
  
  throw new asGatewayError('GATEWAY_API_KEY is not configured for browser usage');
}
