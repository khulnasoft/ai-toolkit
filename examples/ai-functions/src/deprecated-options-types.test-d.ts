import type {
  AlibabaLanguageModelOptions,
  AlibabaProviderOptions,
  AlibabaVideoModelOptions,
  AlibabaVideoProviderOptions,
} from '@ai-tools/alibaba';
import type {
  AmazonBedrockLanguageModelOptions,
  AmazonBedrockRerankingModelOptions,
  BedrockProviderOptions,
  BedrockRerankingOptions,
} from '@ai-tools/amazon-bedrock';
import type {
  AnthropicLanguageModelOptions,
  AnthropicProviderOptions,
} from '@ai-tools/anthropic';
import type {
  OpenAIChatLanguageModelOptions as AzureOpenAIChatLanguageModelOptions,
  OpenAILanguageModelChatOptions as AzureOpenAILanguageModelChatOptions,
  OpenAILanguageModelResponsesOptions as AzureOpenAILanguageModelResponsesOptions,
  OpenAIResponsesProviderOptions as AzureOpenAIResponsesProviderOptions,
} from '@ai-tools/azure';
import type {
  BlackForestLabsImageModelOptions,
  BlackForestLabsImageProviderOptions,
} from '@ai-tools/black-forest-labs';
import type {
  CohereChatModelOptions,
  CohereLanguageModelOptions,
  CohereRerankingModelOptions,
  CohereRerankingOptions,
} from '@ai-tools/cohere';
import type {
  DeepgramSpeechCallOptions,
  DeepgramSpeechModelOptions,
} from '@ai-tools/deepgram';
import type {
  DeepSeekChatOptions,
  DeepSeekLanguageModelOptions,
} from '@ai-tools/deepseek';
import type {
  FalImageModelOptions,
  FalImageProviderOptions,
  FalVideoModelOptions,
  FalVideoProviderOptions,
} from '@ai-tools/fal';
import type {
  FireworksEmbeddingModelOptions,
  FireworksEmbeddingProviderOptions,
  FireworksLanguageModelOptions,
  FireworksProviderOptions,
} from '@ai-tools/fireworks';
import type {
  GatewayLanguageModelOptions,
  GatewayProviderOptions,
} from '@ai-tools/gateway';
import type {
  GoogleEmbeddingModelOptions,
  GoogleGenerativeAIEmbeddingProviderOptions,
  GoogleGenerativeAIImageProviderOptions,
  GoogleGenerativeAIProviderOptions,
  GoogleGenerativeAIVideoProviderOptions,
  GoogleImageModelOptions,
  GoogleLanguageModelOptions,
  GoogleVideoModelOptions,
} from '@ai-tools/google';
import type {
  GoogleVertexImageModelOptions,
  GoogleVertexImageProviderOptions,
  GoogleVertexVideoModelOptions,
  GoogleVertexVideoProviderOptions,
} from '@ai-tools/google-vertex';
import type {
  GroqLanguageModelOptions,
  GroqProviderOptions,
} from '@ai-tools/groq';
import type {
  KlingAIVideoModelOptions,
  KlingAIVideoProviderOptions,
} from '@ai-tools/klingai';
import type {
  LumaImageModelOptions,
  LumaImageProviderOptions,
} from '@ai-tools/luma';
import type {
  MoonshotAILanguageModelOptions,
  MoonshotAIProviderOptions,
} from '@ai-tools/moonshotai';
import type {
  OpenAIChatLanguageModelOptions,
  OpenAILanguageModelChatOptions,
  OpenAILanguageModelResponsesOptions,
  OpenAIResponsesProviderOptions,
} from '@ai-tools/openai';
import type {
  OpenAICompatibleCompletionProviderOptions,
  OpenAICompatibleEmbeddingModelOptions,
  OpenAICompatibleEmbeddingProviderOptions,
  OpenAICompatibleLanguageModelChatOptions,
  OpenAICompatibleLanguageModelCompletionOptions,
  OpenAICompatibleProviderOptions,
} from '@ai-tools/openai-compatible';
import type {
  ProdiaImageModelOptions,
  ProdiaImageProviderOptions,
} from '@ai-tools/prodia';
import type {
  ReplicateImageModelOptions,
  ReplicateImageProviderOptions,
  ReplicateVideoModelOptions,
  ReplicateVideoProviderOptions,
} from '@ai-tools/replicate';
import type {
  TogetherAIImageModelOptions,
  TogetherAIImageProviderOptions,
  TogetherAIRerankingModelOptions,
  TogetherAIRerankingOptions,
} from '@ai-tools/togetherai';
import type {
  XaiImageModelOptions,
  XaiImageProviderOptions,
  XaiLanguageModelChatOptions,
  XaiLanguageModelResponsesOptions,
  XaiProviderOptions,
  XaiResponsesProviderOptions,
} from '@ai-tools/xai';
import { describe, expectTypeOf, it } from 'vitest';

