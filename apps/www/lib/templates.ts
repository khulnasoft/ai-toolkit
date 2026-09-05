import registry from '../../../examples/registry.json';

export interface Template {
  name: string;
  title: string;
  category: string;
  categoryOrder: number;
  framework: string;
  primaryProvider: string | null;
  description: string;
  tags: string[];
  path: string;
  githubUrl: string;
}

export interface TemplateCategory {
  id: string;
  order: number;
  title: string;
  description: string;
  templates: Template[];
}

const GITHUB_ROOT = 'https://github.com/khulnasoft/ai-toolkit/tree/main';

const examples = registry as {
  categories: {
    id: string;
    order: number;
    title: string;
    description: string;
  }[];
  examples: Array<Omit<Template, 'githubUrl'>>;
};

export function getTemplateCategories(): TemplateCategory[] {
  return examples.categories
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(category => ({
      id: category.id,
      order: category.order,
      title: category.title,
      description: category.description,
      templates: examples.examples
        .filter(example => example.category === category.id)
        .map(example => ({
          ...example,
          githubUrl: `${GITHUB_ROOT}/${example.path}`,
        })),
    }));
}

export function getAllTemplates(): Template[] {
  return getTemplateCategories().flatMap(category => category.templates);
}

export const frameworkLabels: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  vue: 'Vue',
  nuxt: 'Nuxt',
  angular: 'Angular',
  svelte: 'Svelte',
  nest: 'NestJS',
  express: 'Express',
  fastify: 'Fastify',
  hono: 'Hono',
  node: 'Node.js',
  'multi-provider': 'Multi-provider',
  'nextjs-full-stack': 'Next.js',
};
