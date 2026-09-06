import Link from 'next/link';
import { ArrowUpRight, Boxes, Grid2X2, Library, Wrench } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { resources, type ResourceKind } from '@/lib/resources';

const kindIcons: Record<ResourceKind, typeof Library> = {
  recipes: Library,
  tools: Wrench,
  templates: Boxes,
  showcase: Grid2X2,
};

export const metadata = {
  title: 'Resources',
};

export default function ResourcesPage() {
  const groups = resources.getKinds();
  const total = resources.all.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <SectionHeader
        eyebrow="RESOURCES"
        title="Everything you need to ship AI."
        description={`Recipes to build with, tools to wire in, templates to fork, and inspiration from the community — ${total} curated resources.`}
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {groups.map(group => {
          const Icon = kindIcons[group.kind];
          return (
            <Link
              key={group.kind}
              href={group.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[.2em] text-primary">
                {group.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {group.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                {group.description}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {group.entries.length} items
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
