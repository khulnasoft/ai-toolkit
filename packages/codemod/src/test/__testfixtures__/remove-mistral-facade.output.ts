// @ts-nocheck
import { createMistral } from '@ai-tools/mistral';

const mistral = createMistral({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
