import { GatewayBrowser } from '@/components/gateway-browser';
import { SectionHeader } from '@/components/section-header';
import {
  gatewayCategoryOf,
  gateways,
  getGatewayCategoriesWithCounts,
} from '@/lib/gateways';

export const metadata = {
  title: 'AI Gateways',
};

export default function GatewaysPage() {
  const categories = getGatewayCategoriesWithCounts();
  const gatewaysWithCategory = gateways.map(gateway => ({
    ...gateway,
    category: gatewayCategoryOf(gateway),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <SectionHeader
        eyebrow="AI GATEWAYS"
        title="One API, every model."
        description="Browse AI gateways that unify access to hundreds of models across providers. Add routing, fallbacks, caching, and observability to a single integration."
      />
      <div className="mt-10">
        <GatewayBrowser
          categories={categories}
          gateways={gatewaysWithCategory}
        />
      </div>
    </div>
  );
}
