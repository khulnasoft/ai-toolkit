'use client';

import Link from 'next/link';
import { Button } from '@ai-toolkit/design-system';
import { Zap, Github, Search } from 'lucide-react';

const navItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Cookbook', href: '/cookbook' },
  { label: 'Providers', href: '/providers' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Playground', href: '/playground' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-foreground text-background">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold">AI Toolkit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2 text-muted-foreground"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
              <span className="text-xs">K</span>
            </kbd>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/khulnasoft/ai-toolkit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
