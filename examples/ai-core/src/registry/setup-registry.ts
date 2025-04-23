import { anthropic } from '@ai-toolkit/anthropic';
import { fal } from '@ai-toolkit/fal';
import { groq } from '@ai-toolkit/groq';
import { luma } from '@ai-toolkit/luma';
import { mistral } from '@ai-toolkit/mistral';
import { openai } from '@ai-toolkit/openai';
import { replicate } from '@ai-toolkit/replicate';
import { xai } from '@ai-toolkit/xai';
import { createProviderRegistry, customProvider } from 'ai';
import 'dotenv/config';

// custom provider with alias names:
const myAnthropic = customProvider({
  languageModels: {
    opus: anthropic('claude-3-opus-20240229'),
    sonnet: anthropic('claude-3-5-sonnet-20240620'),
    haiku: anthropic('claude-3-haiku-20240307'),
  },
  fallbackProvider: anthropic,
});

// custom provider with different model settings:
const myOpenAI = customProvider({
  languageModels: {
    // replacement model with custom settings:
    'gpt-4': openai('gpt-4', { structuredOutputs: true }),
    // alias model with custom settings:
    'gpt-4o-structured': openai('gpt-4o', { structuredOutputs: true }),
  },
  fallbackProvider: openai,
});

export const registry = createProviderRegistry({
  mistral,
  anthropic: myAnthropic,
  openai: myOpenAI,
  xai,
  groq,
});

registry.languageModel('anthropic:haiku');

const registryWithCustomSeparator = createProviderRegistry(
  {
    mistral,
    anthropic: myAnthropic,
    openai: myOpenAI,
    xai,
    groq,
  },
  { separator: ' > ' },
);

registryWithCustomSeparator.languageModel('anthropic > haiku');

export const myImageModels = customProvider({
  imageModels: {
    recraft: fal.imageModel('recraft-v3'),
    photon: luma.imageModel('photon-flash-1'),
    flux: replicate.imageModel('black-forest-labs/flux-schnell'),
  },
});
