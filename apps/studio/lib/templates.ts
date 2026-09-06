import registry from '../../../examples/registry.json';
import type { TemplateEntry } from './types';

const GITHUB_ROOT = 'https://github.com/khulnasoft/ai-toolkit/tree/main';

const examples = registry as {
  examples: Array<Omit<TemplateEntry, 'githubUrl'>>;
};

export function getTemplates(): TemplateEntry[] {
  return examples.examples.map(example => ({
    ...example,
    githubUrl: `${GITHUB_ROOT}/${example.path}`,
  }));
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

export function getTemplateFrameworks(): string[] {
  return Array.from(
    new Set(getTemplates().map(template => template.framework)),
  );
}
