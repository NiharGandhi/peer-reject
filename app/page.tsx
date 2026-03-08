'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadZone, { UploadZoneHandle } from '@/components/UploadZone';
import ThemeToggle from '@/components/ThemeToggle';
import WhySection from '@/components/WhySection';
import AgentsSection from '@/components/AgentsSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadRef = useRef<UploadZoneHandle>(null);

  const startReview = (text: string) => {
    sessionStorage.setItem('proposalText', text);
    router.push('/review');
  };

  const handleFile = async (file: File) => {
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/parse-pdf', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Failed to parse PDF'); return; }
      startReview(data.text);
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="landing-page min-h-screen flex flex-col" style={{ background: 'transparent' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-12 py-6 shrink-0 border-b border-[var(--border)]"
        style={{ background: 'rgba(6,4,15,0.80)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-baseline gap-1 select-none">
          <span className="text-lg font-normal tracking-[0.2em] uppercase" style={{ color: 'var(--t1)' }}>Peer</span>
          <span className="text-lg font-light tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>Reject</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/blog" className="text-[10px] uppercase tracking-widest hidden sm:block font-medium transition-colors hover:opacity-80" style={{ color: 'var(--t3)' }}>Blog</a>
          <span className="text-[10px] uppercase tracking-widest hidden sm:block font-medium" style={{ color: 'var(--t3)' }}>K2 Think V2</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* Gold bowtie background — same as results page */}
      <div className="bowtie-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ background: '#06040f' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <path id="lbt"  d="M 0 300 L 0 480 C 200 480 380 340 600 300 C 820 260 1000 120 1200 120 L 1200 480 C 1000 480 820 340 600 300 C 380 260 200 120 0 120 Z" />
              <path id="lbt2" d="M 0 300 L 0 420 C 220 420 390 330 600 300 C 810 270 980 180 1200 180 L 1200 420 C 980 420 810 330 600 300 C 390 270 220 180 0 180 Z" />
              <path id="lbt3" d="M 0 300 L 0 360 C 240 360 400 315 600 300 C 800 285 960 240 1200 240 L 1200 360 C 960 360 800 315 600 300 C 400 285 240 240 0 240 Z" />
              <filter id="lf100" x="-60%" y="-200%" width="220%" height="500%"><feGaussianBlur in="SourceGraphic" stdDeviation="60" /></filter>
              <filter id="lf35"  x="-40%" y="-150%" width="180%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="28" /></filter>
              <filter id="lf24"  x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="16" /></filter>
            </defs>
            <use href="#lbt"  fill="rgba(160,100,10,0.55)"  filter="url(#lf100)" />
            <use href="#lbt2" fill="rgba(212,160,30,0.50)"  filter="url(#lf35)"  />
            <use href="#lbt3" fill="rgba(245,210,100,0.45)" filter="url(#lf24)"  />
          </svg>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[180px] rounded-full blur-[80px]"
          style={{ background: 'rgba(255,230,140,0.30)' }} />
        <div className="absolute left-0 top-1/2 w-[380px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'rgba(180,110,20,0.28)', transform: 'translateY(-50%) translateX(-30%)' }} />
        <div className="absolute right-0 top-1/2 w-[380px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'rgba(180,110,20,0.28)', transform: 'translateY(-50%) translateX(30%)' }} />
        <div className="bowtie-overlay absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      </div>

      {/* ── Main hero ─────────────────────────────────── */}
      <section className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 sm:py-20">

        {/* Two-column split */}
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-8">

            <div className="inline-flex items-center gap-2 self-start text-[10px] font-medium tracking-[0.25em] uppercase py-1.5 px-4 rounded-full"
              style={{ color: 'var(--gold)', border: '1px solid var(--gold-border)', background: 'var(--gold-lo)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: 'var(--gold)' }} />
              Live AI Review Simulator
            </div>

            <h1 className="display font-bold leading-[1.08]"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', color: 'var(--t1)' }}>
              Get a{' '}
              <span className="gradient-text">hostile</span>
              {' '}review.<br />
              Before they do.
            </h1>

            <p className="text-base sm:text-lg font-light leading-relaxed max-w-md"
              style={{ color: 'var(--t2)' }}>
              Upload your proposal. A panel of adversarial AI reviewers will tear apart your methodology, budget, and novelty — then hand you the fixes.
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => uploadRef.current?.open()}
                className="premium-glow inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-widest uppercase font-bold transition-all hover:scale-105 active:scale-95"
                style={{ background: 'var(--gold)', color: 'var(--bg)', borderRadius: 'var(--radius-full)' }}
              >
                Try &rarr;
              </button>
              <span className="text-xs font-light" style={{ color: 'var(--t3)' }}>
                PDF · up to 10 MB
              </span>
            </div>

            {/* Stat row */}
            <div className="flex items-center gap-6 pt-4 border-t border-[var(--border)] flex-wrap">
              {[
                { value: '~120s', label: 'review time' },
                { value: '3–7', label: 'parallel agents' },
                { value: '4', label: 'report sections' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-lg font-medium" style={{ color: 'var(--gold)' }}>{s.value}</span>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--t3)' }}>{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right: upload card */}
          <div className="flex flex-col gap-3">
            <div className="ui-card p-2 shadow-2xl" style={{ background: 'var(--bg1)' }}>
              <div className="rounded-[calc(var(--radius-card)-6px)] overflow-hidden"
                style={{ border: '1px dashed var(--border)', background: 'var(--bg2)' }}>
                <UploadZone
                  ref={uploadRef}
                  onFile={handleFile}
                  loading={loading}
                />
              </div>
            </div>

            {error && (
              <p className="text-xs px-4 py-3 font-medium rounded"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--cr)' }}>
                {error}
              </p>
            )}

            {/* Small trust line */}
            <p className="text-[10px] font-mono text-center tracking-widest uppercase" style={{ color: 'var(--t3)' }}>
              Powered by K2 Think V2 · MBZUAI / IFM
            </p>
          </div>

        </div>

      </section>

      <WhySection />
      <AgentsSection />
      <FeaturesSection />
      <AboutSection />

    </main>
  );
}
