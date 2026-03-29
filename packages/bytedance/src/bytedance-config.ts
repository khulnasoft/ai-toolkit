import type { FetchFunction, Resolvable } from '@ai-tools/provider-utils';

export interface ByteDanceConfig {
  provider: string;
  baseURL: string;
  headers: Resolvable<Record<string, string | undefined>>;
  fetch?: FetchFunction;
}
