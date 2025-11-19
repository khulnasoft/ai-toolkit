import type {
  EmbeddingModelV1,
  EmbeddingModelV1CallOptions,
  EmbeddingModelV1CallWarning,
  EmbeddingModelV1ProviderMetadata,
} from '@ai-toolkit/provider';
import type {
  FetchFunction,
} from '@ai-toolkit/provider-utils';
import { asGatewayError } from './errors/as-gateway-error';
import type { GatewayEmbeddingModelId, GatewayEmbeddingSettings } from './gateway-embedding-settings';

export interface GatewayEmbeddingModelOptions extends GatewayEmbeddingSettings {
  modelId: GatewayEmbeddingModelId;
  baseURL?: string;
}

export class GatewayEmbeddingModel implements EmbeddingModelV1<string> {
  readonly modelId: GatewayEmbeddingModelId;
  readonly provider = 'gateway';
  readonly baseURL: string;
  readonly apiKey?: string;
  readonly headers?: Record<string, string>;
  readonly fetch?: FetchFunction;

  private readonly settings: Omit<GatewayEmbeddingSettings, 'baseURL' | 'apiKey' | 'headers' | 'fetch'>;

  constructor(options: GatewayEmbeddingModelOptions) {
    this.modelId = options.modelId;
    this.baseURL = options.baseURL ?? 'https://gateway.ai';
    this.apiKey = options.apiKey;
    this.headers = options.headers;
    this.fetch = options.fetch;

    this.settings = {
      provider: options.provider,
      dimensions: options.dimensions,
      providerSettings: options.providerSettings,
    };
  }

  async doEmbed(
    options: EmbeddingModelV1CallOptions<string>,
  ): Promise<{
    embeddings: Array<readonly number[]>;
    usage?: {
      promptTokens: number;
    };
    warnings?: EmbeddingModelV1CallWarning[];
    rawCall?: {
      rawPrompt: unknown;
      rawSettings: Record<string, unknown>;
    };
    rawResponse?: Record<string, unknown>;
    metadata?: EmbeddingModelV1ProviderMetadata;
  }> {
    const requestBody = this.buildRequestBody(options);

    try {
      const response = await this.fetch?.(this.baseURL + '/v1/embeddings', {
        method: 'POST',
        headers: this.buildHeaders(),
        body: JSON.stringify(requestBody),
      });

      if (!response) {
        throw new asGatewayError('No response received from gateway');
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new asGatewayError(`Gateway API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      return this.parseResponse(data, options);
    } catch (error) {
      throw asGatewayError(error);
    }
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.headers,
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  private buildRequestBody(options: EmbeddingModelV1CallOptions<string>): Record<string, unknown> {
    return {
      model: this.modelId,
      input: options.values,
      provider: this.settings.provider,
      dimensions: this.settings.dimensions,
      provider_settings: this.settings.providerSettings,
    };
  }

  private parseResponse(
    data: any,
    options: EmbeddingModelV1CallOptions<string>,
  ): {
    embeddings: Array<readonly number[]>;
    usage?: {
      promptTokens: number;
    };
    warnings?: EmbeddingModelV1CallWarning[];
    rawCall?: {
      rawPrompt: unknown;
      rawSettings: Record<string, unknown>;
    };
    rawResponse?: Record<string, unknown>;
    metadata?: EmbeddingModelV1ProviderMetadata;
  } {
    if (!data.data || !Array.isArray(data.data)) {
      throw new asGatewayError('Invalid embedding response format');
    }

    const embeddings = data.data.map((item: any) => {
      if (!item.embedding || !Array.isArray(item.embedding)) {
        throw new asGatewayError('Invalid embedding format in response');
      }
      return item.embedding as readonly number[];
    });

    return {
      embeddings,
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
      } : undefined,
      rawCall: {
        rawPrompt: options.values,
        rawSettings: this.settings,
      },
      rawResponse: data,
    };
  }
}
