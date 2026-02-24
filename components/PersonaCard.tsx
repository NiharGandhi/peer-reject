'use client';

import { useLang } from '@/contexts/LanguageContext';

interface PersonaCardProps {
  nameKey: 'personas.chen' | 'personas.harrington' | 'personas.almansouri';
  roleKey: 'personas.chen.role' | 'personas.harrington.role' | 'personas.almansouri.role';
  emoji: string;
  borderColor: string;
  accentColor: string;
  bgColor: string;
  text: string;
  isDone: boolean;
}

function splitThinkingFromReview(text: string): { thinking: string; review: string } {
  const lines = text.split('\n');
  const firstStructured = lines.findIndex((l) => /^\[\d+\]/.test(l.trim()));
  if (firstStructured === -1) return { thinking: text, review: '' };
  return {
    thinking: lines.slice(0, firstStructured).join('\n').trim(),
    review: lines.slice(firstStructured).join('\n').trim(),
  };
}

function ReviewText({ text, accent }: { text: string; accent: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        if (/^\[\d+\]/.test(line.trim())) {
          return (
            <p key={i} className="text-xs font-bold mt-3 mb-0.5 leading-snug" style={{ color: accent }}>
              {line}
            </p>
          );
        }
        if (/^(VERDICT|ASSESSMENT):/.test(line.trim())) {
          return (
            <p
              key={i}
              className="text-xs font-semibold mt-3 pt-2"
              style={{ color: 'var(--t1)', borderTop: '1px solid var(--border-hi)' }}
            >
              {line}
            </p>
          );
        }
        if (!line.trim()) return <div key={i} className="h-1.5" />;
        return (
          <p key={i} className="text-xs leading-relaxed" style={{ color: 'var(--t2)' }}>
            {line}
          </p>
        );
      })}
    </>
  );
}

export default function PersonaCard({
  nameKey, roleKey, emoji, borderColor, accentColor, bgColor, text, isDone,
}: PersonaCardProps) {
  const { t } = useLang();
  const { thinking, review } = splitThinkingFromReview(text);
  const hasReview = review.length > 0;

  // Extract the CSS var color name from accentColor Tailwind class (e.g. text-violet-300)
  // We'll use inline CSS vars instead for the new design
  const accentMap: Record<string, string> = {
    'text-violet-300': 'var(--violet)',
    'text-amber-300':  'var(--amber)',
    'text-sky-300':    'var(--sky)',
  };
  const accent = accentMap[accentColor] ?? 'var(--t1)';

  return (
    <div
      className="rounded-xl flex flex-col min-h-[360px] overflow-hidden"
      style={{
        background: 'var(--bg1)',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${accent}`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="display w-9 h-9 rounded-full flex items-center justify-center text-base font-bold shrink-0"
          style={{ background: accent + '20', color: accent, border: `1px solid ${accent}35` }}
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate" style={{ color: 'var(--t1)' }}>{t(nameKey)}</p>
          <p className="text-[11px]" style={{ color: 'var(--t3)' }}>{t(roleKey)}</p>
        </div>

        {/* Status pill */}
        <div
          className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
          style={
            isDone
              ? { background: 'rgba(40,160,112,0.15)', color: 'var(--emerald)', border: '1px solid rgba(40,160,112,0.25)' }
              : hasReview
              ? { background: accent + '18', color: accent, border: `1px solid ${accent}30` }
              : { background: 'var(--bg3)', color: 'var(--t3)', border: '1px solid var(--border)' }
          }
        >
          {isDone ? '✓ Done' : hasReview ? 'Writing' : 'Thinking'}
        </div>
      </div>

      {/* Thinking trace — collapsed */}
      {thinking && (
        <div className="px-4 pt-3 pb-0 shrink-0">
          <details className="group">
            <summary
              className="cursor-pointer flex items-center gap-1.5 text-[11px] select-none list-none"
              style={{ color: 'var(--t3)' }}
            >
              <span className="group-open:rotate-90 transition-transform inline-block" style={{ color: 'var(--t3)' }}>›</span>
              Reasoning trace
              <span>({thinking.split(/\s+/).length} words)</span>
            </summary>
            <div
              className="mt-2 max-h-28 overflow-y-auto text-[11px] font-mono leading-relaxed whitespace-pre-wrap pl-3"
              style={{
                color: 'var(--t3)',
                borderLeft: '2px solid var(--border-hi)',
              }}
            >
              {thinking}
            </div>
          </details>
        </div>
      )}

      {thinking && hasReview && (
        <div className="mx-4 mt-3" style={{ height: 1, background: 'var(--border)' }} />
      )}

      {/* Review content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col">
        {hasReview ? (
          <ReviewText text={review} accent={accent} />
        ) : !isDone && !thinking ? (
          <span className="text-xs italic" style={{ color: 'var(--t3)' }}>Waiting for reviewer…</span>
        ) : !hasReview && isDone ? (
          <ReviewText text={text} accent={accent} />
        ) : null}

        {!isDone && (hasReview || !thinking) && (
          <span
            className="inline-block mt-1.5 animate-pulse"
            style={{ width: 6, height: 11, background: accent, opacity: 0.7 }}
          />
        )}
      </div>
    </div>
  );
}
