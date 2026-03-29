'use client';

import { Button, Badge } from '@ai-toolkit/design-system';
import { Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm i ai');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="px-3 py-1">
            AI Toolkit 7.0 is now available
            <ArrowRight className="h-3 w-3 ml-1" />
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-balance">
            The AI Toolkit for TypeScript
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed">
            From the creators of Next.js, the AI Toolkit is a free open-source library that
            gives you the tools you need to build AI-powered products.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-11 px-8">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 h-11 px-4 rounded-md border bg-muted/50 hover:bg-muted transition-colors font-mono text-sm"
            >
              <span className="text-muted-foreground">$</span>
              <span>npm i ai</span>
              <Copy className="h-4 w-4 text-muted-foreground" />
            </button>

            <Button variant="outline" size="lg" className="h-11 px-8" asChild>
              <a href="/playground">Visit Playground</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
