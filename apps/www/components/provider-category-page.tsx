import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProviderBrowser } from '@/components/provider-browser';
import { SectionHeader } from '@/components/section-header';
import {
  getProviderCategory,
  getProviders,
  type ProviderCategoryId,
} from '@/lib/providers';

export function ProviderCategoryPage({
  categoryId,
}: {
  categoryId: ProviderCategoryId;
}) {
  const category = getProviderCategory(categoryId);
  if (!category) return null;

  const providers = getProviders(categoryId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <SectionHeader
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.description}
      />
      <div className="mt-6 text-center">
        <Link
          href="/providers"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          All provider categories
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
      <div className="mt-8">
        <ProviderBrowser providers={providers} docsSlug={category.docsSlug} />
      </div>
    </div>
  );
}
