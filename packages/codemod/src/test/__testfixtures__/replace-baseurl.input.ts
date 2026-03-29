// @ts-nocheck
import { createAnthropic } from '@ai-tools/anthropic';
import { createOpenAI } from '@ai-tools/openai';
import { createMistral } from '@ai-tools/mistral';

const anthropic = createAnthropic({
  baseUrl: 'https://api.anthropic.com'
});

const openai = createOpenAI({
  baseUrl: 'https://api.openai.com'
});

const mistral = createMistral({
  baseUrl: 'https://api.mistral.ai'
});

// Should NOT rename - not in provider creation
const config = {
  baseUrl: 'https://example.com'
};

// Should NOT rename - not a provider
function someOtherFunction({ baseUrl }) {
  return baseUrl;
}
