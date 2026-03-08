'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useLang } from '@/contexts/LanguageContext';
import { classifyDocument, AGENT_META, AGENT_ACCENTS, type AgentId, type Classification } from '@/lib/agentConfig';

type Stage = 'classifying' | 'reviewing' | 'synthesizing' | 'done';

function formatElapsed(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

function extractReviewContent(text: string, reviewHeader: string): string {
  const pattern = new RegExp(reviewHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = [...text.matchAll(pattern)];
  if (matches.length === 0) return '';
  return text.slice(matches[matches.length - 1].index!).trim();
}

function extractThinkingTrace(text: string, reviewHeader: string): string {
  const pattern = new RegExp(reviewHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = [...text.matchAll(pattern)];
  if (matches.length === 0) return text;
  return text.slice(0, matches[matches.length - 1].index!).trim();
}

function getSynthesisStep(text: string): number {
  if (text.includes('## REVISED ABSTRACT')) return 4;
  if (text.includes('## FIX RECOMMENDATIONS')) return 3;
  if (text.includes('## WEAKNESS REPORT')) return 2;
  if (text.includes('## FORMAL REJECTION LETTER') || text.includes('FORMAL REJECTION LETTER')) return 1;
  return 0;
}

// ─── Brain animation ──────────────────────────────────────────────────────────
function BrainAnimation({ status, label, accent }: { status: 'waiting' | 'thinking' | 'writing'; label: string; accent?: string }) {
  const color = status === 'writing' && accent ? accent : 'var(--t1)';
  const baseOpacity = status === 'waiting' ? 0.06 : 0.14;
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 select-none">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute rounded-full animate-ping"
            style={{
              inset: `${i * 7}px`,
              border: `1px solid ${color}`,
              opacity: baseOpacity - i * 0.02,
              animationDuration: `${1.8 + i * 0.45}s`,
              animationDelay: `${i * 0.35}s`,
            }} />
        ))}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <span key={deg} className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              background: color,
              opacity: status === 'waiting' ? 0.08 : 0.2 + (i % 3) * 0.12,
              top: `${50 - 38 * Math.cos((deg * Math.PI) / 180)}%`,
              left: `${50 + 38 * Math.sin((deg * Math.PI) / 180)}%`,
              transform: 'translate(-50%,-50%)',
              animationDelay: `${i * 0.2}s`,
            }} />
        ))}
        <span className="w-3 h-3 rounded-full"
          style={{ background: color, opacity: status === 'waiting' ? 0.15 : 0.65 }} />
      </div>
      <p className="text-xs font-light text-center px-4 leading-relaxed" style={{ color: 'var(--t3)' }}>
        {label}
      </p>
    </div>
  );
}

// ─── Done animation: brain rings collapse → green tick ────────────────────────
function DoneAnimation() {
  const [phase, setPhase] = useState<'collapse' | 'tick'>('collapse');
  useEffect(() => {
    const t = setTimeout(() => setPhase('tick'), 480);
    return () => clearTimeout(t);
  }, []);

  if (phase === 'tick') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 animate-fade-slide">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#22c55e' }}>
          Review Complete
        </p>
      </div>
    );
  }

  // Collapse phase: rings converging to center
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute rounded-full transition-all duration-500"
            style={{
              inset: '7px',
              border: '1px solid #22c55e',
              opacity: 0.2 - i * 0.05,
              transform: `scale(${0.6 + i * 0.25})`,
            }} />
        ))}
        <span className="w-3 h-3 rounded-full transition-all duration-300"
          style={{ background: '#22c55e', opacity: 0.8 }} />
      </div>
    </div>
  );
}

// ─── Synthesis checkpoint panel ───────────────────────────────────────────────
const SYNTHESIS_STEPS = [
  { label: 'Drafting decision letter',     sublabel: 'Formal committee language' },
  { label: 'Compiling weakness report',    sublabel: 'Fatal · Major · Minor issues' },
  { label: 'Building fix recommendations', sublabel: 'Actionable revisions' },
  { label: 'Rewriting abstract',           sublabel: 'Target resubmission version' },
];

