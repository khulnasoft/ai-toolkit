export type GatewayModelId = string;

export interface GatewaySettings {
  /**
   * API key for the gateway service.
   * Defaults to the GATEWAY_API_KEY environment variable.
   */
  apiKey?: string;

  /**
   * Custom headers to include in requests.
   */
  headers?: Record<string, string>;

  /**
   * Custom fetch implementation.
   */
  fetch?: (input: string | Request, init?: RequestInit) => Promise<Response>;

  /**
   * Base URL for the gateway service.
   * Defaults to the GATEWAY_BASE_URL environment variable or "https://gateway.ai".
   */
  baseURL?: string;

  /**
   * Provider to route the request through.
   * If not specified, the gateway will automatically select the best provider.
   */
  provider?: string;

  /**
   * Model parameters.
   */
  temperature?: number;
  topP?: number;
  topK?: number;
  maxTokens?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  stopSequences?: string[];

  /**
   * Whether to stream responses.
   */
  stream?: boolean;

  /**
   * Additional provider-specific settings.
   */
  providerSettings?: Record<string, unknown>;
}
