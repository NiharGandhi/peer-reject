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
      // Split on | or em/en dash (– —), with optional surrounding spaces
      const sepMatch = rest.match(/\s*[|–—]\s*/);
      if (!sepMatch) return [{ severity, title: rest, explanation: '' }];
      const sepIdx = rest.indexOf(sepMatch[0]);
      const title = rest.slice(0, sepIdx).trim();
      const explanation = rest.slice(sepIdx + sepMatch[0].length).trim();
      return [{ severity, title, explanation }];
    });
}

const SEV_CONFIG = {
  fatal: { label: 'Fatal', color: '#ef4444' },
  major: { label: 'Major', color: '#f97316' },
  minor: { label: 'Minor', color: '#eab308' },
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
                <span className="text-lg font-normal tracking-wide" style={{ color: 'var(--t1)' }}>{renderInline(w.title)}</span>
                {w.explanation && (
                  <div className="text-sm font-light leading-relaxed max-w-3xl space-y-2" style={{ color: 'var(--t2)' }}>
                    {w.explanation.split(/\n+/).map((p) => p.trim()).filter(Boolean).map((para, j) => (
                      <p key={j} className="leading-[1.7]">{renderInline(para)}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
}
