'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadZone, { UploadZoneHandle } from '@/components/UploadZone';
import LanguageToggle from '@/components/LanguageToggle';
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
    <main className="min-h-screen bg-(--bg) flex flex-col overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-12 py-6 shrink-0 relative z-10">
        <div className="flex items-baseline gap-1 select-none">
          <span className="text-lg font-normal tracking-[0.2em] uppercase" style={{ color: 'var(--t1)' }}>Peer</span>
          <span className="text-lg font-light tracking-[0.2em] uppercase" style={{ color: 'var(--t3)' }}>Reject</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/blog" className="text-[10px] uppercase tracking-widest hidden sm:block font-medium transition-colors hover:opacity-80" style={{ color: 'var(--t3)' }}>Blog</a>
          <span className="text-[10px] uppercase tracking-widest hidden sm:block font-medium" style={{ color: 'var(--t3)' }}>K2 Think V2</span>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      {/* Ambient glow — sits behind content */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[30%] w-[700px] h-[700px] rounded-full opacity-[0.07] blur-[140px]"
          style={{ backgroundColor: 'var(--t1)' }} />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ backgroundColor: 'var(--cr)' }} />
      </div>

      {/* ── Main hero ─────────────────────────────────── */}
      <section className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 sm:py-20">

        {/* Two-column split */}
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-8">

            <div className="inline-flex items-center gap-2 self-start text-[10px] font-medium tracking-[0.25em] uppercase py-1.5 px-4 rounded-full"
              style={{ color: 'var(--t3)', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              Live AI Review Simulator
            </div>

            <h1 className="display font-bold leading-[1.08]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--t1)' }}>
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
                style={{ background: 'var(--t1)', color: 'var(--bg)', borderRadius: 'var(--radius-full)' }}
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
                  <span className="font-mono text-lg font-medium" style={{ color: 'var(--t1)' }}>{s.value}</span>
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
