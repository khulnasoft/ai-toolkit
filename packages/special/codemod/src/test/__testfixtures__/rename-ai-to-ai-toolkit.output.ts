// @ts-nocheck
import { generateText, streamText } from '@ai-toolkit/ai';
import { MockLanguageModelV2 } from '@ai-toolkit/ai/test';
import type { LanguageModel } from '@ai-toolkit/ai/internal';

export { generateText } from '@ai-toolkit/ai';

const result = await generateText({ model: 'openai/gpt-5', prompt: 'hi' });
