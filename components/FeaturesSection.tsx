'use client';

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="2" /><circle cx="17" cy="7" r="2" />
        <path d="M5 21v-2a4 4 0 014-4h2m4 6v-2a4 4 0 00-4-4h-2" />
        <path d="M21 21v-2a4 4 0 00-3-3.87" />
      </svg>
    ),
    title: 'Parallel Review Panel',
    desc: 'Three to seven specialized AI agents analyze your work simultaneously — methodology, budget, novelty, and more — from independent angles.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    title: 'Live Streaming',
    desc: 'Watch each agent\'s reasoning stream token by token in real-time. No waiting — the review happens visibly, in front of you.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="18" x2="4" y2="14" /><line x1="10" y1="18" x2="10" y2="10" /><line x1="16" y1="18" x2="16" y2="6" />
        <line x1="22" y1="18" x2="22" y2="2" />
      </svg>
    ),
    title: 'Severity-Ranked Issues',
    desc: 'Every weakness classified as Fatal, Major, or Minor with evidence cited directly from your text. No vague feedback.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Actionable Fixes',
    desc: 'For every fatal and major issue, you get a numbered, specific fix. Exactly what to add, change, or remove — and where.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Document-Aware',
    desc: 'Automatically detects whether you\'ve uploaded a grant proposal, journal paper, clinical trial, thesis, or survey — and assembles the right panel.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: 'Revised Abstract',
    desc: 'Receive a fully rewritten abstract that addresses every major concern — specific, grounded, and ready to use as a revision template.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 sm:px-12 py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--teal)' }}>
            Capabilities
          </p>
          <h2 className="display text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'var(--t1)' }}>
            Everything a real panel would do.<br />
            <span style={{ color: 'var(--teal)' }}>Delivered in two minutes.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'var(--border)' }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-5 p-8 transition-all duration-300"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(var(--teal-rgb), 0.08) 0%, transparent 70%), var(--bg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(var(--teal-rgb), 0.12) 0%, transparent 70%), var(--bg1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(var(--teal-rgb), 0.08) 0%, transparent 70%), var(--bg)';
              }}
            >
              <div style={{ color: 'var(--t2)' }}>{f.icon}</div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium tracking-wide" style={{ color: 'var(--t1)' }}>{f.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--t3)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
