import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { GatewayModelsBrowser } from '@/components/gateway-models-browser';
import { SectionHeader } from '@/components/section-header';
import {
  getGatewayModelCounts,
  getGatewayModels,
  getGatewayModelProviders,
} from '@/lib/gateway-models';

export const metadata = {
  title: 'AI Gateway Models',
};

export default function GatewayModelsPage() {
  const models = getGatewayModels();
  const providers = getGatewayModelProviders();
  const counts = getGatewayModelCounts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <SectionHeader
        eyebrow="AI GATEWAY MODELS"
        title={`One API key, ${models.length} models.`}
        description="Every model available through the AI Gateway — language, embedding, and image models from OpenAI, Anthropic, Google, Meta, xAI, and more, all through a single endpoint."
      />

      <div className="mt-6 text-center">
        <Link
          href="/gateways"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          Back to all gateways
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4 border-y border-border py-6 text-center">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Language
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight">
            {counts.language}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Embedding
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight">
            {counts.embedding}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Image
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight">
            {counts.image}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <GatewayModelsBrowser models={models} providers={providers} />
      </div>
    </div>
  );
}
