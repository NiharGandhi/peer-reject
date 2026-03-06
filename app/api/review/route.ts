import { NextRequest } from 'next/server';
import { streamK2, parseSSEStream } from '@/lib/k2client';
import { AGENT_PROMPTS, type AgentId } from '@/lib/agentConfig';

export const runtime = 'nodejs';
export const maxDuration = 180;

export async function POST(req: NextRequest) {
  const { proposalText, agents } = await req.json() as {
    proposalText: string;
    agents: AgentId[];
  };

  if (!proposalText || typeof proposalText !== 'string') {
    return new Response('Missing proposalText', { status: 400 });
  }
  if (!Array.isArray(agents) || agents.length === 0) {
    return new Response('Missing agents array', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const enqueue = (agentId: string, chunk: string) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ agentId, chunk })}\n\n`));
        } catch { /* controller closed */ }
      };

      const reviewAgent = async (id: AgentId) => {
        const systemPrompt = AGENT_PROMPTS[id];
        if (!systemPrompt) {
          enqueue(id, '[ERROR]');
          return;
        }
        try {
          const k2Stream = await streamK2([
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: `Conduct a thorough, rigorous review of the following document. Apply your specific expertise. Cite SPECIFIC text, numbers, and data from the document to support every point. Be precise and academically substantive — vague feedback is unacceptable.\n\nDOCUMENT:\n${proposalText}`,
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

      await Promise.all(agents.map(reviewAgent));
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
