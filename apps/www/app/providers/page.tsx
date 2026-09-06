import Link from 'next/link';
import { ArrowUpRight, Blocks, Bot, Cpu, Plug, Users } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import {
  getProviderCategoriesWithCounts,
  type ProviderCategoryId,
} from '@/lib/providers';

export const metadata = {
  title: 'Providers',
};

const kindIcons: Record<ProviderCategoryId, typeof Bot> = {
  'ai-toolkit': Cpu,
  'openai-compatible': Plug,
  community: Users,
  adapters: Blocks,
  observability: Bot,
};

export default function ProvidersPage() {
  const categories = getProviderCategoriesWithCounts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <SectionHeader
        eyebrow="PROVIDERS"
        title="One interface, every model."
        description="Connect to any model provider through the same AI TOOLKIT primitives — first-party, OpenAI-compatible, community, framework adapters, and observability tooling."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {categories.map(category => {
          const Icon = kindIcons[category.id];
          return (
            <Link
              key={category.id}
              href={`/providers/${category.docsSlug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[.2em] text-primary">
                {category.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {category.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {category.count} providers
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
