import { NextRequest } from 'next/server';
import { streamK2, parseSSEStream } from '@/lib/k2client';
import { CHEN_PROMPT, HARRINGTON_PROMPT, ALMANSOURI_PROMPT } from '@/lib/prompts';

export const runtime = 'nodejs';
export const maxDuration = 120;

type PersonaId = 'chen' | 'harrington' | 'almansouri';

interface PersonaConfig {
  id: PersonaId;
  systemPrompt: string;
}

const PERSONAS: PersonaConfig[] = [
  { id: 'chen', systemPrompt: CHEN_PROMPT },
  { id: 'harrington', systemPrompt: HARRINGTON_PROMPT },
  { id: 'almansouri', systemPrompt: ALMANSOURI_PROMPT },
];

export async function POST(req: NextRequest) {
  const { proposalText } = await req.json();

  if (!proposalText || typeof proposalText !== 'string') {
    return new Response('Missing proposalText', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const enqueue = (persona: PersonaId, chunk: string) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ persona, chunk })}\n\n`)
          );
        } catch {
          // controller already closed
        }
      };

      const streamPersona = async ({ id, systemPrompt }: PersonaConfig) => {
        try {
          const k2Stream = await streamK2([
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: `Please review this grant proposal:\n\n${proposalText}`,
            },
          ]);

          for await (const chunk of parseSSEStream(k2Stream)) {
            enqueue(id, chunk);
          }
          enqueue(id, '[DONE]');
        } catch (err) {
          console.error(`[review/${id}]`, err);
          enqueue(id, '[ERROR]');
        }
      };

      // Fire all 3 persona reviews simultaneously
      await Promise.all(PERSONAS.map(streamPersona));

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
