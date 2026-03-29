import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerLinks = {
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Cookbook', href: '/cookbook' },
    { label: 'Examples', href: '/examples' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Product: [
    { label: 'Playground', href: '/playground' },
    { label: 'Providers', href: '/providers' },
    { label: 'Showcase', href: '/showcase' },
    { label: 'Enterprise', href: '/enterprise' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'License', href: '/license' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-foreground text-background">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold">AI Toolkit</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The AI Gateway For Developers
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} AI Toolkit. Open source under Apache 2.0.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/khulnasoft/ai-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
