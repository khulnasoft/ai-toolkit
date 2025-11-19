import type {
  LanguageModelV1,
  LanguageModelV1CallOptions,
  LanguageModelV1CallWarning,
  LanguageModelV1FinishReason,
  LanguageModelV1FunctionToolCall,
  LanguageModelV1LogProbs,
  LanguageModelV1Prompt,
  LanguageModelV1ProviderMetadata,
  LanguageModelV1StreamPart,
  LanguageModelV1ToolCall,
  LanguageModelV1ToolChoice,
} from '@ai-toolkit/provider';
import type {
  FetchFunction,
} from '@ai-toolkit/provider-utils';
import { asGatewayError } from './errors/as-gateway-error';
import type { GatewayModelId, GatewaySettings } from './gateway-settings';

export interface GatewayLanguageModelOptions extends GatewaySettings {
  modelId: GatewayModelId;
  baseURL?: string;
}

export class GatewayLanguageModel implements LanguageModelV1 {
  readonly modelId: GatewayModelId;
  readonly provider = 'gateway';
  readonly baseURL: string;
  readonly apiKey?: string;
  readonly headers?: Record<string, string>;
  readonly fetch?: FetchFunction;

  private readonly settings: Omit<GatewaySettings, 'baseURL' | 'apiKey' | 'headers' | 'fetch'>;

  constructor(options: GatewayLanguageModelOptions) {
    this.modelId = options.modelId;
    this.baseURL = options.baseURL ?? 'https://gateway.ai';
    this.apiKey = options.apiKey;
    this.headers = options.headers;
    this.fetch = options.fetch;

    this.settings = {
      provider: options.provider,
      temperature: options.temperature,
      topP: options.topP,
      topK: options.topK,
      maxTokens: options.maxTokens,
      presencePenalty: options.presencePenalty,
      frequencyPenalty: options.frequencyPenalty,
      stopSequences: options.stopSequences,
      stream: options.stream,
      providerSettings: options.providerSettings,
    };
  }

