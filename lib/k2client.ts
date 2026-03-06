const K2_BASE_URL = 'https://api.k2think.ai/v1/chat/completions';
const K2_MODEL = 'MBZUAI-IFM/K2-Think-v2';

export interface K2Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function streamK2(messages: K2Message[], isAgentic: boolean = false): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.K2_API_KEY;
  if (!apiKey) throw new Error('K2_API_KEY is not set');

  const baseUrl = isAgentic ? 'https://build-api.k2think.ai/v1/chat/completions' : K2_BASE_URL;

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: K2_MODEL,
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`K2 API error ${response.status}: ${body}`);
  }

  return response.body!;
}

export async function* parseSSEStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') return;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch {
          // skip malformed SSE lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
