'use client';

const STEPS = [
  {
    num: '01',
    title: 'Upload your proposal',
    desc: 'Drop a PDF or use our sample. No account required. Text is extracted and sent to the review panel.',
    accent: 'var(--sky)',
    accentLo: 'var(--sky-lo)',
  },
  {
    num: '02',
    title: 'Three reviewers work in parallel',
    desc: 'Dr. Chen (Methodology), Harrington (Budget), and Al-Mansouri (Novelty) critique every weakness simultaneously via K2 Think V2.',
    accent: 'var(--violet)',
    accentLo: 'rgba(124,92,191,0.10)',
  },
  {
    num: '03',
    title: 'Receive your rejection package',
    desc: 'A formal letter, severity-ranked weaknesses, numbered fixes, and a revised abstract — in under 2 minutes.',
    accent: 'var(--emerald)',
    accentLo: 'rgba(40,160,112,0.10)',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-xl mx-auto flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--t3)', fontFamily: 'var(--font-display)' }}
        >
          How it works
        </p>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>

      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="rounded-xl flex gap-4 items-start px-5 py-4 transition-all"
            style={{
              background: step.accentLo,
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${step.accent}`,
            }}
          >
            <span
              className="shrink-0 text-3xl font-bold leading-none mt-0.5 select-none"
              style={{ fontFamily: 'var(--font-display)', color: step.accent, opacity: 0.5 }}
            >
              {step.num}
            </span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--t1)' }}>{step.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--t2)' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
