import { tools } from '../../../content/tools-registry/registry';

export type { Tool } from '../../../content/tools-registry/registry';
export { tools };

export interface ToolCategory {
  id: string;
  title: string;
  description: string;
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'search',
    title: 'Search',
    description: 'Give agents real-time web and domain-specific search.',
  },
  {
    id: 'extraction',
    title: 'Extraction',
    description: 'Scrape, crawl, and extract structured data from the web.',
  },
  {
    id: 'code-execution',
    title: 'Code Execution',
    description: 'Run code safely in sandboxed, isolated environments.',
  },
  {
    id: 'browser-automation',
    title: 'Browser',
    description: 'Let agents navigate pages and complete workflows.',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Guardrails, PII redaction, and prompt-injection defense.',
  },
  {
    id: 'rag',
    title: 'RAG & Data',
    description: 'Semantic search across your connected knowledge sources.',
  },
];

const categoryByTag: Record<string, string> = {
  search: 'search',
  web: 'search',
  'domain-search': 'search',
  extract: 'extraction',
  extraction: 'extraction',
  scraping: 'extraction',
  crawling: 'extraction',
  crawl: 'extraction',
  'code-execution': 'code-execution',
  sandbox: 'code-execution',
  'code-mode': 'code-execution',
  bash: 'code-execution',
  'file-system': 'code-execution',
  'browser-automation': 'browser-automation',
  browser: 'browser-automation',
  security: 'security',
  guardrails: 'security',
  pii: 'security',
  'prompt-injection': 'security',
  verification: 'security',
  rag: 'rag',
  'data-sources': 'rag',
  'semantic-search': 'rag',
  data: 'rag',
  visualization: 'rag',
  analytics: 'rag',
};

export function toolCategoryOf(tool: { tags?: string[] }): string {
  for (const tag of tool.tags ?? []) {
    const category = categoryByTag[tag];
    if (category) return category;
  }
  return 'search';
}

export function getToolsByCategory(categoryId: string) {
  return tools.filter(tool => toolCategoryOf(tool) === categoryId);
}

export function getToolCategoriesWithCounts() {
  return toolCategories.map(category => ({
    ...category,
    count: getToolsByCategory(category.id).length,
  }));
}
