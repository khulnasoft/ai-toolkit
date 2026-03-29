import { FetchFunction } from '@ai-toolkit/provider-utils';

export type OpenResponsesConfig = {
  provider: string;
  url: string;
  headers: () => Record<string, string | undefined>;
  fetch?: FetchFunction;
  generateId: () => string;
};
