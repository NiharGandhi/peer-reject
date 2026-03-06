'use client';

import { useEffect, useState } from 'react';

interface Props {
  fatal: number;
  major: number;
  minor: number;
}

function calcScore(fatal: number, major: number, minor: number): number {
  return Math.max(0, 100 - fatal * 15 - major * 6 - minor * 2);
}

const LEVELS = [
  { max: 25, label: 'Not Fundable', color: 'var(--cr)' },
  { max: 45, label: 'Critically Weak', color: 'var(--cr)' },
  { max: 65, label: 'Major Revision Required', color: 'var(--t2)' },
  { max: 80, label: 'Revision Required', color: 'var(--t1)' },
  { max: 101, label: 'Fundable', color: 'var(--t1)' },
] as const;

export default function FundabilityScore({ fatal, major, minor }: Props) {
  const [animated, setAnimated] = useState(false);
  const score = calcScore(fatal, major, minor);
  const level = LEVELS.find((l) => score < l.max) ?? LEVELS[LEVELS.length - 1];

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ui-card flex flex-col gap-12 p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.25em] font-medium" style={{ color: 'var(--t3)' }}>
            Fundability Score
          </p>
          <div className="display flex items-baseline gap-4">
            <span className="text-7xl font-light tracking-tighter" style={{ color: 'var(--t1)' }}>
              {score}
            </span>
            <span className="text-xl font-light" style={{ color: 'var(--t3)' }}>
              / 100
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="display text-3xl font-medium" style={{ color: level.color }}>
            {level.label}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Soft Modern Bar */}
        <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: animated ? `${score}%` : '0%',
              background: 'var(--t1)',
            }}
          />
        </div>

        {/* Breakdown */}
        <div className="flex gap-6 sm:gap-8 text-[10px] sm:text-xs font-mono tracking-widest uppercase pt-2" style={{ color: 'var(--t3)' }}>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: 'var(--cr)' }} /> {fatal} fatal</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: 'var(--t1)' }} /> {major} major</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: 'var(--t2)' }} /> {minor} minor</span>
          <span className="ms-auto">100 − {fatal * 15 + major * 6 + minor * 2} = {score}</span>
        </div>
      </div>
    </div>
  );
}
