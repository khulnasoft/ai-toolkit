import { DocsLayout } from '@/components/geistdocs/docs-layout';
import { getRootLang } from '@/lib/geistdocs/root-params';
import { providersSource } from '@/lib/geistdocs/source';

const Layout = async ({ children }: LayoutProps<'/[lang]/providers'>) => {
  const lang = await getRootLang();

  return (
    <div className="bg-background-200">
      <DocsLayout tree={providersSource.source.pageTree[lang]}>
        {children}
      </DocsLayout>
    </div>
  );
};

export default Layout;
