'use client';

const PILLARS = [
  {
    num: '01',
    heading: 'See through their eyes.',
    body: 'Our agents are calibrated to think like real committee members — a methodology auditor who questions every design choice, a budget examiner who flags every rounded number, a domain expert who knows what you missed in the literature.',
  },
  {
    num: '02',
    heading: 'Evidence, not opinions.',
    body: 'Every issue is cited with specific text, numbers, and claims from your proposal. No "needs improvement" — only "Section 3, line 4: sample size of N=12 is underpowered for the claimed effect size of d=0.5."',
  },
  {
    num: '03',
    heading: 'Fix it before it costs you.',
    body: 'A rejected grant isn\'t just a setback — it\'s months of work, a missed funding cycle, and a dent in your track record. Know the fatal flaws before the committee does.',
  },
];

export default function WhySection() {
  return (
    <section className="px-6 sm:px-12 py-24 sm:py-32 border-t border-[var(--border)] relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: label + heading */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--t3)' }}>
              Why Peer Reject
            </p>
            <h2 className="display text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--t1)' }}>
              The committee is not on your side.<br />
              <span className="gradient-text">We are.</span>
            </h2>
            <p className="text-base font-light leading-relaxed max-w-sm" style={{ color: 'var(--t2)' }}>
              Peer review is adversarial by design. Peer Reject simulates that adversity so you can prepare for it — not be surprised by it.
            </p>
          </div>

          {/* Right: pillars */}
          <div className="flex flex-col gap-0">
            {PILLARS.map((p, i) => (
              <div key={p.num}
                className="flex gap-8 py-10"
                style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <span className="font-mono text-[11px] tracking-widest shrink-0 mt-1" style={{ color: 'var(--t3)' }}>
                  {p.num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="display text-lg sm:text-xl font-semibold" style={{ color: 'var(--t1)' }}>
                    {p.heading}
                  </h3>
                  <p className="text-sm sm:text-base font-light leading-relaxed" style={{ color: 'var(--t2)' }}>
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
