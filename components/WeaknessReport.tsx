'use client';

import { renderInline } from '@/lib/renderInline';

type Severity = 'fatal' | 'major' | 'minor';

interface Weakness {
  severity: Severity;
  title: string;
  explanation: string;
}

const TAG_MAP: Record<string, Severity> = {
  '[FATAL]': 'fatal',
  '[MAJOR]': 'major',
  '[MINOR]': 'minor',
};

function parseWeaknesses(text: string): Weakness[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .flatMap((line): Weakness[] => {
      const tag = Object.keys(TAG_MAP).find((t) => line.startsWith(t));
      if (!tag) return [];
      const severity = TAG_MAP[tag];
      const rest = line.slice(tag.length).trim();
      const pipeIdx = rest.indexOf('|');
      if (pipeIdx === -1) return [{ severity, title: rest, explanation: '' }];
      return [{ severity, title: rest.slice(0, pipeIdx).trim(), explanation: rest.slice(pipeIdx + 1).trim() }];
    });
}

const SEV_CONFIG = {
  fatal: { label: 'Fatal', color: 'var(--cr)' },
  major: { label: 'Major', color: 'var(--t1)' },
  minor: { label: 'Minor', color: 'var(--t3)' },
};

export default function WeaknessReport({ text }: { text: string }) {
  const weaknesses = parseWeaknesses(text);

  return (
    <section className="flex flex-col gap-4">
        {weaknesses.length === 0 && (
          <p className="text-sm font-light italic py-6" style={{ color: 'var(--t3)' }}>No weaknesses parsed.</p>
        )}
        {weaknesses.map((w, i) => {
          const cfg = SEV_CONFIG[w.severity];
          return (
            <div key={i} className="ui-card p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <span className="shrink-0 px-3 py-1 rounded-[var(--radius-full)] text-[10px] font-mono uppercase tracking-widest font-medium" style={{ color: cfg.color, border: `1px solid ${cfg.color}33`, backgroundColor: `${cfg.color}11` }}>
                {cfg.label}
              </span>
              <div className="flex-1 flex flex-col gap-3">
                <span className="text-lg font-normal tracking-wide" style={{ color: 'var(--t1)' }}>{w.title}</span>
                {w.explanation && (
                  <span className="text-sm font-light leading-relaxed max-w-3xl" style={{ color: 'var(--t2)' }}>{renderInline(w.explanation)}</span>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
}
