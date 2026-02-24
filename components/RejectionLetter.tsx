'use client';

export default function RejectionLetter({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--bg1)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--cr)',
      }}
    >
      {/* Letterhead strip */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--cr-lo)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--cr)' }} />
        <p
          className="display text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--cr-hi)' }}
        >
          Official Rejection · K2 Think V2 Review Panel
        </p>
      </div>

      {/* Letter body */}
      <div className="px-6 py-6">
        {text ? (
          <div className="text-sm leading-[1.85] whitespace-pre-wrap" style={{ color: 'var(--t1)' }}>
            {text}
          </div>
        ) : (
          <span className="text-sm italic" style={{ color: 'var(--t3)' }}>No letter generated.</span>
        )}
      </div>
    </div>
  );
}
