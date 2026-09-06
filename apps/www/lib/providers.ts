import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PROVIDERS_ROOT = join(process.cwd(), '../../content/providers');

export type ProviderCategoryId =
  | 'ai-toolkit'
  | 'openai-compatible'
  | 'community'
  | 'adapters'
  | 'observability';

export interface Provider {
  slug: string;
  name: string;
  description: string;
  filename: string;
}

export interface ProviderCategory {
  id: ProviderCategoryId;
  docsSlug: string;
  dir: string;
  eyebrow: string;
  title: string;
  description: string;
}

export const providerCategories: ProviderCategory[] = [
  {
    id: 'ai-toolkit',
    docsSlug: 'ai-toolkit-providers',
    dir: '01-ai-toolkit-providers',
    eyebrow: 'AI TOOLKIT PROVIDERS',
    title: 'First-party providers.',
    description:
      'Model providers maintained by the AI TOOLKIT team. Connect to OpenAI, Anthropic, Google, Amazon Bedrock, and more with a single consistent interface.',
  },
  {
    id: 'openai-compatible',
    docsSlug: 'openai-compatible-providers',
    dir: '02-openai-compatible-providers',
    eyebrow: 'OPENAI-COMPATIBLE PROVIDERS',
    title: 'Drop-in OpenAI-compatible providers.',
    description:
      'Wire any OpenAI-compatible endpoint into the AI TOOLKIT — self-hosted, managed, and everything in between.',
  },
  {
    id: 'community',
    docsSlug: 'community-providers',
    dir: '03-community-providers',
    eyebrow: 'COMMUNITY PROVIDERS',
    title: 'Providers built by the community.',
    description:
      'Community-maintained providers for models and platforms beyond the first-party set, all through the same primitives.',
  },
  {
    id: 'adapters',
    docsSlug: 'adapters',
    dir: '04-adapters',
    eyebrow: 'FRAMEWORK ADAPTERS',
    title: 'Use your favorite frameworks.',
    description:
      'Adapters that bridge LangChain and LlamaIndex to the AI TOOLKIT so you can combine ecosystems in one app.',
  },
  {
    id: 'observability',
    docsSlug: 'observability',
    dir: '05-observability',
    eyebrow: 'OBSERVABILITY',
    title: 'Trace, monitor, and evaluate.',
    description:
      'Instrument every generation with tracing, logging, evals, and analytics from the tools your team already uses.',
  },
];

function clean(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

export function getProviderCategory(
  categoryId: ProviderCategoryId,
): ProviderCategory | undefined {
  return providerCategories.find(category => category.id === categoryId);
}

export function getProviders(categoryId: ProviderCategoryId): Provider[] {
  const category = getProviderCategory(categoryId);
  if (!category) return [];

  const root = join(PROVIDERS_ROOT, category.dir);
  return readdirSync(root)
    .filter(file => file.endsWith('.mdx') && file !== 'index.mdx')
    .sort()
    .map(file => {
      const source = readFileSync(join(root, file), 'utf8');
      const title = source.match(/^title:\s*(.+)$/m)?.[1];
      const description = source.match(/^description:\s*(.+)$/m)?.[1];
      const slug = file.replace(/\.mdx$/, '').replace(/^\d+-/, '');

      return {
        slug,
        name: title ? clean(title) : slug,
        description: description ? clean(description) : '',
        filename: file,
      };
    });
}

export function getProviderCategoriesWithCounts(): (ProviderCategory & {
  count: number;
})[] {
  return providerCategories.map(category => ({
    ...category,
    count: getProviders(category.id).length,
  }));
}
