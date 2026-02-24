'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import PersonaCard from '@/components/PersonaCard';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import { useLang } from '@/contexts/LanguageContext';

type Stage = 'reviewing' | 'synthesizing' | 'done';

interface Reviews {
  chen: string;
  harrington: string;
  almansouri: string;
}

interface DoneFlags {
  chen: boolean;
  harrington: boolean;
  almansouri: boolean;
}

const STEPS: Stage[] = ['reviewing', 'synthesizing', 'done'];
const STEP_KEYS: Record<Stage, 'review.stage.reviewing' | 'review.stage.synthesizing' | 'review.stage.done'> = {
  reviewing:    'review.stage.reviewing',
  synthesizing: 'review.stage.synthesizing',
  done:         'review.stage.done',
};

function formatElapsed(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

export default function ReviewPage() {
  const router = useRouter();
  const { t } = useLang();

  const [stage, setStage] = useState<Stage>('reviewing');
  const [reviews, setReviews] = useState<Reviews>({ chen: '', harrington: '', almansouri: '' });
  const [done, setDone] = useState<DoneFlags>({ chen: false, harrington: false, almansouri: false });
  const [synthesisText, setSynthesisText] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [proposalMeta, setProposalMeta] = useState({ words: 0, pages: 0 });
  const reviewsRef = useRef<Reviews>({ chen: '', harrington: '', almansouri: '' });
  const synthesisRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef('');

  useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (synthesisRef.current) {
      synthesisRef.current.scrollTop = synthesisRef.current.scrollHeight;
    }
  }, [synthesisText]);

  useEffect(() => {
    const text = sessionStorage.getItem('proposalText');
    if (!text) { router.replace('/'); return; }
    proposalRef.current = text;
    const words = text.split(/\s+/).filter(Boolean).length;
    setProposalMeta({ words, pages: Math.ceil(words / 250) });
    runReview(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runReview(proposalText: string) {
    setError(null);

    let reviewRes: Response;
    try {
      reviewRes = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalText }),
      });
    } catch {
      setError(t('review.error'));
      return;
    }

    if (!reviewRes.ok || !reviewRes.body) { setError(t('review.error')); return; }

    await consumeSSE(reviewRes, (raw) => {
      try {
        const { persona, chunk } = JSON.parse(raw) as { persona: keyof Reviews; chunk: string };
        if (chunk === '[DONE]' || chunk === '[ERROR]') {
          setDone((prev) => ({ ...prev, [persona]: true }));
        } else {
          reviewsRef.current = { ...reviewsRef.current, [persona]: reviewsRef.current[persona] + chunk };
          setReviews({ ...reviewsRef.current });
        }
      } catch { /* skip */ }
    });

    const finalReviews = reviewsRef.current;
    sessionStorage.setItem('reviews', JSON.stringify(finalReviews));
    setStage('synthesizing');

    let synRes: Response;
    try {
      synRes = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalText, reviews: finalReviews }),
      });
    } catch {
      setError(t('review.error'));
      return;
    }

    if (!synRes.ok || !synRes.body) { setError(t('review.error')); return; }

    let fullSynthesis = '';
    await consumeSSE(synRes, (raw) => {
      try {
        const { chunk } = JSON.parse(raw) as { chunk?: string };
        if (chunk) { fullSynthesis += chunk; setSynthesisText(fullSynthesis); }
      } catch { /* skip */ }
    });

    sessionStorage.setItem('synthesis', fullSynthesis);
    setStage('done');
    router.push('/results');
  }

  const handleRetry = () => {
    setReviews({ chen: '', harrington: '', almansouri: '' });
    reviewsRef.current = { chen: '', harrington: '', almansouri: '' };
    setDone({ chen: false, harrington: false, almansouri: false });
    setSynthesisText('');
    setElapsed(0);
    setStage('reviewing');
    runReview(proposalRef.current);
  };

  const currentStepIdx = STEPS.indexOf(stage);

  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col">

      {/* ── Nav ── */}
      <nav
        className="flex items-center justify-between px-6 sm:px-8 py-3.5 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="display flex items-baseline gap-1 select-none">
          <span className="text-xl font-light tracking-[0.18em] uppercase" style={{ color: 'var(--t2)' }}>Peer</span>
          <span className="text-xl font-bold tracking-[0.18em] uppercase" style={{ color: 'var(--cr)' }}>Reject</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer + meta */}
          <div className="hidden sm:flex items-center gap-3 text-xs" style={{ color: 'var(--t3)' }}>
            <span>
              <span style={{ color: 'var(--t3)' }}>⏱ </span>
              <span className="font-mono" style={{ color: 'var(--t2)' }}>{formatElapsed(elapsed)}</span>
            </span>
            {proposalMeta.words > 0 && (
              <>
                <span style={{ color: 'var(--border-hi)' }}>|</span>
                <span>{proposalMeta.words.toLocaleString()} {t('review.words')} · {proposalMeta.pages} {t('review.pages')}</span>
              </>
            )}
          </div>
          <div style={{ width: 1, height: 16, background: 'var(--border-hi)' }} className="hidden sm:block" />
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-5 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">

        {/* ── Progress steps ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            {STEPS.map((step, i) => {
              const isPast   = currentStepIdx > i;
              const isActive = currentStepIdx === i;
              return (
                <div key={step} className="flex items-center gap-1.5 flex-1">
                  <div
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300"
                    style={
                      isActive
                        ? { background: 'var(--cr-lo)', color: 'var(--cr-hi)', border: '1px solid rgba(192,48,48,0.25)' }
                        : isPast
                        ? { background: 'rgba(40,160,112,0.10)', color: 'var(--emerald)', border: '1px solid rgba(40,160,112,0.20)' }
                        : { background: 'var(--bg1)', color: 'var(--t3)', border: '1px solid var(--border)' }
                    }
                  >
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-[pulseDot_1.4s_ease-in-out_infinite]"
                        style={{ background: 'var(--cr-hi)' }}
                      />
                    )}
                    {isPast && <span style={{ color: 'var(--emerald)' }}>✓</span>}
                    {t(STEP_KEYS[step])}
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="text-xs" style={{ color: isPast ? 'var(--emerald)' : 'var(--t3)' }}>›</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-baseline gap-2">
            <h1 className="display text-xl font-semibold" style={{ color: 'var(--t1)' }}>
              {t('review.title')}
            </h1>
            <p className="text-xs" style={{ color: 'var(--t3)' }}>{t('review.subtitle')}</p>
          </div>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div
            className="rounded-xl px-5 py-4 flex items-center gap-4"
            style={{ background: 'var(--cr-lo)', border: '1px solid rgba(192,48,48,0.25)' }}
          >
            <span style={{ color: 'var(--cr-hi)', fontSize: '1.25rem' }}>⚠</span>
            <p className="text-sm flex-1" style={{ color: 'var(--cr-hi)' }}>{error}</p>
            <button
              onClick={handleRetry}
              className="shrink-0 text-sm px-4 py-1.5 rounded-lg font-medium transition-all"
              style={{
                background: 'rgba(192,48,48,0.2)',
                border: '1px solid rgba(192,48,48,0.35)',
                color: 'var(--cr-hi)',
              }}
            >
              {t('review.retry')}
            </button>
          </div>
        )}

        {/* ── Persona cards ── */}
        <div className="persona-scroll">
          {[
            { nameKey: 'personas.chen', roleKey: 'personas.chen.role', emoji: '🔬', borderColor: 'border-violet-800/40', accentColor: 'text-violet-300', bgColor: 'bg-violet-950/10', review: reviews.chen, isDone: done.chen },
            { nameKey: 'personas.harrington', roleKey: 'personas.harrington.role', emoji: '💰', borderColor: 'border-amber-800/40', accentColor: 'text-amber-300', bgColor: 'bg-amber-950/10', review: reviews.harrington, isDone: done.harrington },
            { nameKey: 'personas.almansouri', roleKey: 'personas.almansouri.role', emoji: '📚', borderColor: 'border-sky-800/40', accentColor: 'text-sky-300', bgColor: 'bg-sky-950/10', review: reviews.almansouri, isDone: done.almansouri },
          ].map((p) => (
            <div key={p.nameKey} className="persona-scroll-item">
              <PersonaCard
                nameKey={p.nameKey as 'personas.chen' | 'personas.harrington' | 'personas.almansouri'}
                roleKey={p.roleKey as 'personas.chen.role' | 'personas.harrington.role' | 'personas.almansouri.role'}
                emoji={p.emoji}
                borderColor={p.borderColor}
                accentColor={p.accentColor}
                bgColor={p.bgColor}
                text={p.review}
                isDone={p.isDone}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-xs md:hidden" style={{ color: 'var(--t3)' }}>← swipe to see all reviewers →</p>

        {/* ── Synthesis streaming panel ── */}
        {stage === 'synthesizing' && (
          <div
            className="rounded-xl flex flex-col overflow-hidden"
            style={{ background: 'var(--bg1)', border: '1px solid var(--border)', borderTop: '2px solid var(--gold)' }}
          >
            <div
              className="flex items-center gap-2.5 px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span
                className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin shrink-0"
                style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }}
              />
              <p className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>
                {t('review.synthesizing')}
              </p>
              <span
                className="ms-auto text-[10px] font-mono uppercase tracking-wider animate-pulse"
                style={{ color: 'var(--t3)' }}
              >
                K2 Think V2
              </span>
            </div>
            <div
              ref={synthesisRef}
              className="p-4 max-h-52 overflow-y-auto text-xs font-mono leading-relaxed whitespace-pre-wrap"
              style={{ color: 'var(--t2)' }}
            >
              {synthesisText || <span className="italic" style={{ color: 'var(--t3)' }}>Initialising synthesis…</span>}
              {synthesisText && (
                <span
                  className="inline-block ml-0.5 align-middle animate-pulse"
                  style={{ width: 5, height: 11, background: 'var(--gold)' }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ── SSE consumer ─────────────────────────────────────────────────────────────
async function consumeSSE(response: Response, onData: (raw: string) => void): Promise<void> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') return;
        onData(raw);
      }
    }
  } finally {
    reader.releaseLock();
  }
}
