import { openai } from '@ai-toolkit/openai';
import { anthropic } from '@ai-toolkit/anthropic';
import { google } from '@ai-toolkit/google';
import { groq } from '@ai-toolkit/groq';
import { mistral } from '@ai-toolkit/mistral';
import { cohere } from '@ai-toolkit/cohere';
import { perplexity } from '@ai-toolkit/perplexity';
import { xai } from '@ai-toolkit/xai';
import { fireworks } from '@ai-toolkit/fireworks';
import { deepseek } from '@ai-toolkit/deepseek';

export interface AIProvider {
  id: string;
  name: string;
  models: string[];
  createModel: (model: string) => any;
}

export const aiProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    createModel: (model: string) => openai(model),
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    createModel: (model: string) => anthropic(model),
  },
  {
    id: 'google',
    name: 'Google',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    createModel: (model: string) => google(model),
  },
  {
    id: 'groq',
    name: 'Groq',
    models: ['llama2-70b-4096', 'mixtral-8x7b-32768', 'gemma-7b-it'],
    createModel: (model: string) => groq(model),
  },
  {
    id: 'mistral',
    name: 'Mistral',
    models: ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'],
    createModel: (model: string) => mistral(model),
  },
  {
    id: 'cohere',
    name: 'Cohere',
    models: ['command', 'command-r', 'command-r-plus'],
    createModel: (model: string) => cohere(model),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    models: ['sonar-small-chat', 'sonar-medium-chat', 'sonar-large-chat'],
    createModel: (model: string) => perplexity(model),
  },
  {
    id: 'xai',
    name: 'xAI',
    models: ['grok-beta'],
    createModel: (model: string) => xai(model),
  },
  {
    id: 'fireworks',
    name: 'Fireworks',
    models: ['llama-v3-70b-instruct', 'mixtral-8x7b-instruct', 'gem-7b-instruct'],
    createModel: (model: string) => fireworks(model),
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    models: ['deepseek-chat', 'deepseek-coder'],
    createModel: (model: string) => deepseek(model),
  },
];

export function getProvider(providerId: string): AIProvider | undefined {
  return aiProviders.find(provider => provider.id === providerId);
}

export function getProviderModel(providerId: string, modelId: string): any {
  const provider = getProvider(providerId);
  if (!provider) {
    throw new Error(`Provider ${providerId} not found`);
  }
  return provider.createModel(modelId);
}
