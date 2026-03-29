// @ts-nocheck
import { createGoogleGenerativeAI } from '@ai-tools/google';

const google = createGoogleGenerativeAI({
  apiKey: 'key',
  baseURL: 'url',
  headers: { 'custom': 'header' }
});
