// @ts-nocheck
import { OpenAI } from '@ai-toolkit/openai';

const openai = new OpenAI({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
