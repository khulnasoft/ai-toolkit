import { MobileDocsBar } from '@vercel/geistdocs/mobile-docs-bar';
import { createDocsPage } from '@vercel/geistdocs/pages/docs';
import { getMDXComponents } from '@/components/geistdocs/mdx-components';
import { config } from '@/lib/geistdocs/config';
import { cookbookSource } from '@/lib/geistdocs/source';

const cookbookPage = createDocsPage({
  config,
  mdx: ({ link }) => getMDXComponents({ a: link }),
  openGraph: {
    images: true,
  },
  source: cookbookSource,
  tableOfContentPopover: {
    enabled: false,
  },
  renderTop: ({ data }) => <MobileDocsBar toc={data.toc} />,
});

export default cookbookPage.Page;
export const generateStaticParams = cookbookPage.generateStaticParams;
export const generateMetadata = cookbookPage.generateMetadata;
