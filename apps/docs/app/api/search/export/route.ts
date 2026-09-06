import { createSearchExportRoute } from '@vercel/geistdocs/routes/search-export';
import { config } from '@/lib/geistdocs/config';
import { sources } from '@/lib/geistdocs/source';

export const { GET } = createSearchExportRoute({
  config,
  sources,
});
