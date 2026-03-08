'use client';

import { renderInline } from '@/lib/renderInline';

interface Fix {
  number: number;
  title: string;
  body: string;
}

/** Split "**Title** – body" or "Title: body" or "Title – body" into title + body */
function splitTitleBody(rest: string): { title: string; body: string } {
  // Bold title + em-dash:  **Title** – body
  // Bold title + colon:    **Title**: body
  // Bold title + space:    **Title** body
  const boldMatch = rest.match(/^\*\*([^*]+)\*\*\s*[–—:-]?\s*([\s\S]*)/);
  if (boldMatch) {
    return { title: boldMatch[1].trim(), body: boldMatch[2].trim() };
  }
  // Em-dash separator (not bold): Title – body
  const emDashIdx = rest.search(/\s[–—]\s/);
  if (emDashIdx !== -1) {
    return {
      title: rest.slice(0, emDashIdx).trim(),
      body: rest.slice(emDashIdx).replace(/^\s*[–—]\s*/, '').trim(),
    };
  }
  // Colon separator near the start: Title: body
  const colonIdx = rest.indexOf(':');
  if (colonIdx !== -1 && colonIdx < 100) {
    return { title: rest.slice(0, colonIdx).trim(), body: rest.slice(colonIdx + 1).trim() };
  }
  return { title: '', body: rest };
}

function parseFixes(text: string): Fix[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const fixes: Fix[] = [];
  let current: Fix | null = null;
  let pendingNum: number | null = null;

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Line that is just a number (e.g. "02" or "2."):  store for the next content line
    const soloNumMatch = trimmed.match(/^(\d+)\.?$/);
    if (soloNumMatch) {
      pendingNum = parseInt(soloNumMatch[1], 10);
      continue;
    }

    // Numbered fix: "1. **Title** – body" or "1. Title: body"
    const numDotMatch = trimmed.match(/^(\d+)[.)]\s+([\s\S]+)/);
    if (numDotMatch) {
      if (current) fixes.push(current);
      const { title, body } = splitTitleBody(numDotMatch[2].trim());
      current = { number: parseInt(numDotMatch[1], 10), title, body };
      pendingNum = null;
      continue;
    }

    // Bold title on its own line (possibly after a solo-number line)
    const boldLineMatch = trimmed.match(/^\*\*([^*]+)\*\*\s*[–—:-]?\s*(.*)/);
    if (boldLineMatch) {
      if (current) fixes.push(current);
      current = {
        number: pendingNum ?? (fixes.length + 1),
        title: boldLineMatch[1].trim(),
        body: boldLineMatch[2].trim(),
      };
      pendingNum = null;
      continue;
    }

    // Continuation of current fix body
    if (current) {
      current.body += (current.body ? ' ' : '') + trimmed;
    }
    pendingNum = null;
  }

  if (current) fixes.push(current);
  return fixes;
}

export default function FixRecommendations({ text }: { text: string }) {
  const fixes = parseFixes(text);

  if (fixes.length === 0) {
    return (
      <p className="text-sm font-light italic py-6" style={{ color: 'var(--t3)' }}>
        No fixes parsed.
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {fixes.map((fix) => (
        <div key={fix.number} className="ui-card flex gap-6 items-start p-6 sm:p-8">
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-mono text-xs tracking-widest mt-0.5 font-medium"
            style={{ background: 'rgba(var(--teal-rgb), 0.12)', color: 'var(--teal)', border: '1px solid rgba(var(--teal-rgb), 0.3)' }}>
            {fix.number.toString().padStart(2, '0')}
          </div>
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {fix.title && (
              <p className="text-base font-medium leading-snug" style={{ color: 'var(--t1)' }}>
                {renderInline(fix.title)}
              </p>
            )}
            {fix.body && (
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--t2)' }}>
                {renderInline(fix.body)}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
