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
  { max: 25,  label: 'Not Fundable',           color: '#d03030' },
  { max: 45,  label: 'Critically Weak',         color: '#d46030' },
  { max: 65,  label: 'Major Revision Required', color: '#c49030' },
  { max: 80,  label: 'Revision Required',       color: '#b0a030' },
  { max: 101, label: 'Fundable',                color: '#30a070' },
] as const;

// SVG arc score ring
function ScoreRing({ score, color, animated }: { score: number; color: string; animated: boolean }) {
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (animated ? (score / 100) * circumference : circumference);
  return (
    <svg width="120" height="120" viewBox="0 0 100 100">
      {/* Track */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--bg3)" strokeWidth="7" />
      {/* Fill */}
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)' }}
      />
    </svg>
  );
}

export default function FundabilityScore({ fatal, major, minor }: Props) {
  const [animated, setAnimated] = useState(false);
  const score = calcScore(fatal, major, minor);
  const level = LEVELS.find((l) => score < l.max) ?? LEVELS[LEVELS.length - 1];

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
      style={{ background: 'var(--bg1)', border: '1px solid var(--border)' }}
    >
      {/* Ring + number */}
      <div className="relative shrink-0 flex items-center justify-center">
        <ScoreRing score={score} color={level.color} animated={animated} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="display font-bold tabular-nums leading-none"
            style={{ fontSize: '2rem', color: level.color }}
          >
            {score}
          </span>
          <span className="text-[10px] font-medium" style={{ color: 'var(--t3)' }}>/100</span>
        </div>
      </div>

      {/* Text side */}
      <div className="flex-1 flex flex-col gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-1" style={{ color: 'var(--t3)' }}>
            Fundability Score
          </p>
          <p
            className="display text-2xl font-bold italic"
            style={{ color: level.color }}
          >
            {level.label}
          </p>
        </div>

        {/* Bar */}
        <div>
          <div
            className="relative h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--bg3)' }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: animated ? `${score}%` : '0%',
                background: 'linear-gradient(to right, #d03030 0%, #d46030 30%, #c49030 55%, #b0a030 75%, #30a070 100%)',
              }}
            />
          </div>
        </div>

        {/* Breakdown */}
        <div
          className="flex gap-5 text-xs pt-2 flex-wrap"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--t3)' }}
        >
          <span><span className="font-bold" style={{ color: '#d03030' }}>{fatal}</span> fatal ×15</span>
          <span><span className="font-bold" style={{ color: 'var(--amber)' }}>{major}</span> major ×6</span>
          <span><span className="font-bold" style={{ color: 'var(--sky)' }}>{minor}</span> minor ×2</span>
          <span className="ms-auto font-mono">100 − {fatal * 15 + major * 6 + minor * 2} = {score}</span>
        </div>
      </div>
    </div>
  );
}
