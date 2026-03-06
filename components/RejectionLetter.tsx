'use client';

import { renderInline } from '@/lib/renderInline';

export default function RejectionLetter({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      {paragraphs.length > 0 ? (
        paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-base font-light leading-[1.85]"
            style={{ color: i === 0 ? 'var(--t1)' : 'var(--t2)' }}
          >
            {renderInline(para)}
          </p>
        ))
      ) : (
        <span className="text-sm font-light italic" style={{ color: 'var(--t3)' }}>
          No letter generated.
        </span>
      )}
    </div>
  );
}
