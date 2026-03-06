import { NextRequest } from 'next/server';
import { streamK2, parseSSEStream } from '@/lib/k2client';
import { SYNTHESIS_PROMPT } from '@/lib/prompts';
import { buildSynthesisReviewerBlock, type AgentId } from '@/lib/agentConfig';

export const runtime = 'nodejs';
export const maxDuration = 180;

export async function POST(req: NextRequest) {
  const { proposalText, reviews, agents } = await req.json() as {
    proposalText: string;
    reviews: Record<string, string>;
    agents: AgentId[];
  };

  if (!proposalText || !reviews || !agents) {
    return new Response('Missing proposalText, reviews, or agents', { status: 400 });
  }

  const reviewerBlock = buildSynthesisReviewerBlock(agents, reviews);

  const userContent = `ORIGINAL DOCUMENT:\n${proposalText}\n\n---\n\n${reviewerBlock}\n\nPlease synthesize these reviews into the four required sections. Start immediately with ## FORMAL REJECTION LETTER — no preamble.`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const k2Stream = await streamK2([
          { role: 'system', content: SYNTHESIS_PROMPT },
          { role: 'user', content: userContent },
        ]);
        for await (const chunk of parseSSEStream(k2Stream)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`));
        }
      } catch (err) {
        console.error('[synthesize]', err);
      } finally {
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      }
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
