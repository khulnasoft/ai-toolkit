import { gateways } from '../../../content/gateways-registry/registry';

export type { Gateway } from '../../../content/gateways-registry/registry';
export { gateways };

export interface GatewayCategory {
  id: string;
  title: string;
  description: string;
}

export const gatewayCategories: GatewayCategory[] = [
  {
    id: 'unified-access',
    title: 'Unified Access',
    description: 'One API key for hundreds of models across providers.',
  },
  {
    id: 'routing',
    title: 'Routing & Fallbacks',
    description: 'Automatic failover, load balancing, and smart model routing.',
  },
  {
    id: 'observability',
    title: 'Observability',
    description: 'Tracing, logging, and analytics for every request.',
  },
  {
    id: 'caching',
    title: 'Caching',
    description: 'Cache responses to cut latency and cost.',
  },
  {
    id: 'security',
    title: 'Security & Guardrails',
    description: 'Prompt-injection detection, guardrails, and access controls.',
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'SLA-backed reliability, self-hosting, and governance.',
  },
];

const categoryByTag: Record<string, string> = {
  'unified-access': 'unified-access',
  access: 'unified-access',
  models: 'unified-access',
  'one-api-key': 'unified-access',
  'open-source': 'unified-access',
  'openai-compatible': 'unified-access',
  routing: 'routing',
  fallbacks: 'routing',
  failover: 'routing',
  'load-balancing': 'routing',
  retries: 'routing',
  byok: 'routing',
  observability: 'observability',
  tracing: 'observability',
  monitoring: 'observability',
  caching: 'caching',
  cache: 'caching',
  security: 'security',
  guardrails: 'security',
  'prompt-injection': 'security',
  enterprise: 'enterprise',
  'self-hosted': 'enterprise',
  governance: 'enterprise',
  sla: 'enterprise',
};

export function gatewayCategoryOf(gateway: { tags?: string[] }): string {
  for (const tag of gateway.tags ?? []) {
    const category = categoryByTag[tag];
    if (category) return category;
  }
  return 'unified-access';
}

export function getGatewaysByCategory(categoryId: string) {
  return gateways.filter(gateway => gatewayCategoryOf(gateway) === categoryId);
}

export function getGatewayCategoriesWithCounts() {
  return gatewayCategories.map(category => ({
    ...category,
    count: getGatewaysByCategory(category.id).length,
  }));
}
