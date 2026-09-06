import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { ProviderCatalogEntry } from './types';

const PROVIDERS_ROOT = join(process.cwd(), '../../content/providers');

const providerCategories: { dir: string; id: string; title: string }[] = [
  {
    dir: '01-ai-toolkit-providers',
    id: 'ai-toolkit',
    title: 'AI Toolkit providers',
  },
  {
    dir: '02-openai-compatible-providers',
    id: 'openai-compatible',
    title: 'OpenAI-compatible providers',
  },
  {
    dir: '03-community-providers',
    id: 'community',
    title: 'Community providers',
  },
  { dir: '04-adapters', id: 'adapters', title: 'Framework adapters' },
  { dir: '05-observability', id: 'observability', title: 'Observability' },
];

function clean(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function providersInCategory(
  category: (typeof providerCategories)[number],
): Omit<ProviderCatalogEntry, 'categoryTitle'>[] {
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
        category: category.id,
      };
    });
}

export function getProviders(): ProviderCatalogEntry[] {
  return providerCategories.flatMap(category =>
    providersInCategory(category).map(provider => ({
      ...provider,
      categoryTitle: category.title,
    })),
  );
}

export function getProviderCategoryTitles(): { id: string; title: string }[] {
  return providerCategories.map(({ id, title }) => ({ id, title }));
}
