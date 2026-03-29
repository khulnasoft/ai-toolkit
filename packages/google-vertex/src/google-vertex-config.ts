import { FetchFunction, Resolvable } from '@ai-tools/provider-utils';

export interface GoogleVertexConfig {
  provider: string;
  baseURL: string;
  headers: Resolvable<Record<string, string | undefined>>;
  fetch?: FetchFunction;
}
