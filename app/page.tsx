'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadZone from '@/components/UploadZone';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import HowItWorks from '@/components/HowItWorks';
import { useLang } from '@/contexts/LanguageContext';
import { SAMPLE_PROPOSAL } from '@/lib/sampleProposal';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const reviewers = [
    {
      initials: 'SC',
      name: t('personas.chen'),
      role: t('personas.chen.role'),
      color: 'var(--violet)',
      colorLo: 'rgba(124,92,191,0.12)',
    },
    {
      initials: 'JH',
      name: t('personas.harrington'),
      role: t('personas.harrington.role'),
      color: 'var(--amber)',
      colorLo: 'rgba(192,128,48,0.12)',
    },
    {
      initials: 'AM',
      name: t('personas.almansouri'),
      role: t('personas.almansouri.role'),
      color: 'var(--sky)',
      colorLo: 'var(--sky-lo)',
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] bg-tribunal flex flex-col">

      {/* ── Nav ── */}
      <nav
        className="flex items-center justify-between px-6 sm:px-8 py-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="display flex items-baseline gap-1 select-none">
          <span className="text-xl font-light tracking-[0.18em] uppercase" style={{ color: 'var(--t2)' }}>Peer</span>
          <span className="text-xl font-bold tracking-[0.18em] uppercase" style={{ color: 'var(--cr)' }}>Reject</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs hidden sm:block" style={{ color: 'var(--t3)' }}>K2 Think V2</span>
          <div style={{ width: 1, height: 16, background: 'var(--border-hi)' }} className="hidden sm:block" />
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center px-6 sm:px-10 pt-16 pb-12 gap-10 max-w-4xl mx-auto w-full">

        {/* Live badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide animate-fade-in"
          style={{ background: 'var(--cr-lo)', border: '1px solid rgba(192,48,48,0.25)', color: 'var(--cr-hi)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-[pulseDot_1.8s_ease-in-out_infinite]" style={{ background: 'var(--cr-hi)' }} />
          Live · K2 Think V2 · 3 Adversarial Reviewers
        </div>

        {/* Headline */}
        <div className="display text-center flex flex-col gap-1 animate-fade-slide" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
          <h1
            className="leading-[1.05] font-light"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: 'var(--t1)', letterSpacing: '-0.01em' }}
          >
            Your proposal
          </h1>
          <h1
            className="leading-[1.05] font-bold italic"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: 'var(--cr)', letterSpacing: '-0.01em' }}
          >
            will be rejected.
          </h1>
          <p
            className="mt-4 text-base sm:text-lg font-light"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--t2)', fontStyle: 'italic' }}
          >
            Find out exactly why — before the committee does.
          </p>
        </div>

        {/* Reviewer chips */}
        <div
          className="flex gap-3 flex-wrap justify-center animate-fade-slide"
          style={{ animationDelay: '160ms', animationFillMode: 'both' }}
        >
          {reviewers.map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
              style={{
                background: r.colorLo,
                border: `1px solid ${r.color}30`,
                borderLeft: `3px solid ${r.color}`,
              }}
            >
              <div
                className="display w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: r.color + '25', color: r.color, border: `1px solid ${r.color}40` }}
              >
                {r.initials}
              </div>
              <div>
                <p className="font-semibold text-xs leading-tight" style={{ color: 'var(--t1)' }}>{r.name}</p>
                <p className="text-[11px] leading-tight" style={{ color: 'var(--t3)' }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload zone */}
        <div
          className="w-full animate-fade-slide"
          style={{ animationDelay: '240ms', animationFillMode: 'both' }}
        >
          <UploadZone onFile={handleFile} onSample={() => startReview(SAMPLE_PROPOSAL)} loading={loading} />
        </div>

        {/* Status */}
        {loading && (
          <div className="flex items-center gap-2 text-sm animate-fade-in" style={{ color: 'var(--t2)' }}>
            <span
              className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin shrink-0"
              style={{ borderColor: 'var(--sky)', borderTopColor: 'transparent' }}
            />
            {t('upload.parsing')}
          </div>
        )}
        {error && (
          <p
            className="text-sm px-4 py-2 rounded-lg max-w-sm text-center animate-fade-in"
            style={{ color: 'var(--cr-hi)', background: 'var(--cr-lo)', border: '1px solid rgba(192,48,48,0.25)' }}
          >
            {error}
          </p>
        )}

        {/* How it works */}
        <div className="animate-fade-slide w-full" style={{ animationDelay: '320ms', animationFillMode: 'both' }}>
          <HowItWorks />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-5" style={{ borderTop: '1px solid var(--border)', color: 'var(--t3)' }}>
        <p className="text-xs tracking-wide">Powered by K2 Think V2 · MBZUAI / IFM</p>
      </footer>
    </main>
  );
}
