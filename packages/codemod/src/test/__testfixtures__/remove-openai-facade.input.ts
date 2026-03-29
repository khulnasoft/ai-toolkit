// @ts-nocheck
import { createOpenAI } from '@ai-tools/openai';

const openai = createOpenAI({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
