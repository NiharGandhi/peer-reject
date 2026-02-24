'use client';

import { useLang } from '@/contexts/LanguageContext';

interface Fix {
  number: number;
  title: string;
  body: string;
}

function parseFixes(text: string): Fix[] {
  const lines = text.split('\n');
  const fixes: Fix[] = [];
  let current: Fix | null = null;

  for (const raw of lines) {
    const line = raw.trimEnd();
    const match = line.match(/^(\d+)\.\s+(.+)/);
    if (match) {
      if (current) fixes.push(current);
      const rest = match[2];
      const colonIdx = rest.indexOf(':');
      if (colonIdx !== -1) {
        current = { number: parseInt(match[1], 10), title: rest.slice(0, colonIdx).trim(), body: rest.slice(colonIdx + 1).trim() };
      } else {
        current = { number: parseInt(match[1], 10), title: rest.trim(), body: '' };
      }
    } else if (current && line.trim()) {
      current.body += (current.body ? ' ' : '') + line.trim();
    }
  }
  if (current) fixes.push(current);
  return fixes;
}

export default function FixRecommendations({ text }: { text: string }) {
  const { t } = useLang();
  const fixes = parseFixes(text);

  return (
    <section className="flex flex-col gap-3">
      {fixes.length === 0 && (
        <p className="text-sm italic" style={{ color: 'var(--t3)' }}>No fixes parsed.</p>
      )}

      {fixes.map((fix) => (
        <div
          key={fix.number}
          className="rounded-xl flex gap-4 items-start px-5 py-4"
          style={{
            background: 'var(--bg1)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--emerald)',
          }}
        >
          {/* Ordinal number */}
          <div
            className="display shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
            style={{
              background: 'rgba(40,160,112,0.15)',
              color: 'var(--emerald)',
              border: '1px solid rgba(40,160,112,0.25)',
            }}
          >
            {fix.number}
          </div>

          <div className="min-w-0 flex-1">
            {fix.title && (
              <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--emerald)' }}>
                {fix.title}
              </p>
            )}
            {fix.body && (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t2)' }}>{fix.body}</p>
            )}
            {!fix.title && !fix.body && (
              <p className="text-sm italic" style={{ color: 'var(--t3)' }}>No details provided.</p>
            )}
          </div>
        </div>
      ))}

      {fixes.length === 0 && text && (
        <div className="text-sm leading-relaxed whitespace-pre-wrap px-1" style={{ color: 'var(--t2)' }}>
          {text}
        </div>
      )}
    </section>
  );
}
