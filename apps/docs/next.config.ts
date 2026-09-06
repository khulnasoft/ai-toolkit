import { createGeistdocs } from '@vercel/geistdocs/next';
import type { NextConfig } from 'next';
import { exampleRedirects } from './lib/example-redirects';

const withGeistdocs = createGeistdocs();

const config: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  redirects: () => [
    {
      source: '/docs',
      destination: '/docs/introduction',
      permanent: false,
    },
    // Section landing pages whose index.mdx was folded into an Overview
    // page (see scripts/normalize-content.mjs).
    ...[
      '/docs/foundations',
      '/docs/agents',
      '/docs/ai-toolkit-core',
      '/docs/ai-toolkit-ui',
      '/docs/ai-toolkit-rsc',
    ].map(source => ({
      source,
      destination: `${source}/overview`,
      permanent: true as const,
    })),
    // Cookbook section indexes are frontmatter-only; redirect each section
    // to its first recipe.
    {
      source: '/cookbook/next',
      destination: '/cookbook/next/generate-text',
      permanent: false,
    },
    {
      source: '/cookbook/node',
      destination: '/cookbook/node/generate-text',
      permanent: false,
    },
    {
      source: '/cookbook/rsc',
      destination: '/cookbook/rsc/generate-text',
      permanent: false,
    },
    {
      source: '/cookbook/api-servers',
      destination: '/cookbook/api-servers/node-http-server',
      permanent: false,
    },
    // /examples deep URLs are still linked from docs content; they chain
    // to their cookbook replacements.
    ...exampleRedirects,
  ],
};

export default withGeistdocs(config);
