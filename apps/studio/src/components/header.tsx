'use client';

import { Button, Badge } from '@ai-toolkit/design-system';
import { Moon, Sun, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header({ title }: { title: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-card">
      <div className="flex items-center gap-3">
        <h2 className="font-semibold">{title}</h2>
        <Badge variant="secondary">Beta</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/khulnasoft/ai-toolkit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </header>
  );
}
