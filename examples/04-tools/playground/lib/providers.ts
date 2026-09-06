export interface AIProvider {
  id: string;
  name: string;
  models: string[];
  createModel: (model: string) => { provider: string; model: string };
}

export const aiProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4.1', 'gpt-4o'],
    createModel: model => ({ provider: 'openai', model }),
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: ['claude-3-7-sonnet'],
    createModel: model => ({ provider: 'anthropic', model }),
  },
  {
    id: 'google',
    name: 'Google',
    models: ['gemini-2.5-pro'],
    createModel: model => ({ provider: 'google', model }),
  },
];

export function getProvider(providerId: string) {
  return aiProviders.find(provider => provider.id === providerId);
}
export function getProviderModel(providerId: string, modelId: string) {
  const provider = getProvider(providerId);
  if (!provider) throw new Error(`Provider ${providerId} not found`);
  return provider.createModel(modelId);
}