  async doGenerate(
    options: LanguageModelV1CallOptions,
  ): Promise<{
    text?: string;
    toolCalls?: LanguageModelV1ToolCall[];
    finishReason: LanguageModelV1FinishReason;
    usage?: {
      promptTokens: number;
      completionTokens: number;
    };
    warnings?: LanguageModelV1CallWarning[];
    rawCall?: {
      rawPrompt: unknown;
      rawSettings: Record<string, unknown>;
    };
    rawResponse?: Record<string, unknown>;
    metadata?: LanguageModelV1ProviderMetadata;
    logProbs?: LanguageModelV1LogProbs;
  }> {
    const requestBody = this.buildRequestBody(options);

    try {
      const response = await this.fetch?.(this.baseURL + '/v1/chat/completions', {
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

      return this.parseResponse(data);
    } catch (error) {
      throw asGatewayError(error);
    }
  }

  async doStream(
    options: LanguageModelV1CallOptions,
  ): Promise<{
    stream: AsyncIterable<LanguageModelV1StreamPart>;
    rawCall?: {
      rawPrompt: unknown;
      rawSettings: Record<string, unknown>;
    };
    rawResponse?: Record<string, unknown>;
    warnings?: LanguageModelV1CallWarning[];
    metadata?: LanguageModelV1ProviderMetadata;
  }> {
    const requestBody = {
      ...this.buildRequestBody(options),
      stream: true,
    };

    try {
      const response = await this.fetch?.(this.baseURL + '/v1/chat/completions', {
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

      return {
        stream: this.parseStreamResponse(response),
        rawCall: {
          rawPrompt: options.prompt,
          rawSettings: this.settings,
        },
      };
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

  private buildRequestBody(options: LanguageModelV1CallOptions): Record<string, unknown> {
    const messages = this.convertMessages(options.prompt);

    return {
      model: this.modelId,
      messages,
      temperature: this.settings.temperature,
      top_p: this.settings.topP,
      top_k: this.settings.topK,
      max_tokens: this.settings.maxTokens,
      presence_penalty: this.settings.presencePenalty,
      frequency_penalty: this.settings.frequencyPenalty,
      stop: this.settings.stopSequences,
      provider: this.settings.provider,
      provider_settings: this.settings.providerSettings,
      ...(options.tools && { tools: this.convertTools(options.tools) }),
      ...(options.toolChoice && { tool_choice: this.convertToolChoice(options.toolChoice) }),
      ...(options.maxTokens && { max_tokens: options.maxTokens }),
      ...(options.temperature && { temperature: options.temperature }),
    };
  }

  private convertMessages(prompt: LanguageModelV1Prompt): Array<Record<string, unknown>> {
    return prompt.map((message) => {
      if (message.role === 'system') {
        return { role: 'system', content: message.content };
      }
      if (message.role === 'user') {
        return { role: 'user', content: message.content };
      }
      if (message.role === 'assistant') {
        const assistantMessage: Record<string, unknown> = {
          role: 'assistant',
          content: message.content,
        };
        if (message.toolCalls) {
          assistantMessage.tool_calls = message.toolCalls.map((toolCall) => ({
            id: toolCall.toolCallId,
            type: 'function',
            function: {
              name: toolCall.toolName,
              arguments: toolCall.args,
            },
          }));
        }
        return assistantMessage;
      }
      if (message.role === 'tool') {
        return {
          role: 'tool',
          tool_call_id: message.toolCallId,
          content: message.content,
        };
      }
      throw new asGatewayError(`Unsupported message role: ${(message as any).role}`);
    });
  }

  private convertTools(tools: LanguageModelV1CallOptions['tools']): Array<Record<string, unknown>> {
    return tools.map((tool) => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      },
    }));
  }

  private convertToolChoice(toolChoice: LanguageModelV1ToolChoice): Record<string, unknown> {
    if (toolChoice.type === 'auto') {
      return { type: 'auto' };
    }
    if (toolChoice.type === 'required') {
      return { type: 'required' };
    }
    if (toolChoice.type === 'none') {
      return { type: 'none' };
    }
    if (toolChoice.type === 'specific') {
      return {
        type: 'function',
        function: {
          name: toolChoice.toolName,
        },
      };
    }
    throw new asGatewayError(`Unsupported tool choice type: ${(toolChoice as any).type}`);
  }

  private parseResponse(data: any): {
    text?: string;
    toolCalls?: LanguageModelV1ToolCall[];
    finishReason: LanguageModelV1FinishReason;
    usage?: {
      promptTokens: number;
      completionTokens: number;
    };
    warnings?: LanguageModelV1CallWarning[];
    rawCall?: {
      rawPrompt: unknown;
      rawSettings: Record<string, unknown>;
    };
    rawResponse?: Record<string, unknown>;
    metadata?: LanguageModelV1ProviderMetadata;
  } {
    const choice = data.choices?.[0];
    if (!choice) {
      throw new asGatewayError('No choice returned from gateway');
    }

    const finishReason = this.mapFinishReason(choice.finish_reason);
    const text = choice.message?.content;
    const toolCalls = choice.message?.tool_calls?.map((toolCall: any) => ({
      toolCallId: toolCall.id,
      toolName: toolCall.function.name,
      args: JSON.parse(toolCall.function.arguments),
    }));

    return {
      text,
      toolCalls,
      finishReason,
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
      } : undefined,
      rawResponse: data,
    };
  }

  private async *parseStreamResponse(response: Response): AsyncIterable<LanguageModelV1StreamPart> {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new asGatewayError('No response body reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta;

              if (delta?.content) {
                yield {
                  type: 'text-delta',
                  textDelta: delta.content,
                };
              }

              if (delta?.tool_calls) {
                for (const toolCall of delta.tool_calls) {
                  if (toolCall.function?.name) {
                    yield {
                      type: 'tool-call-delta',
                      toolCallType: 'function',
                      toolCallId: toolCall.id,
                      toolName: toolCall.function.name,
                      argsTextDelta: toolCall.function.arguments || '',
                    };
                  }
                }
              }

              if (parsed.choices?.[0]?.finish_reason) {
                yield {
                  type: 'finish',
                  finishReason: this.mapFinishReason(parsed.choices[0].finish_reason),
                  usage: parsed.usage ? {
                    promptTokens: parsed.usage.prompt_tokens,
                    completionTokens: parsed.usage.completion_tokens,
                  } : undefined,
                };
              }
            } catch (error) {
              // Ignore parsing errors for malformed SSE lines
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  private mapFinishReason(reason: string): LanguageModelV1FinishReason {
    switch (reason) {
      case 'stop':
        return 'stop';
      case 'length':
        return 'length';
      case 'tool_calls':
        return 'tool-calls';
      case 'content_filter':
        return 'content-filter';
      default:
        return 'other';
    }
  }
}
