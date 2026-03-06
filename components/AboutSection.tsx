'use client';

const STATS = [
  { value: 'K2 Think V2', label: 'Reasoning model' },
  { value: 'MBZUAI', label: 'Research institute' },
  { value: '7', label: 'Reviewer agent types' },
  { value: '< 2 min', label: 'Full review time' },
];

export default function AboutSection() {
  return (
    <section className="px-6 sm:px-12 py-24 sm:py-32 border-t border-[var(--border)] relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: about copy */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--t3)' }}>
                About
              </p>
              <h2 className="display text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--t1)' }}>
                Built for researchers.<br />
                <span className="gradient-text">Powered by K2 Think V2.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-base font-light leading-relaxed" style={{ color: 'var(--t2)' }}>
              <p>
                Peer Reject was built for the <span style={{ color: 'var(--t1)' }}>Build with K2 Think V2</span> competition by MBZUAI / IFM Research Institute — a challenge to push the boundaries of AI-powered research tools.
              </p>
              <p>
                The premise is simple: grant committees are adversarial. They look for reasons to reject, not reasons to fund. Peer Reject arms researchers with the same adversarial perspective — before submission, not after.
              </p>
              <p>
                Every review is powered by <span style={{ color: 'var(--t1)' }}>K2 Think V2</span>, a frontier reasoning model that produces deep, chain-of-thought analysis rather than surface-level commentary. You see the thinking. You get the evidence.
              </p>
            </div>

            {/* Inline quote */}
            <div className="pl-5 border-l-2 border-[var(--border)] mt-2">
              <p className="text-sm font-light italic leading-relaxed" style={{ color: 'var(--t3)' }}>
                "The deeper and more visible the K2 Think V2 reasoning, the better the outcome."
              </p>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-2 p-8"
                style={{ background: 'var(--bg1)' }}>
                <span className="display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--t1)' }}>
                  {s.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--t3)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom divider + footer line */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-1 select-none">
            <span className="text-sm font-normal tracking-[0.2em] uppercase" style={{ color: 'var(--t1)' }}>Peer</span>
            <span className="text-sm font-light tracking-[0.2em] uppercase" style={{ color: 'var(--t3)' }}>Reject</span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--t3)' }}>
            AI-generated reviews for simulation purposes only
          </p>
        </div>

      </div>
    </section>
  );
}
