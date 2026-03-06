'use client';

const STEPS = [
  {
    num: '01',
    title: 'Upload your proposal',
    desc: 'Drop a PDF or use our sample. No account required. We only read your text to run the review.',
  },
  {
    num: '02',
    title: 'Three reviewers attack it',
    desc: 'Methodology, budget, and novelty specialists run in parallel, streaming their reasoning in real time.',
  },
  {
    num: '03',
    title: 'Leave with a rejection pack',
    desc: 'You get a formal letter, severity-ranked weaknesses, a fix list, and a revised abstract you can reuse.',
  },
];

export default function HowItWorks() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.25em]" style={{ color: 'var(--t3)' }}>
          How it works
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        {STEPS.map((step) => (
          <div key={step.num} className="glass-panel flex gap-6 items-start p-6 rounded-[var(--radius-card)] transition-all hover:-translate-y-1">
            <div className="shrink-0 mt-1 font-mono text-xs tracking-widest font-medium" style={{ color: 'var(--gold)' }}>
              {step.num}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium tracking-wide" style={{ color: 'var(--t1)' }}>
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed max-w-sm" style={{ color: 'var(--t2)' }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