describe('deprecated provider options type aliases', () => {
  describe('@ai-tools/alibaba', () => {
    it('AlibabaProviderOptions equals AlibabaLanguageModelOptions', () => {
      expectTypeOf<AlibabaProviderOptions>().toEqualTypeOf<AlibabaLanguageModelOptions>();
    });
    it('AlibabaVideoProviderOptions equals AlibabaVideoModelOptions', () => {
      expectTypeOf<AlibabaVideoProviderOptions>().toEqualTypeOf<AlibabaVideoModelOptions>();
    });
  });

  describe('@ai-tools/amazon-bedrock', () => {
    it('BedrockProviderOptions equals AmazonBedrockLanguageModelOptions', () => {
      expectTypeOf<BedrockProviderOptions>().toEqualTypeOf<AmazonBedrockLanguageModelOptions>();
    });
    it('BedrockRerankingOptions equals AmazonBedrockRerankingModelOptions', () => {
      expectTypeOf<BedrockRerankingOptions>().toEqualTypeOf<AmazonBedrockRerankingModelOptions>();
    });
  });

  describe('@ai-tools/anthropic', () => {
    it('AnthropicProviderOptions equals AnthropicLanguageModelOptions', () => {
      expectTypeOf<AnthropicProviderOptions>().toEqualTypeOf<AnthropicLanguageModelOptions>();
    });
  });

  describe('@ai-tools/azure', () => {
    it('OpenAIResponsesProviderOptions equals OpenAILanguageModelResponsesOptions', () => {
      expectTypeOf<AzureOpenAIResponsesProviderOptions>().toEqualTypeOf<AzureOpenAILanguageModelResponsesOptions>();
    });
    it('OpenAIChatLanguageModelOptions equals OpenAILanguageModelChatOptions', () => {
      expectTypeOf<AzureOpenAIChatLanguageModelOptions>().toEqualTypeOf<AzureOpenAILanguageModelChatOptions>();
    });
  });

  describe('@ai-tools/black-forest-labs', () => {
    it('BlackForestLabsImageProviderOptions equals BlackForestLabsImageModelOptions', () => {
      expectTypeOf<BlackForestLabsImageProviderOptions>().toEqualTypeOf<BlackForestLabsImageModelOptions>();
    });
  });

  describe('@ai-tools/cohere', () => {
    it('CohereChatModelOptions equals CohereLanguageModelOptions', () => {
      expectTypeOf<CohereChatModelOptions>().toEqualTypeOf<CohereLanguageModelOptions>();
    });
    it('CohereRerankingOptions equals CohereRerankingModelOptions', () => {
      expectTypeOf<CohereRerankingOptions>().toEqualTypeOf<CohereRerankingModelOptions>();
    });
  });

  describe('@ai-tools/deepgram', () => {
    it('DeepgramSpeechCallOptions equals DeepgramSpeechModelOptions', () => {
      expectTypeOf<DeepgramSpeechCallOptions>().toEqualTypeOf<DeepgramSpeechModelOptions>();
    });
  });

  describe('@ai-tools/deepseek', () => {
    it('DeepSeekChatOptions equals DeepSeekLanguageModelOptions', () => {
      expectTypeOf<DeepSeekChatOptions>().toEqualTypeOf<DeepSeekLanguageModelOptions>();
    });
  });

  describe('@ai-tools/fal', () => {
    it('FalImageProviderOptions equals FalImageModelOptions', () => {
      expectTypeOf<FalImageProviderOptions>().toEqualTypeOf<FalImageModelOptions>();
    });
    it('FalVideoProviderOptions equals FalVideoModelOptions', () => {
      expectTypeOf<FalVideoProviderOptions>().toEqualTypeOf<FalVideoModelOptions>();
    });
  });

  describe('@ai-tools/fireworks', () => {
    it('FireworksProviderOptions equals FireworksLanguageModelOptions', () => {
      expectTypeOf<FireworksProviderOptions>().toEqualTypeOf<FireworksLanguageModelOptions>();
    });
    it('FireworksEmbeddingProviderOptions equals FireworksEmbeddingModelOptions', () => {
      expectTypeOf<FireworksEmbeddingProviderOptions>().toEqualTypeOf<FireworksEmbeddingModelOptions>();
    });
  });

  describe('@ai-tools/gateway', () => {
    it('GatewayLanguageModelOptions equals GatewayProviderOptions', () => {
      expectTypeOf<GatewayLanguageModelOptions>().toEqualTypeOf<GatewayProviderOptions>();
    });
  });

  describe('@ai-tools/google', () => {
    it('GoogleGenerativeAIProviderOptions equals GoogleLanguageModelOptions', () => {
      expectTypeOf<GoogleGenerativeAIProviderOptions>().toEqualTypeOf<GoogleLanguageModelOptions>();
    });
    it('GoogleGenerativeAIImageProviderOptions equals GoogleImageModelOptions', () => {
      expectTypeOf<GoogleGenerativeAIImageProviderOptions>().toEqualTypeOf<GoogleImageModelOptions>();
    });
    it('GoogleGenerativeAIEmbeddingProviderOptions equals GoogleEmbeddingModelOptions', () => {
      expectTypeOf<GoogleGenerativeAIEmbeddingProviderOptions>().toEqualTypeOf<GoogleEmbeddingModelOptions>();
    });
    it('GoogleGenerativeAIVideoProviderOptions equals GoogleVideoModelOptions', () => {
      expectTypeOf<GoogleGenerativeAIVideoProviderOptions>().toEqualTypeOf<GoogleVideoModelOptions>();
    });
  });

  describe('@ai-tools/google-vertex', () => {
    it('GoogleVertexImageProviderOptions equals GoogleVertexImageModelOptions', () => {
      expectTypeOf<GoogleVertexImageProviderOptions>().toEqualTypeOf<GoogleVertexImageModelOptions>();
    });
    it('GoogleVertexVideoProviderOptions equals GoogleVertexVideoModelOptions', () => {
      expectTypeOf<GoogleVertexVideoProviderOptions>().toEqualTypeOf<GoogleVertexVideoModelOptions>();
    });
  });

  describe('@ai-tools/groq', () => {
    it('GroqProviderOptions equals GroqLanguageModelOptions', () => {
      expectTypeOf<GroqProviderOptions>().toEqualTypeOf<GroqLanguageModelOptions>();
    });
  });

  describe('@ai-tools/klingai', () => {
    it('KlingAIVideoProviderOptions equals KlingAIVideoModelOptions', () => {
      expectTypeOf<KlingAIVideoProviderOptions>().toEqualTypeOf<KlingAIVideoModelOptions>();
    });
  });

  describe('@ai-tools/luma', () => {
    it('LumaImageProviderOptions equals LumaImageModelOptions', () => {
      expectTypeOf<LumaImageProviderOptions>().toEqualTypeOf<LumaImageModelOptions>();
    });
  });

  describe('@ai-tools/moonshotai', () => {
    it('MoonshotAIProviderOptions equals MoonshotAILanguageModelOptions', () => {
      expectTypeOf<MoonshotAIProviderOptions>().toEqualTypeOf<MoonshotAILanguageModelOptions>();
    });
  });

  describe('@ai-tools/openai', () => {
    it('OpenAIResponsesProviderOptions equals OpenAILanguageModelResponsesOptions', () => {
      expectTypeOf<OpenAIResponsesProviderOptions>().toEqualTypeOf<OpenAILanguageModelResponsesOptions>();
    });
    it('OpenAIChatLanguageModelOptions equals OpenAILanguageModelChatOptions', () => {
      expectTypeOf<OpenAIChatLanguageModelOptions>().toEqualTypeOf<OpenAILanguageModelChatOptions>();
    });
  });

  describe('@ai-tools/openai-compatible', () => {
    it('OpenAICompatibleProviderOptions equals OpenAICompatibleLanguageModelChatOptions', () => {
      expectTypeOf<OpenAICompatibleProviderOptions>().toEqualTypeOf<OpenAICompatibleLanguageModelChatOptions>();
    });
    it('OpenAICompatibleCompletionProviderOptions equals OpenAICompatibleLanguageModelCompletionOptions', () => {
      expectTypeOf<OpenAICompatibleCompletionProviderOptions>().toEqualTypeOf<OpenAICompatibleLanguageModelCompletionOptions>();
    });
    it('OpenAICompatibleEmbeddingProviderOptions equals OpenAICompatibleEmbeddingModelOptions', () => {
      expectTypeOf<OpenAICompatibleEmbeddingProviderOptions>().toEqualTypeOf<OpenAICompatibleEmbeddingModelOptions>();
    });
  });

  describe('@ai-tools/prodia', () => {
    it('ProdiaImageProviderOptions equals ProdiaImageModelOptions', () => {
      expectTypeOf<ProdiaImageProviderOptions>().toEqualTypeOf<ProdiaImageModelOptions>();
    });
  });

  describe('@ai-tools/replicate', () => {
    it('ReplicateImageProviderOptions equals ReplicateImageModelOptions', () => {
      expectTypeOf<ReplicateImageProviderOptions>().toEqualTypeOf<ReplicateImageModelOptions>();
    });
    it('ReplicateVideoProviderOptions equals ReplicateVideoModelOptions', () => {
      expectTypeOf<ReplicateVideoProviderOptions>().toEqualTypeOf<ReplicateVideoModelOptions>();
    });
  });

  describe('@ai-tools/togetherai', () => {
    it('TogetherAIRerankingOptions equals TogetherAIRerankingModelOptions', () => {
      expectTypeOf<TogetherAIRerankingOptions>().toEqualTypeOf<TogetherAIRerankingModelOptions>();
    });
    it('TogetherAIImageProviderOptions equals TogetherAIImageModelOptions', () => {
      expectTypeOf<TogetherAIImageProviderOptions>().toEqualTypeOf<TogetherAIImageModelOptions>();
    });
  });

  describe('@ai-tools/xai', () => {
    it('XaiProviderOptions equals XaiLanguageModelChatOptions', () => {
      expectTypeOf<XaiProviderOptions>().toEqualTypeOf<XaiLanguageModelChatOptions>();
    });
    it('XaiResponsesProviderOptions equals XaiLanguageModelResponsesOptions', () => {
      expectTypeOf<XaiResponsesProviderOptions>().toEqualTypeOf<XaiLanguageModelResponsesOptions>();
    });
    it('XaiImageProviderOptions equals XaiImageModelOptions', () => {
      expectTypeOf<XaiImageProviderOptions>().toEqualTypeOf<XaiImageModelOptions>();
    });
  });
});
