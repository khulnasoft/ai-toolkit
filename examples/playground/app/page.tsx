'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Zap,
  Blocks,
  Cpu,
  Sparkles,
  ArrowRight,
  Check,
  Layers,
  Webhook,
  Shield,
  Scale,
} from 'lucide-react';

const frameworks = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '⬡' },
  { name: 'Vue', icon: '💚' },
  { name: 'Svelte', icon: '🔥' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Angular', icon: '🔺' },
];

const features = [
  {
    icon: MessageSquare,
    title: 'Chat & Completions',
    description: 'Generate text, stream responses, and build conversational interfaces with ease.',
  },
  {
    icon: Sparkles,
    title: 'Structured Output',
    description: 'Use Zod or JSON Schema to get type-safe, validated responses from LLMs.',
  },
  {
    icon: Blocks,
    title: 'Tools & Function Calling',
    description: 'Define tools that let AI models take actions and call your functions.',
  },
  {
    icon: Cpu,
    title: 'Model Middleware',
    description: 'Add retry logic, caching, logging, and more with composable middleware.',
  },
  {
    icon: Layers,
    title: 'Multi-Modal',
    description: 'Generate images, transcribe speech, and embed content seamlessly.',
  },
  {
    icon: Webhook,
    title: 'Server Actions',
    description: 'Integrate with Next.js Server Actions and React Server Components.',
  },
];

const providers = [
  { name: 'OpenAI', logo: '⬡' },
  { name: 'Anthropic', logo: '🌀' },
  { name: 'Google', logo: '🔷' },
  { name: 'Azure', logo: '☁️' },
  { name: 'Amazon', logo: '📦' },
  { name: 'Mistral', logo: '🌟' },
  { name: 'Cohere', logo: '🔤' },
  { name: 'DeepSeek', logo: '🔍' },
];

export default function LandingPage() {
  const [isHoveringPlayground, setIsHoveringPlayground] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AI Toolkit</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#features">
                <Button variant="ghost" size="sm">
                  Features
                </Button>
              </Link>
              <Link href="#providers">
                <Button variant="ghost" size="sm">
                  Providers
                </Button>
              </Link>
              <Link href="#frameworks">
                <Button variant="ghost" size="sm">
                  Frameworks
                </Button>
              </Link>
              <Link href="/gateway">
                <Button variant="ghost" size="sm">
                  Gateway
                </Button>
              </Link>
              <Link href="/models">
                <Button variant="ghost" size="sm">
                  Models
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost" size="sm">
                  Docs
                </Button>
              </Link>
              <Link href="/elements">
                <Button variant="ghost" size="sm">
                  Elements
                </Button>
              </Link>
              <Link href="/playground">
                <Button variant="ghost" size="sm">
                  Playground
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-8 bg-muted/50">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span>Open-source AI toolkit for developers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            The Framework Agnostic <span className="text-primary">AI Toolkit</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Build AI-powered applications and agents with React, Next.js, Vue, Svelte, Node.js, and
            more. Unified APIs for every provider.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/playground">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onMouseEnter={() => setIsHoveringPlayground(true)}
                onMouseLeave={() => setIsHoveringPlayground(false)}
              >
                Try the Playground
                <ArrowRight
                  className={`ml-2 h-5 w-5 transition-transform ${
                    isHoveringPlayground ? 'translate-x-1' : ''
                  }`}
                />
              </Button>
            </Link>
            <Link href="https://github.com/vercel/ai">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section id="frameworks" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Works with your favorite framework
            </h2>
            <p className="text-lg text-muted-foreground">
              Use the same AI toolkit across all your projects
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {frameworks.map(framework => (
              <div
                key={framework.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl border bg-background hover:shadow-lg transition-shadow cursor-pointer"
              >
                <span className="text-4xl mb-2">{framework.icon}</span>
                <span className="font-medium">{framework.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to build AI apps
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful primitives for modern AI development
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border bg-card text-card-foreground hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section id="providers" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Support for every major provider
            </h2>
            <p className="text-lg text-muted-foreground">
              Switch between providers with a single line of code
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {providers.map(provider => (
              <div
                key={provider.name}
                className="flex items-center justify-center p-4 rounded-lg border bg-background"
              >
                <span className="text-lg font-medium">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, unified API</h2>
            <p className="text-lg text-muted-foreground">One code, works with any provider</p>
          </div>
          <div className="max-w-3xl mx-auto rounded-xl border bg-card p-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { generateText } from 'ai';
import { openai } from '@ai-toolkit/openai';
import { anthropic } from '@ai-toolkit/anthropic';

// Use with OpenAI
const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'Write a haiku about code',
});

// Switch to Anthropic - same API!
const result2 = await generateText({
  model: anthropic('claude-3-5-sonnet-20241022'),
  prompt: 'Write a haiku about code',
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start building AI apps today</h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of developers building with AI Toolkit
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/playground">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Try the Playground
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://docs.studio.khulnasoft.com">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Read the Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-medium">AI Toolkit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by{' '}
              <a href="https://vercel.com" className="underline hover:text-primary">
                Vercel
              </a>
              . Open-source under Apache-2.0 license.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
