// @ts-nocheck
import { createAnthropic } from '@ai-tools/anthropic';

const anthropic = createAnthropic({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
