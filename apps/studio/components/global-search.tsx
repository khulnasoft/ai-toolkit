'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SearchItem } from '@/lib/types';

export function GlobalSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const matches = q
    ? items
        .filter(
          item =>
            item.label.toLowerCase().includes(q) ||
            (item.keywords ?? '').toLowerCase().includes(q),
        )
        .slice(0, 8)
    : [];

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={event => {
          if (event.key === 'Enter' && matches.length > 0) {
            router.push(matches[0].href);
            setOpen(false);
            setQuery('');
          }
        }}
        placeholder="Search models, gateways, tools…"
        aria-label="Search the dashboard"
        className="h-9 w-full rounded-md border border-alpha-border bg-background/60 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
      />
      {open && q && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-alpha-border bg-surface-200 shadow-xl">
          {matches.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No matches for “{query}”.
            </p>
          ) : (
            <ul>
              {matches.map(item => (
                <li key={`${item.section}-${item.label}`}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                    }}
                    className="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-surface-300"
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {item.section}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
