import { generateText } from 'ai';
import { getProviderModel } from '@/lib/providers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    prompt,
    providerId,
    modelId,
    language = 'typescript',
  } = await req.json();

  try {
    const model = getProviderModel(providerId, modelId);

    const systemPrompt = `You are an expert programmer. Generate clean, well-commented code in ${language}. 
    Follow best practices and include error handling where appropriate. 
    Only return the code without explanations unless specifically requested.`;

    const result = await generateText({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      maxTokens: 2000,
    });

    return Response.json({ code: result.text });
  } catch (error) {
    console.error('Code generation API error:', error);
    return Response.json({ error: 'Failed to generate code' }, { status: 500 });
  }
}
