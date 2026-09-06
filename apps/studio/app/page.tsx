import type { Metadata } from 'next';
import { Bars } from '@ai-toolkit/design/bars';
import { Donut } from '@ai-toolkit/design/donut';
import { KpiCard } from '@ai-toolkit/design/kpi-card';
import {
  GatewayStatusTable,
  TopModelsTable,
} from '@/components/overview-tables';
import { PageHeader } from '@/components/page-header';
import { Panel } from '@ai-toolkit/design/panel';
import { Section } from '@ai-toolkit/design/section';
import { getGatewayRows } from '@/lib/gateways';
import {
  getGatewayModels,
  getModelMetrics,
  getModelProviders,
} from '@/lib/models';
import { getProviders } from '@/lib/providers';
import { tools } from '@/lib/tools';
import { getTemplates } from '@/lib/templates';
import {
  formatCost,
  formatLatency,
  formatRequests,
  metricFor,
} from '@/lib/metrics';
import type { ModelEntry, Metric } from '@/lib/types';

export const metadata: Metadata = { title: 'Overview' };

export default function OverviewPage() {
  const models = getGatewayModels();
  const providerEntries = getProviders();
  const gateways = getGatewayRows();
  const global = metricFor('global');

  const counts = {
    providers: providerEntries.length,
    models: models.length,
    gateways: gateways.length,
    tools: tools.length,
  };

  const providerShare = getModelProviders().slice(0, 8);
  const modalityCounts = models.reduce<Record<string, number>>(
    (acc, model) => {
      acc[model.modality] = (acc[model.modality] ?? 0) + 1;
      return acc;
    },
    { language: 0, embedding: 0, image: 0 },
  );

  const topModels: (ModelEntry & { metrics: Metric })[] = models
    .map(model => ({ ...model, metrics: getModelMetrics(model.id) }))
    .sort((a, b) => b.metrics.requests - a.metrics.requests)
    .slice(0, 10);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        eyebrow="Studio · Overview"
        title="AI Toolkit at a glance."
        description="A read-only dashboard over the catalog — seeded metrics, no backend. Search from the top bar or drill into a section."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Providers"
          value={counts.providers}
          delta={metricFor('count:providers').deltaPct}
        />
        <KpiCard
          label="Models"
          value={counts.models}
          delta={metricFor('count:models').deltaPct}
        />
        <KpiCard
          label="Gateways"
          value={counts.gateways}
          delta={metricFor('count:gateways').deltaPct}
        />
        <KpiCard
          label="Tools"
          value={counts.tools}
          delta={metricFor('count:tools').deltaPct}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Requests"
          value={formatRequests(global.requests)}
          delta={global.deltaPct}
          spark={global.trend}
        />
        <KpiCard
          label="Cost"
          value={formatCost(global.costUsd)}
          delta={global.deltaPct}
        />
        <KpiCard label="Avg latency" value={formatLatency(global.latencyMs)} />
        <KpiCard
          label="Uptime"
          value={`${global.uptimePct}%`}
          sub="30-day window"
        />
      </div>

      <Section title="Distribution">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Models by provider">
            <Bars
              data={providerShare.map(provider => ({
                label: provider.name,
                value: provider.count,
                hint: `${provider.name}: ${provider.count} models`,
              }))}
            />
          </Panel>
          <Panel title="Models by modality">
            <Donut
              data={[
                { label: 'Language', value: modalityCounts.language },
                { label: 'Embedding', value: modalityCounts.embedding },
                { label: 'Image', value: modalityCounts.image },
              ]}
            />
          </Panel>
        </div>
      </Section>

      <Section
        title="Top models by requests"
        aside={
          <p className="eyebrow">
            {counts.models} models · {providerShare.length}+ providers
          </p>
        }
      >
        <TopModelsTable rows={topModels} />
      </Section>

      <Section title="Gateway status">
        <GatewayStatusTable rows={gateways} />
      </Section>
    </div>
  );
}
