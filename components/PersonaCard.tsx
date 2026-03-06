'use client';

import { useLang } from '@/contexts/LanguageContext';

interface PersonaCardProps {
  nameKey: 'personas.chen' | 'personas.harrington' | 'personas.almansouri';
  roleKey: 'personas.chen.role' | 'personas.harrington.role' | 'personas.almansouri.role';
  icon: React.ReactNode;
  text: string;
  isDone: boolean;
}

// Find where the actual structured review starts (after the thinking trace).
// K2 Think V2 echoes prompt headers in its reasoning; use lastIndexOf to skip them.
function splitThinkingFromReview(text: string): { thinking: string; review: string } {
  const REVIEW_HEADER = /(?:METHODOLOGY REVIEW|BUDGET & FEASIBILITY REVIEW|DOMAIN & IMPACT REVIEW)\s*[—:]/gi;
  const matches = [...text.matchAll(REVIEW_HEADER)];

  if (matches.length === 0) {
    return { thinking: text, review: '' };
  }

  const lastMatch = matches[matches.length - 1];
  const splitIdx = lastMatch.index!;
  return {
    thinking: text.slice(0, splitIdx).trim(),
    review: text.slice(splitIdx).trim(),
  };
}

function ReviewText({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();

    if (!trimmed) continue;

    // Primary title: "METHODOLOGY REVIEW — Dr. Sarah Chen"
    if (/^(?:METHODOLOGY|BUDGET|DOMAIN)[^\n]*(?:REVIEW|ASSESSMENT)\s*[—:]/.test(trimmed)) {
      elements.push(
        <div key={i} className="mb-6">
          <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--t1)' }}>{trimmed}</p>
        </div>
      );
      continue;
    }

    // Score lines: "METHODOLOGY SCORE: 4/10"
    if (/^[A-Z][A-Z\s&]+SCORE:\s*\d+\/10/.test(trimmed)) {
      const colonIdx = trimmed.indexOf(':');
      const label = trimmed.slice(0, colonIdx).trim();
      const score = trimmed.slice(colonIdx + 1).trim();
      elements.push(
        <div key={i} className="flex items-center gap-3 py-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'var(--t3)' }}>{label}</span>
          <span className="font-mono text-base font-medium" style={{ color: 'var(--t1)' }}>{score}</span>
        </div>
      );
      continue;
    }

    // Section headers: "STRENGTHS:", "CRITICAL ISSUES:", "BUDGET CONCERNS:", etc.
    if (/^[A-Z][A-Z\s&]+:$/.test(trimmed)) {
      elements.push(
        <p key={i} className="text-[10px] uppercase tracking-[0.2em] font-bold mt-5 mb-2" style={{ color: 'var(--t3)' }}>
          {trimmed.replace(/:$/, '')}
        </p>
      );
      continue;
    }

    // Numbered critical issue title: "[1] Issue Title"
    if (/^\[\d+\]\s/.test(trimmed)) {
      elements.push(
        <p key={i} className="text-sm font-semibold mt-3 mb-1" style={{ color: 'var(--t1)' }}>{trimmed}</p>
      );
      continue;
    }

    // Bullet item: "- text" or "• text"
    if (/^[-•]\s/.test(trimmed)) {
      elements.push(
        <p key={i} className="text-sm font-light leading-relaxed pl-3 border-l border-[var(--border)]" style={{ color: 'var(--t2)' }}>
          {trimmed.slice(2).trim()}
        </p>
      );
      continue;
    }

    // Regular text / explanation paragraph
    elements.push(
      <p key={i} className="text-sm font-light leading-relaxed" style={{ color: 'var(--t2)' }}>
        {trimmed}
      </p>
    );
  }

  return <div className="flex flex-col gap-1.5">{elements}</div>;
}

export default function PersonaCard({ nameKey, roleKey, icon, text, isDone }: PersonaCardProps) {
  const { t } = useLang();
  const { thinking, review } = splitThinkingFromReview(text);
  const hasReview = review.length > 0;
  const isThinking = !hasReview && !isDone;

  return (
    <div className="ui-card flex flex-col gap-0 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--border)]">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-base"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--t1)' }}>
            {t(nameKey)}
          </p>
          <p className="text-[10px] uppercase tracking-widest font-light mt-0.5" style={{ color: 'var(--t3)' }}>
            {t(roleKey)}
          </p>
        </div>
        <div className="shrink-0">
          {isDone ? (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full"
              style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
              Done
            </span>
          ) : isThinking ? (
            <span className="text-[10px] uppercase font-medium tracking-wider" style={{ color: 'var(--t3)' }}>
              Thinking...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[10px] uppercase font-medium tracking-wider" style={{ color: 'var(--gold)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
              Writing
            </span>
          )}
        </div>
      </div>

      {/* Thinking trace — collapsible */}
      {thinking && (
        <details className="group border-b border-[var(--border)]">
          <summary className="px-6 py-3 text-[10px] uppercase font-medium tracking-widest cursor-pointer select-none list-none flex items-center justify-between transition-colors hover:bg-[var(--bg2)]"
            style={{ color: 'var(--t3)' }}>
            <span>Reasoning Trace ({thinking.split(/\s+/).filter(Boolean).length} words)</span>
            <span className="text-[var(--border)] group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="px-6 py-4 text-[11px] font-mono leading-relaxed whitespace-pre-wrap border-t border-[var(--border)]"
            style={{ color: 'var(--t3)', background: 'var(--bg)' }}>
            {thinking}
          </div>
        </details>
      )}

      {/* Review content */}
      <div className="px-6 py-6 flex flex-col gap-2">
        {hasReview ? (
          <>
            <ReviewText text={review} />
            {!isDone && (
              <span className="inline-block mt-2 animate-pulse w-2 h-4 rounded-sm" style={{ background: 'var(--t1)', opacity: 0.5 }} />
            )}
          </>
        ) : isDone ? (
          // Edge case: done but no review header detected — show raw text
          <ReviewText text={text} />
        ) : (
          <div className="flex flex-col gap-3 py-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full animate-ping" style={{ background: 'var(--t1)', opacity: 0.3 }} />
              <span className="text-xs font-light" style={{ color: 'var(--t3)' }}>
                {text ? 'Processing reasoning trace...' : 'Waiting to connect...'}
              </span>
            </div>
            {text && (
              <p className="text-[11px] font-mono leading-relaxed line-clamp-3" style={{ color: 'var(--t3)' }}>
                {text.slice(-200)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
