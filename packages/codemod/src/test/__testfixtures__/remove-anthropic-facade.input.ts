// @ts-nocheck
import { Anthropic } from '@ai-toolkit/anthropic';

const anthropic = new Anthropic({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
