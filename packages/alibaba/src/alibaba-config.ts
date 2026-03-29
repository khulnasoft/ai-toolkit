import type { FetchFunction } from '@ai-tools/provider-utils';

export interface AlibabaConfig {
  provider: string;
  baseURL: string;
  headers: () => Record<string, string | undefined>;
  fetch?: FetchFunction;
  includeUsage?: boolean;
}
