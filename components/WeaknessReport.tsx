'use client';

import { useLang } from '@/contexts/LanguageContext';

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
  fatal: {
    label: 'Fatal',
    accent: 'var(--cr)',
    accentLo: 'var(--cr-lo)',
    accentBorder: 'rgba(192,48,48,0.25)',
    textColor: 'var(--cr-hi)',
  },
  major: {
    label: 'Major',
    accent: 'var(--amber)',
    accentLo: 'var(--gold-lo)',
    accentBorder: 'rgba(192,128,48,0.25)',
    textColor: 'var(--gold)',
  },
  minor: {
    label: 'Minor',
    accent: 'var(--sky)',
    accentLo: 'var(--sky-lo)',
    accentBorder: 'rgba(56,130,200,0.20)',
    textColor: 'var(--sky)',
  },
};

export default function WeaknessReport({ text }: { text: string }) {
  const { t } = useLang();
  const weaknesses = parseWeaknesses(text);

  const counts = {
    fatal: weaknesses.filter((w) => w.severity === 'fatal').length,
    major: weaknesses.filter((w) => w.severity === 'major').length,
    minor: weaknesses.filter((w) => w.severity === 'minor').length,
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Header + badges */}
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="display text-base font-semibold" style={{ color: 'var(--t1)' }}>
          {t('results.weaknesses')}
        </h2>
        <div className="flex items-center gap-2 ms-auto flex-wrap">
          {counts.fatal > 0 && (
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--cr-lo)', color: 'var(--cr-hi)', border: '1px solid rgba(192,48,48,0.25)' }}
            >
              {counts.fatal} {t('results.fatal')}
            </span>
          )}
          {counts.major > 0 && (
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--gold-lo)', color: 'var(--gold)', border: '1px solid rgba(184,149,64,0.25)' }}
            >
              {counts.major} {t('results.major')}
            </span>
          )}
          {counts.minor > 0 && (
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--sky-lo)', color: 'var(--sky)', border: '1px solid rgba(56,130,200,0.25)' }}
            >
              {counts.minor} {t('results.minor')}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {weaknesses.length === 0 && (
          <p className="text-sm italic" style={{ color: 'var(--t3)' }}>No weaknesses parsed.</p>
        )}
        {weaknesses.map((w, i) => {
          const cfg = SEV_CONFIG[w.severity];
          return (
            <div
              key={i}
              className="rounded-xl px-4 py-3 flex gap-3 items-start"
              style={{
                background: cfg.accentLo,
                border: `1px solid ${cfg.accentBorder}`,
                borderLeft: `3px solid ${cfg.accent}`,
              }}
            >
              <span
                className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mt-0.5"
                style={{
                  background: cfg.accent + '20',
                  color: cfg.textColor,
                  border: `1px solid ${cfg.accent}35`,
                }}
              >
                {cfg.label}
              </span>
              <div className="text-sm min-w-0">
                <span className="font-semibold" style={{ color: 'var(--t1)' }}>{w.title}</span>
                {w.explanation && (
                  <span className="leading-relaxed" style={{ color: 'var(--t2)' }}> — {w.explanation}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
