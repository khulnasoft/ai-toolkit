export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const latest = Array.isArray(messages) ? messages.at(-1)?.content : '';
  const text = `Streaming preview: ${latest || 'Ask a question to compare models.'}`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
