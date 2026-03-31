'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, Button } from '@ai-toolkit/design-system';
import {
  MessageSquare,
  Zap,
  Settings,
  FileCode,
  Cpu,
  BookOpen,
} from 'lucide-react';

const navItems = [
  {
    title: 'Playground',
    href: '/',
    icon: Zap,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Agents',
    href: '/agents',
    icon: Cpu,
  },
  {
    title: 'Templates',
    href: '/templates',
    icon: FileCode,
  },
  {
    title: 'Documentation',
    href: '/docs',
    icon: BookOpen,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 border-r bg-card h-screen">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <h1 className="font-semibold text-sm">AI Toolkit</h1>
          <p className="text-xs text-muted-foreground">Studio</p>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  isActive && 'bg-secondary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}
