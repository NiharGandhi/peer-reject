import { NextRequest } from 'next/server';
import { streamK2, parseSSEStream } from '@/lib/k2client';
import { SYNTHESIS_PROMPT } from '@/lib/prompts';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const { proposalText, reviews } = await req.json();

  if (!proposalText || !reviews) {
    return new Response('Missing proposalText or reviews', { status: 400 });
  }

  const userContent = `ORIGINAL PROPOSAL:
${proposalText}

---

REVIEWER 1 — DR. SARAH CHEN (METHODOLOGY):
${reviews.chen}

---

REVIEWER 2 — JAMES HARRINGTON (BUDGET & TIMELINE):
${reviews.harrington}

---

REVIEWER 3 — PROF. AISHA AL-MANSOURI (NOVELTY & CONTRIBUTION):
${reviews.almansouri}

Please synthesize these reviews into the four required sections.`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const k2Stream = await streamK2([
          { role: 'system', content: SYNTHESIS_PROMPT },
          { role: 'user', content: userContent },
        ]);

        for await (const chunk of parseSSEStream(k2Stream)) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
          );
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
