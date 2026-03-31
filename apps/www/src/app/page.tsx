import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Logos } from '@/components/logos';
import { Features } from '@/components/features';
import { CodeExample } from '@/components/code-example';
import { Providers } from '@/components/providers';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Logos />
        <Features />
        <CodeExample />
        <Providers />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
