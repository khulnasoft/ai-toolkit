// @ts-nocheck
import { Mistral } from '@ai-toolkit/mistral';

const mistral = new Mistral({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
