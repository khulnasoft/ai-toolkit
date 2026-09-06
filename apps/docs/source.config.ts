import { transformerMetaHighlight } from '@shikijs/transformers';
import {
  defineGeistdocsSourceConfig,
  geistdocsFrontmatterSchema,
  geistdocsMetaSchema,
  geistShikiTheme,
} from '@vercel/geistdocs/source-config';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { defineDocs } from 'fumadocs-mdx/config';

const createDocsCollection = (dir: string) =>
  defineDocs({
    dir,
    docs: {
      schema: geistdocsFrontmatterSchema,
      postprocess: {
        includeProcessedMarkdown: true,
      },
    },
    meta: {
      schema: geistdocsMetaSchema,
    },
  });

export const docs = createDocsCollection('content/docs');
export const providers = createDocsCollection('content/providers');
export const cookbook = createDocsCollection('content/cookbook');

export default defineGeistdocsSourceConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      // Themes are overridden by defineGeistdocsSourceConfig at runtime, but
      // required at the type level when passing rehypeCodeOptions.
      themes: { light: geistShikiTheme, dark: geistShikiTheme },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        // Supports `{1,3-5}` fence meta. Content that still uses the legacy
        // `highlight="1,3-5"` attribute convention is normalized to that
        // notation by `filterMetaString` below.
        transformerMetaHighlight(),
      ],
      // Normalize the legacy `highlight="1,3-5"` fence-meta attribute to the
      // `{1,3-5}` notation `transformerMetaHighlight` understands.
      filterMetaString: meta => meta.replace(/highlight="([^"]+)"/g, '{$1}'),
      // Content uses non-standard fence languages (`env` for .env files,
      // `prompt` for plain-text LLM prompts); alias them onto bundled ones.
      langAlias: { env: 'dotenv', prompt: 'plaintext' },
    },
  },
});
