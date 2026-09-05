import Link from 'next/link';
import {
  ArrowUpRight,
  Boxes,
  Grid2X2,
  Library,
  Play,
  Sparkles,
  Waypoints,
  Wrench,
} from 'lucide-react';
import { HeroExample } from '@/components/hero-example';
import { CommandRow } from '@/components/command-row';
import { getAllRecipes } from '@/lib/recipes';
import { tools } from '@/lib/tools';
import { gateways } from '@/lib/gateways';
import { getAllTemplates } from '@/lib/templates';
import { showcaseItems } from '@/lib/showcase';

const stats = [
  { value: '18.3M', label: 'Weekly downloads' },
  { value: '26.3K', label: 'GitHub stars' },
  { value: '695+', label: 'Contributors' },
  { value: '100+', label: 'Models supported' },
];

const sections = [
  {
    href: '/recipes',
    icon: Library,
    eyebrow: 'Recipes',
    title: 'Build AI features faster',
    description:
      'Focused MDX recipes with runnable examples. Structured extraction, durable agents, RAG, and more.',
    meta: `${getAllRecipes().length} recipes`,
  },
  {
    href: '/tools',
    icon: Wrench,
    eyebrow: 'Tools Registry',
    title: 'Give your agent superpowers',
    description:
      'Community-built tools that add web search, extraction, code execution, and more. Install, define a schema, ship.',
    meta: `${tools.length} tools`,
  },
  {
    href: '/gateways',
    icon: Waypoints,
    eyebrow: 'AI Gateways',
    title: 'One API, every model',
    description:
      'Gateways that unify hundreds of models behind a single integration — with routing, fallbacks, caching, and observability.',
    meta: `${gateways.length} gateways`,
  },
  {
    href: '/playground',
    icon: Play,
    eyebrow: 'Playground',
    title: 'Compare models side-by-side',
    description:
      'Tune prompts across models in real time, compare cost and latency, and export production-ready AI Toolkit code.',
    meta: 'Try it on Studio',
  },
  {
    href: '/templates',
    icon: Boxes,
    eyebrow: 'Templates',
    title: 'Start from a real app',
    description:
      'Official app templates, examples, and framework integrations with the right primitives already wired up.',
    meta: `${getAllTemplates().length} templates`,
  },
  {
    href: '/showcase',
    icon: Grid2X2,
    eyebrow: 'Showcase',
    title: 'See what people are shipping',
    description:
      'Popular products and projects built with the AI SDK — proof and inspiration for your next build.',
    meta: `${showcaseItems.length} projects`,
  },
];

const featuredSlugs = [
  { category: 'guides', slug: 'rag-chatbot' },
  { category: 'node', slug: 'call-tools' },
  { category: 'next', slug: 'chat-with-pdf' },
];

export default function Home() {
  const recipes = getAllRecipes();
  const featured = featuredSlugs
    .map(({ category, slug }) =>
      recipes.find(r => r.category === category && r.slug === slug),
    )
    .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe));

  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-6">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="mr-2 size-3.5 text-primary" />
              The AI Toolkit for TypeScript &amp; JavaScript
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-.05em] sm:text-6xl">
              Universal AI layer for building frameworks and agents
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              A unified SDK for building AI apps with modern streaming,
              fallbacks, and multi-model support — powered by Vercel.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Browse recipes
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="https://studio.khulnasoft.com/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                Read the docs
              </Link>
            </div>
          </div>
          <HeroExample />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/20">
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Four sections */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">
            EXPLORE
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
            Everything you need to ship AI
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Start from a recipe, wire in a tool, or fork a template. Then see
            what the community has built.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {sections.map(section => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-card/70"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <section.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[.2em] text-primary">
                {section.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {section.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {section.description}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {section.meta}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured recipes */}
      {featured.length > 0 && (
        <section className="pb-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">
                FEATURED RECIPES
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">
                Build with AI TOOLKIT today
              </h2>
            </div>
            <Link
              href="/recipes"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground sm:flex"
            >
              View all recipes <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map(recipe => (
              <Link
                key={`${recipe.category}-${recipe.slug}`}
                href={`/recipes/${recipe.category}/${recipe.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {recipe.categoryTitle}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {recipe.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {recipe.description}
                </p>
                <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{recipe.readTime} min</span>
                  {recipe.tags.slice(0, 2).map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Install CTA */}
      <section className="mb-20 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-muted/40 to-background">
        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">
              GET STARTED
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">
              Build with AI TOOLKIT today
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Get started with the AI TOOLKIT by using our recipes or templates,
              or install the core package in seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Browse recipes <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                View templates
              </Link>
            </div>
          </div>
          <InstallCommand />
        </div>
      </section>
    </div>
  );
}

function InstallCommand() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Install
        </p>
        <CommandRow command="npm install ai" />
      </div>
    </div>
  );
}
