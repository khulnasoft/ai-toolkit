import type { NextRequest } from 'next/server';
import { createAgentsRoute } from '@vercel/geistdocs/routes/agents';
import { config } from '@/lib/geistdocs/config';

const route = createAgentsRoute({
  config,
});

// Wrapped so the exports satisfy Next's strict route-type validators
// (the factory types its context argument as optional).
export const GET = (
  request: NextRequest,
  context: RouteContext<'/[lang]/agents.md'>,
) => route.GET(request, context);

export const generateStaticParams = route.generateStaticParams;
