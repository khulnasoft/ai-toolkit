import type {
  AlibabaLanguageModelOptions,
  AlibabaProviderOptions,
  AlibabaVideoModelOptions,
  AlibabaVideoProviderOptions,
} from '@ai-toolkit/alibaba';
import type {
  AmazonBedrockLanguageModelOptions,
  AmazonBedrockRerankingModelOptions,
  BedrockProviderOptions,
  BedrockRerankingOptions,
} from '@ai-toolkit/amazon-bedrock';
import type {
  AnthropicLanguageModelOptions,
  AnthropicProviderOptions,
} from '@ai-toolkit/anthropic';
import type {
  OpenAIChatLanguageModelOptions as AzureOpenAIChatLanguageModelOptions,
  OpenAILanguageModelChatOptions as AzureOpenAILanguageModelChatOptions,
  OpenAILanguageModelResponsesOptions as AzureOpenAILanguageModelResponsesOptions,
  OpenAIResponsesProviderOptions as AzureOpenAIResponsesProviderOptions,
} from '@ai-toolkit/azure';
import type {
  BlackForestLabsImageModelOptions,
  BlackForestLabsImageProviderOptions,
} from '@ai-toolkit/black-forest-labs';
import type {
  CohereChatModelOptions,
  CohereLanguageModelOptions,
  CohereRerankingModelOptions,
  CohereRerankingOptions,
} from '@ai-toolkit/cohere';
import type {
  DeepgramSpeechCallOptions,
  DeepgramSpeechModelOptions,
} from '@ai-toolkit/deepgram';
import type {
  DeepSeekChatOptions,
  DeepSeekLanguageModelOptions,
} from '@ai-toolkit/deepseek';
import type {
  FalImageModelOptions,
  FalImageProviderOptions,
  FalVideoModelOptions,
  FalVideoProviderOptions,
} from '@ai-toolkit/fal';
import type {
  FireworksEmbeddingModelOptions,
  FireworksEmbeddingProviderOptions,
  FireworksLanguageModelOptions,
  FireworksProviderOptions,
} from '@ai-toolkit/fireworks';
import type {
  GatewayLanguageModelOptions,
  GatewayProviderOptions,
} from '@ai-toolkit/gateway';
import type {
  GoogleEmbeddingModelOptions,
  GoogleGenerativeAIEmbeddingProviderOptions,
  GoogleGenerativeAIImageProviderOptions,
  GoogleGenerativeAIProviderOptions,
  GoogleGenerativeAIVideoProviderOptions,
  GoogleImageModelOptions,
  GoogleLanguageModelOptions,
  GoogleVideoModelOptions,
} from '@ai-toolkit/google';
import type {
  GoogleVertexImageModelOptions,
  GoogleVertexImageProviderOptions,
  GoogleVertexVideoModelOptions,
  GoogleVertexVideoProviderOptions,
} from '@ai-toolkit/google-vertex';
import type {
  GroqLanguageModelOptions,
  GroqProviderOptions,
} from '@ai-toolkit/groq';
import type {
  KlingAIVideoModelOptions,
  KlingAIVideoProviderOptions,
} from '@ai-toolkit/klingai';
import type {
  LumaImageModelOptions,
  LumaImageProviderOptions,
} from '@ai-toolkit/luma';
import type {
  MoonshotAILanguageModelOptions,
  MoonshotAIProviderOptions,
} from '@ai-toolkit/moonshotai';
import type {
  OpenAIChatLanguageModelOptions,
  OpenAILanguageModelChatOptions,
  OpenAILanguageModelResponsesOptions,
  OpenAIResponsesProviderOptions,
} from '@ai-toolkit/openai';
import type {
  OpenAICompatibleCompletionProviderOptions,
  OpenAICompatibleEmbeddingModelOptions,
  OpenAICompatibleEmbeddingProviderOptions,
  OpenAICompatibleLanguageModelChatOptions,
  OpenAICompatibleLanguageModelCompletionOptions,
  OpenAICompatibleProviderOptions,
} from '@ai-toolkit/openai-compatible';
import type {
  ProdiaImageModelOptions,
  ProdiaImageProviderOptions,
} from '@ai-toolkit/prodia';
import type {
  ReplicateImageModelOptions,
  ReplicateImageProviderOptions,
  ReplicateVideoModelOptions,
  ReplicateVideoProviderOptions,
} from '@ai-toolkit/replicate';
import type {
  TogetherAIImageModelOptions,
  TogetherAIImageProviderOptions,
  TogetherAIRerankingModelOptions,
  TogetherAIRerankingOptions,
} from '@ai-toolkit/togetherai';
import type {
  XaiImageModelOptions,
  XaiImageProviderOptions,
  XaiLanguageModelChatOptions,
  XaiLanguageModelResponsesOptions,
  XaiProviderOptions,
  XaiResponsesProviderOptions,
} from '@ai-toolkit/xai';
import { describe, expectTypeOf, it } from 'vitest';

