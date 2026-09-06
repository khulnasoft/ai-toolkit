import { createProxy } from '@vercel/geistdocs/proxy';
import { config as geistdocsConfig } from '@/lib/geistdocs/config';
import { trackMdRequest } from '@/lib/geistdocs/md-tracking';

const proxy = createProxy({
  config: geistdocsConfig,
  trackMarkdownRequest: trackMdRequest,
  before: () => null,
  markdownRoutes: [
    { from: '/docs/*path', to: '/[lang]/llms.mdx/*path' },
    { from: '/providers/*path', to: '/[lang]/providers-llms.mdx/*path' },
    { from: '/cookbook/*path', to: '/[lang]/cookbook-llms.mdx/*path' },
  ],
});

export const config = {
  matcher: [
    '/((?!api(?:/|$)|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export default proxy;
