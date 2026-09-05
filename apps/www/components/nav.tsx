'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/recipes', label: 'Recipes' },
  { href: '/tools', label: 'Tools Registry' },
  { href: '/templates', label: 'Templates' },
  { href: '/showcase', label: 'Showcase' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            AI TOOLKIT
          </Link>
        </div>

        <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 hover:bg-muted hover:text-foreground',
                pathname === link.href && 'bg-muted text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/khulnasoft/ai-toolkit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Github className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Link
            href="/recipes"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground',
                  pathname === link.href && 'bg-muted text-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