function SynthesisPanel({ step }: { step: number }) {
  return (
    <div
      className="overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(to bottom, rgba(var(--gold-rgb), 0.08) 0%, var(--bg1) 40%)',
        borderBottom: '2px solid var(--gold)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--border)]">
        <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-[var(--gold)] animate-ping opacity-25" />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gold)' }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: 'var(--t1)' }}>Synthesizing Panel Findings</p>
          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'var(--t3)' }}>
            Program Chair · K2 Think V2
          </p>
        </div>
        <div className="flex gap-0.5 items-end h-4 shrink-0">
          {[4, 7, 10, 7, 4].map((h, i) => (
            <span key={i} className="w-1 rounded-full animate-bounce"
              style={{ background: 'var(--gold)', height: `${h}px`, animationDelay: `${i * 0.1}s`, opacity: 0.6 }} />
          ))}
        </div>
      </div>
      <div className="px-6 py-6 flex flex-col gap-0">
        {SYNTHESIS_STEPS.map((s, i) => {
          const n = i + 1;
          const isDone = step > n;
          const isActive = step === n;
          return (
            <div key={s.label} className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0 w-5">
                <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                  {isDone && (
                    <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold"
                      style={{ background: 'var(--t1)', color: 'var(--bg)' }}>✓</span>
                  )}
                  {isActive && (
                    <>
                      <span className="absolute w-4 h-4 rounded-full animate-ping"
                        style={{ background: 'var(--gold)', opacity: 0.2 }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gold)' }} />
                    </>
                  )}
                  {!isDone && !isActive && (
                    <span className="w-2.5 h-2.5 rounded-full border" style={{ borderColor: 'var(--border)' }} />
                  )}
                </div>
                {i < SYNTHESIS_STEPS.length - 1 && (
                  <div className="w-px my-0.5" style={{
                    minHeight: '20px',
                    background: isDone ? 'var(--t2)' : 'var(--border)',
                    opacity: isDone ? 0.35 : 0.25,
                  }} />
                )}
              </div>
              <div className="pb-5 flex flex-col gap-0.5">
                <p className="text-sm font-medium"
                  style={{ color: isActive ? 'var(--t1)' : isDone ? 'var(--t2)' : 'var(--t3)', opacity: !isDone && !isActive ? 0.4 : 1 }}>
                  {s.label}
                </p>
                {(isDone || isActive) && (
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--t3)', opacity: 0.7 }}>
                    {s.sublabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const CARD_HEIGHT = 340;

export default function ReviewPage() {
  const router = useRouter();
  const { t } = useLang();

  const [stage, setStage] = useState<Stage>('classifying');
  const [classification, setClassification] = useState<Classification | null>(null);
  const [reviews, setReviews] = useState<Record<AgentId, string>>({} as Record<AgentId, string>);
  const [done, setDone] = useState<Record<AgentId, boolean>>({} as Record<AgentId, boolean>);
  const [synthesisText, setSynthesisText] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [proposalMeta, setProposalMeta] = useState({ words: 0 });
  const [showThinking, setShowThinking] = useState<Record<string, boolean>>({});

  const reviewsRef = useRef<Record<AgentId, string>>({} as Record<AgentId, string>);
  const proposalRef = useRef('');

  useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = sessionStorage.getItem('proposalText');
    if (!text) { router.replace('/'); return; }
    proposalRef.current = text;
    setProposalMeta({ words: text.split(/\s+/).filter(Boolean).length });

    // Classify document — instant, client-side
    const cls = classifyDocument(text);
    // Brief delay so user sees the classification screen
    setTimeout(() => {
      setClassification(cls);
      // Initialize agent state
      const initReviews = {} as Record<AgentId, string>;
      const initDone = {} as Record<AgentId, boolean>;
      for (const id of cls.agents) { initReviews[id] = ''; initDone[id] = false; }
      reviewsRef.current = initReviews;
      setReviews(initReviews);
      setDone(initDone);
      setStage('reviewing');
      runReview(text, cls.agents);
    }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runReview(proposalText: string, agents: AgentId[]) {
    setError(null);
    let reviewRes: Response;
    try {
      reviewRes = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalText, agents }),
      });
    } catch { setError(t('review.error')); return; }
    if (!reviewRes.ok || !reviewRes.body) { setError(t('review.error')); return; }

    await consumeSSE(reviewRes, (raw) => {
      try {
        const { agentId, chunk } = JSON.parse(raw) as { agentId: AgentId; chunk: string };
        if (chunk === '[DONE]' || chunk === '[ERROR]') {
          setDone((prev) => ({ ...prev, [agentId]: true }));
        } else {
          reviewsRef.current = { ...reviewsRef.current, [agentId]: (reviewsRef.current[agentId] ?? '') + chunk };
          setReviews({ ...reviewsRef.current });
        }
      } catch { /* skip */ }
    });

    const finalReviews = reviewsRef.current;
    sessionStorage.setItem('reviews', JSON.stringify(finalReviews));
    sessionStorage.setItem('agents', JSON.stringify(agents));
    setStage('synthesizing');

    let synRes: Response;
    try {
      synRes = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalText, reviews: finalReviews, agents }),
      });
    } catch { setError(t('review.error')); return; }
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

  const agents = classification?.agents ?? [];
  const doneCount = agents.filter((id) => done[id]).length;
  const synthesisStep = getSynthesisStep(synthesisText);

  // Grid column class based on agent count
  const gridCols =
    agents.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
    agents.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
    agents.length === 4 ? 'grid-cols-1 md:grid-cols-2' :
    'persona-scroll';

  const usePersonaScroll = agents.length === 3 || agents.length > 4;

  return (
    <main className="review-page min-h-screen flex flex-col" style={{ background: 'transparent' }}>

      {/* Gold bowtie background */}
      <div className="bowtie-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ background: '#06040f' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <path id="rbt"  d="M 0 300 L 0 480 C 200 480 380 340 600 300 C 820 260 1000 120 1200 120 L 1200 480 C 1000 480 820 340 600 300 C 380 260 200 120 0 120 Z" />
              <path id="rbt2" d="M 0 300 L 0 420 C 220 420 390 330 600 300 C 810 270 980 180 1200 180 L 1200 420 C 980 420 810 330 600 300 C 390 270 220 180 0 180 Z" />
              <path id="rbt3" d="M 0 300 L 0 360 C 240 360 400 315 600 300 C 800 285 960 240 1200 240 L 1200 360 C 960 360 800 315 600 300 C 400 285 240 240 0 240 Z" />
              <filter id="rf100" x="-60%" y="-200%" width="220%" height="500%"><feGaussianBlur in="SourceGraphic" stdDeviation="60" /></filter>
              <filter id="rf35"  x="-40%" y="-150%" width="180%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="28" /></filter>
              <filter id="rf24"  x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="16" /></filter>
            </defs>
            <use href="#rbt"  fill="rgba(160,100,10,0.55)"  filter="url(#rf100)" />
            <use href="#rbt2" fill="rgba(212,160,30,0.50)"  filter="url(#rf35)"  />
            <use href="#rbt3" fill="rgba(245,210,100,0.45)" filter="url(#rf24)"  />
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

      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 shrink-0 border-b border-[var(--border)]"
        style={{ background: 'rgba(6,4,15,0.80)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-baseline gap-1 select-none">
          <span className="text-lg font-normal tracking-[0.2em] uppercase" style={{ color: 'var(--t1)' }}>Peer</span>
          <span className="text-lg font-light tracking-[0.2em] uppercase" style={{ color: 'var(--t3)' }}>Reject</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 text-[10px] uppercase tracking-widest font-medium" style={{ color: 'var(--t3)' }}>
            <span className="font-mono tabular-nums">{formatElapsed(elapsed)}</span>
            {proposalMeta.words > 0 && (
              <><span style={{ color: 'var(--border)' }}>·</span>
                <span>{proposalMeta.words.toLocaleString()} {t('review.words')}</span></>
            )}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-10 pb-24 flex flex-col gap-10">

        {/* ── Classifying screen ── */}
        {stage === 'classifying' && (
          <div className="flex flex-col items-center justify-center flex-1 gap-8 py-24">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <span key={i} className="absolute rounded-full animate-ping"
                  style={{ inset: `${i * 6}px`, border: '1px solid var(--cr)', opacity: 0.15 + i * 0.05, animationDuration: `${1.5 + i * 0.4}s` }} />
              ))}
              <span className="w-4 h-4 rounded-full" style={{ background: 'var(--cr)', opacity: 0.8 }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-lg font-light" style={{ color: 'var(--cr)' }}>Analyzing document type...</p>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--t3)' }}>
                Selecting appropriate review panel
              </p>
            </div>
          </div>
        )}

        {/* ── Reviewing / Synthesizing screens ── */}
        {stage !== 'classifying' && (
          <>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="display text-3xl sm:text-4xl font-normal" style={{ color: 'var(--t1)' }}>
                  {t('review.title')}
                </h1>
                {classification && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-[var(--border)]"
                    style={{ color: 'var(--t3)' }}>
                    {classification.label}
                  </span>
                )}
              </div>
              <p className="text-sm font-light" style={{ color: 'var(--t3)' }}>{t('review.subtitle')}</p>
            </div>

            {stage === 'reviewing' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest" style={{ color: 'var(--t3)' }}>
                  <span>{doneCount} of {agents.length} reviewers done</span>
                  <span className="font-mono">{formatElapsed(elapsed)}</span>
                </div>
                <div className="h-px w-full overflow-hidden" style={{ background: 'var(--bg2)' }}>
                  <div className="h-full transition-all duration-700"
                    style={{ width: agents.length ? `${(doneCount / agents.length) * 100}%` : '0%', background: 'var(--t1)' }} />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-between border border-red-500/20 rounded-[var(--radius-card)] px-5 py-4 bg-red-500/5">
                <p className="text-sm font-medium" style={{ color: 'var(--cr)' }}>{error}</p>
              </div>
            )}

            {/* Agent cards */}
            {agents.length > 0 && (
              <div className={usePersonaScroll ? 'persona-scroll' : `grid ${gridCols} gap-6`}>
                {agents.map((id) => {
                  const meta = AGENT_META[id];
                  const accent = AGENT_ACCENTS[id] ?? 'var(--gold)';
                  const rawText = reviews[id] ?? '';
                  const isDone = done[id] ?? false;
                  const reviewContent = extractReviewContent(rawText, meta.reviewHeader);
                  const thinkingTrace = extractThinkingTrace(rawText, meta.reviewHeader);
                  const isWriting = !isDone && reviewContent.length > 0;
                  const isShowingThinking = showThinking[id] ?? false;

                  const statusBadge = isDone
                    ? null // replaced by DoneAnimation
                    : isWriting
                    ? <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-medium" style={{ color: accent }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />Writing
                      </span>
                    : rawText
                    ? <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider" style={{ color: accent }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: accent, opacity: 0.5 }} />Thinking
                      </span>
                    : <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--t3)' }}>Waiting</span>;

                  const animStatus = !rawText ? 'waiting' : isWriting ? 'writing' : 'thinking';
                  const animLabel = isWriting ? meta.writingLabel : meta.thinkingLabel;

                  return (
                    <div
                      key={id}
                      className={`${usePersonaScroll ? 'persona-scroll-item' : ''} flex flex-col overflow-hidden transition-all duration-300`}
                      style={{
                        height: `${CARD_HEIGHT}px`,
                        background: `linear-gradient(to bottom, ${accent}08 0%, var(--bg) 40%)`,
                        borderBottom: `2px solid ${accent}30`,
                        borderRadius: 'var(--radius-card)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-card)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(to bottom, ${accent}12 0%, var(--bg1) 40%)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(to bottom, ${accent}08 0%, var(--bg) 40%)`;
                      }}
                    >
                      {/* Card header */}
                      <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)] shrink-0">
                        <span
                          className="font-mono text-[10px] tracking-widest font-bold tabular-nums px-2 py-1 rounded shrink-0"
                          style={{ color: accent, background: `${accent}18` }}
                        >
                          {String(agents.indexOf(id) + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium" style={{ color: 'var(--t1)' }}>{meta.name}</p>
                          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'var(--t3)' }}>{meta.role}</p>
                        </div>
                        {statusBadge && <div className="shrink-0">{statusBadge}</div>}
                      </div>

                      {/* Card body */}
                      <div className="flex-1 overflow-hidden flex flex-col">
                        {isDone ? (
                          <div className="flex-1"><DoneAnimation /></div>
                        ) : isShowingThinking ? (
                          <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
                            <p className="text-[10px] font-mono leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--t3)' }}>
                              {thinkingTrace || 'Waiting for response...'}
                            </p>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <BrainAnimation status={animStatus} label={animLabel} accent={accent} />
                          </div>
                        )}

                        {/* "See process" toggle */}
                        {!isDone && rawText && (
                          <div className="shrink-0 border-t border-[var(--border)] px-5 py-2.5 flex justify-end">
                            <button
                              onClick={() => setShowThinking((prev) => ({ ...prev, [id]: !prev[id] }))}
                              className="text-[10px] uppercase tracking-widest font-medium transition-opacity hover:opacity-80"
                              style={{ color: 'var(--t3)' }}
                            >
                              {isShowingThinking ? '← Hide process' : 'See process →'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {stage === 'synthesizing' && <SynthesisPanel step={synthesisStep} />}
          </>
        )}
      </div>
    </main>
  );
}

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
