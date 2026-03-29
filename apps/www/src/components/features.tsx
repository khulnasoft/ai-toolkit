'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ai-toolkit/design-system';
import { Zap, Layers, Code, Cpu, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Unified Provider API',
    description:
      'Switch between AI providers by changing a single line of code. Support for OpenAI, Anthropic, Google, and more.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code,
    title: 'Generative UI',
    description:
      'Create dynamic, AI-powered user interfaces that amaze your users with streaming components.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: 'Framework-agnostic',
    description:
      'Build with React, Next.js, Vue, Nuxt, SvelteKit, and more. Use your favorite framework.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Zap,
    title: 'Streaming Responses',
    description:
      "Don't let your users wait for AI responses. Stream them instantly for the best UX.",
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cpu,
    title: 'Agent Support',
    description:
      'Build sophisticated AI agents with tool calling, multi-step workflows, and memory.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Type-safe',
    description:
      'Full TypeScript support with Zod schema validation for structured outputs.',
    color: 'from-indigo-500 to-violet-500',
  },
];

export function Features() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to build with AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit for building AI-powered applications with the best developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden bg-card hover:bg-accent/50 transition-colors"
            >
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="h-5 w-5 text-background" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
