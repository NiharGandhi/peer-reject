import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[30%] w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[140px]"
          style={{ backgroundColor: 'var(--t1)' }} />
        <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ backgroundColor: 'var(--cr)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-[var(--border)]">
        <Link href="/" className="flex items-baseline gap-1 select-none">
          <span className="text-lg font-normal tracking-[0.2em] uppercase" style={{ color: 'var(--t1)' }}>Peer</span>
          <span className="text-lg font-light tracking-[0.2em] uppercase" style={{ color: 'var(--t3)' }}>Reject</span>
        </Link>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">

        {/* Big 404 */}
        <div className="relative select-none">
          <span
            className="display font-bold leading-none"
            style={{
              fontSize: 'clamp(7rem, 20vw, 14rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
              letterSpacing: '-0.04em',
            }}
          >
            404
          </span>
          <span
            className="display font-bold leading-none absolute inset-0 flex items-center justify-center gradient-text"
            style={{
              fontSize: 'clamp(7rem, 20vw, 14rem)',
              letterSpacing: '-0.04em',
              opacity: 0.35,
            }}
          >
            404
          </span>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-3 max-w-sm -mt-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--t3)' }}>
            Page not found
          </p>
          <p className="text-base font-light leading-relaxed" style={{ color: 'var(--t2)' }}>
            This page doesn't exist — or it was rejected by the committee.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="premium-glow inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-widest uppercase font-bold transition-all hover:scale-105 active:scale-95"
          style={{ background: 'var(--t1)', color: 'var(--bg)', borderRadius: 'var(--radius-full)' }}
        >
          Back to Home &rarr;
        </Link>

        {/* Monospace hint */}
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--t3)' }}>
          K2 Think V2 · Peer Reject
        </p>

      </div>

    </main>
  );
}
