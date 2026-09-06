import { gateways } from '../../../content/gateways-registry/registry';
import type { Gateway } from '../../../content/gateways-registry/registry';
import { metricFor } from './metrics';
import type { Metric } from './types';

export type { Gateway };
export { gateways };

export type GatewayStatus = 'operational' | 'degraded' | 'quiet';

export interface GatewayRow extends Gateway {
  status: GatewayStatus;
  metrics: Metric;
}

export function statusFromUptime(uptimePct: number): GatewayStatus {
  if (uptimePct >= 99.9) return 'operational';
  if (uptimePct >= 98.5) return 'degraded';
  return 'quiet';
}

export function getGatewayRows(): GatewayRow[] {
  return gateways.map(gateway => {
    const metrics = metricFor(gateway.slug);
    return {
      ...gateway,
      status: statusFromUptime(metrics.uptimePct),
      metrics,
    };
  });
}

export function getGatewayDevelopers(): string[] {
  return Array.from(new Set(gateways.map(gateway => gateway.developer))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function getGatewayTags(): string[] {
  return Array.from(
    new Set(gateways.flatMap(gateway => gateway.tags ?? [])),
  ).sort((a, b) => a.localeCompare(b));
}
