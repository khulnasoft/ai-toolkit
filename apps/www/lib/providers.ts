import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PROVIDERS_ROOT = join(
  process.cwd(),
  '../../content/providers/01-ai-toolkit-providers',
);

export interface Provider {
  slug: string;
  name: string;
  description: string;
  filename: string;
}

function clean(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

export function getProviders(): Provider[] {
  return readdirSync(PROVIDERS_ROOT)
    .filter(file => file.endsWith('.mdx') && file !== 'index.mdx')
    .sort()
    .map(file => {
      const source = readFileSync(join(PROVIDERS_ROOT, file), 'utf8');
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
