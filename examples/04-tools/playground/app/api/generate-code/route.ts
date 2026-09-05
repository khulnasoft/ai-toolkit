export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, language = 'typescript' } = await req.json();
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return Response.json({ error: 'Prompt is required' }, { status: 400 });
  }

  return Response.json({
    code: `// Generated ${language} starter\n// Prompt: ${prompt.trim()}\n\nexport async function run() {\n  return { ok: true };\n}`,
  });
}