describe('deprecated provider options type aliases', () => {
  describe('@ai-toolkit/alibaba', () => {
    it('AlibabaProviderOptions equals AlibabaLanguageModelOptions', () => {
      expectTypeOf<AlibabaProviderOptions>().toEqualTypeOf<AlibabaLanguageModelOptions>();
    });
    it('AlibabaVideoProviderOptions equals AlibabaVideoModelOptions', () => {
      expectTypeOf<AlibabaVideoProviderOptions>().toEqualTypeOf<AlibabaVideoModelOptions>();
    });
  });

  describe('@ai-toolkit/amazon-bedrock', () => {
    it('BedrockProviderOptions equals AmazonBedrockLanguageModelOptions', () => {
      expectTypeOf<BedrockProviderOptions>().toEqualTypeOf<AmazonBedrockLanguageModelOptions>();
    });
    it('BedrockRerankingOptions equals AmazonBedrockRerankingModelOptions', () => {
      expectTypeOf<BedrockRerankingOptions>().toEqualTypeOf<AmazonBedrockRerankingModelOptions>();
    });
  });

  describe('@ai-toolkit/anthropic', () => {
    it('AnthropicProviderOptions equals AnthropicLanguageModelOptions', () => {
      expectTypeOf<AnthropicProviderOptions>().toEqualTypeOf<AnthropicLanguageModelOptions>();
    });
  });

  describe('@ai-toolkit/azure', () => {
    it('OpenAIResponsesProviderOptions equals OpenAILanguageModelResponsesOptions', () => {
      expectTypeOf<AzureOpenAIResponsesProviderOptions>().toEqualTypeOf<AzureOpenAILanguageModelResponsesOptions>();
    });
    it('OpenAIChatLanguageModelOptions equals OpenAILanguageModelChatOptions', () => {
      expectTypeOf<AzureOpenAIChatLanguageModelOptions>().toEqualTypeOf<AzureOpenAILanguageModelChatOptions>();
    });
  });

  describe('@ai-toolkit/black-forest-labs', () => {
    it('BlackForestLabsImageProviderOptions equals BlackForestLabsImageModelOptions', () => {
      expectTypeOf<BlackForestLabsImageProviderOptions>().toEqualTypeOf<BlackForestLabsImageModelOptions>();
    });
  });

  describe('@ai-toolkit/cohere', () => {
    it('CohereChatModelOptions equals CohereLanguageModelOptions', () => {
      expectTypeOf<CohereChatModelOptions>().toEqualTypeOf<CohereLanguageModelOptions>();
    });
    it('CohereRerankingOptions equals CohereRerankingModelOptions', () => {
      expectTypeOf<CohereRerankingOptions>().toEqualTypeOf<CohereRerankingModelOptions>();
    });
  });

  describe('@ai-toolkit/deepgram', () => {
    it('DeepgramSpeechCallOptions equals DeepgramSpeechModelOptions', () => {
      expectTypeOf<DeepgramSpeechCallOptions>().toEqualTypeOf<DeepgramSpeechModelOptions>();
    });
  });

  describe('@ai-toolkit/deepseek', () => {
    it('DeepSeekChatOptions equals DeepSeekLanguageModelOptions', () => {
      expectTypeOf<DeepSeekChatOptions>().toEqualTypeOf<DeepSeekLanguageModelOptions>();
    });
  });

  describe('@ai-toolkit/fal', () => {
    it('FalImageProviderOptions equals FalImageModelOptions', () => {
      expectTypeOf<FalImageProviderOptions>().toEqualTypeOf<FalImageModelOptions>();
    });
    it('FalVideoProviderOptions equals FalVideoModelOptions', () => {
      expectTypeOf<FalVideoProviderOptions>().toEqualTypeOf<FalVideoModelOptions>();
    });
  });

  describe('@ai-toolkit/fireworks', () => {
    it('FireworksProviderOptions equals FireworksLanguageModelOptions', () => {
      expectTypeOf<FireworksProviderOptions>().toEqualTypeOf<FireworksLanguageModelOptions>();
    });
    it('FireworksEmbeddingProviderOptions equals FireworksEmbeddingModelOptions', () => {
      expectTypeOf<FireworksEmbeddingProviderOptions>().toEqualTypeOf<FireworksEmbeddingModelOptions>();
    });
  });

  describe('@ai-toolkit/gateway', () => {
    it('GatewayLanguageModelOptions equals GatewayProviderOptions', () => {
      expectTypeOf<GatewayLanguageModelOptions>().toEqualTypeOf<GatewayProviderOptions>();
    });
  });

  describe('@ai-toolkit/google', () => {
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

  describe('@ai-toolkit/google-vertex', () => {
    it('GoogleVertexImageProviderOptions equals GoogleVertexImageModelOptions', () => {
      expectTypeOf<GoogleVertexImageProviderOptions>().toEqualTypeOf<GoogleVertexImageModelOptions>();
    });
    it('GoogleVertexVideoProviderOptions equals GoogleVertexVideoModelOptions', () => {
      expectTypeOf<GoogleVertexVideoProviderOptions>().toEqualTypeOf<GoogleVertexVideoModelOptions>();
    });
  });

  describe('@ai-toolkit/groq', () => {
    it('GroqProviderOptions equals GroqLanguageModelOptions', () => {
      expectTypeOf<GroqProviderOptions>().toEqualTypeOf<GroqLanguageModelOptions>();
    });
  });

  describe('@ai-toolkit/klingai', () => {
    it('KlingAIVideoProviderOptions equals KlingAIVideoModelOptions', () => {
      expectTypeOf<KlingAIVideoProviderOptions>().toEqualTypeOf<KlingAIVideoModelOptions>();
    });
  });

  describe('@ai-toolkit/luma', () => {
    it('LumaImageProviderOptions equals LumaImageModelOptions', () => {
      expectTypeOf<LumaImageProviderOptions>().toEqualTypeOf<LumaImageModelOptions>();
    });
  });

  describe('@ai-toolkit/moonshotai', () => {
    it('MoonshotAIProviderOptions equals MoonshotAILanguageModelOptions', () => {
      expectTypeOf<MoonshotAIProviderOptions>().toEqualTypeOf<MoonshotAILanguageModelOptions>();
    });
  });

  describe('@ai-toolkit/openai', () => {
    it('OpenAIResponsesProviderOptions equals OpenAILanguageModelResponsesOptions', () => {
      expectTypeOf<OpenAIResponsesProviderOptions>().toEqualTypeOf<OpenAILanguageModelResponsesOptions>();
    });
    it('OpenAIChatLanguageModelOptions equals OpenAILanguageModelChatOptions', () => {
      expectTypeOf<OpenAIChatLanguageModelOptions>().toEqualTypeOf<OpenAILanguageModelChatOptions>();
    });
  });

  describe('@ai-toolkit/openai-compatible', () => {
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

  describe('@ai-toolkit/prodia', () => {
    it('ProdiaImageProviderOptions equals ProdiaImageModelOptions', () => {
      expectTypeOf<ProdiaImageProviderOptions>().toEqualTypeOf<ProdiaImageModelOptions>();
    });
  });

  describe('@ai-toolkit/replicate', () => {
    it('ReplicateImageProviderOptions equals ReplicateImageModelOptions', () => {
      expectTypeOf<ReplicateImageProviderOptions>().toEqualTypeOf<ReplicateImageModelOptions>();
    });
    it('ReplicateVideoProviderOptions equals ReplicateVideoModelOptions', () => {
      expectTypeOf<ReplicateVideoProviderOptions>().toEqualTypeOf<ReplicateVideoModelOptions>();
    });
  });

  describe('@ai-toolkit/togetherai', () => {
    it('TogetherAIRerankingOptions equals TogetherAIRerankingModelOptions', () => {
      expectTypeOf<TogetherAIRerankingOptions>().toEqualTypeOf<TogetherAIRerankingModelOptions>();
    });
    it('TogetherAIImageProviderOptions equals TogetherAIImageModelOptions', () => {
      expectTypeOf<TogetherAIImageProviderOptions>().toEqualTypeOf<TogetherAIImageModelOptions>();
    });
  });

  describe('@ai-toolkit/xai', () => {
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
