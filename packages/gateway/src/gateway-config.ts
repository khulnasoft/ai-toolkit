import type { FetchFunction, Resolvable } from '@ai-toolkit/provider-utils';

export type GatewayConfig = {
  baseURL: string;
  headers: () => Resolvable<Record<string, string | undefined>>;
  fetch?: FetchFunction;
};
