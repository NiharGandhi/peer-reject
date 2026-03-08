'use client';

import { renderInline } from '@/lib/renderInline';

const LIST_ITEM_REGEX = /^\([ivx\d]+\)\s+/i;
const REVIEWER_REGEX = /^Reviewer\s+\d+\s*\([^)]+\)/;
const REVIEWER_NAMED_REGEX = /^The\s+[\w\s]+\s+Reviewer\b/i;

function parseLetterContent(text: string) {
  const blocks: { type: 'paragraph' | 'list-intro' | 'list-item'; content: string }[] = [];
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  for (const para of paragraphs) {
    const lines = para.split(/\n/).map((l) => l.trim()).filter(Boolean);
    const listItems: string[] = [];
    let intro = '';

    if (lines.some((l) => LIST_ITEM_REGEX.test(l))) {
      for (const line of lines) {
        if (LIST_ITEM_REGEX.test(line)) {
          listItems.push(line);
        } else if (listItems.length === 0) {
          intro = intro ? `${intro}\n${line}` : line;
        }
      }
      if (intro) blocks.push({ type: 'list-intro', content: intro });
      listItems.forEach((item) => blocks.push({ type: 'list-item', content: item }));
    } else {
      blocks.push({ type: 'paragraph', content: para });
    }
  }
  return blocks;
}

export default function RejectionLetter({ text }: { text: string }) {
  const blocks = parseLetterContent(text);

  return (
    <div className="flex flex-col gap-6">
      {blocks.length > 0 ? (
        blocks.map((block, i) => {
          if (block.type === 'list-intro') {
            return (
              <p
                key={i}
                className="text-base font-light leading-[1.85]"
                style={{ color: 'var(--t2)' }}
              >
                {renderInline(block.content)}
              </p>
            );
          }
          if (block.type === 'list-item') {
            const match = block.content.match(LIST_ITEM_REGEX);
            const label = match ? match[0].trim() : '';
            const body = match ? block.content.slice(match[0].length) : block.content;
            return (
              <div key={i} className="flex gap-3 pl-1">
                <span className="font-medium shrink-0" style={{ color: 'var(--t1)' }}>{label}</span>
                <span className="text-base font-light leading-[1.85]" style={{ color: 'var(--t2)' }}>
                  {renderInline(body)}
                </span>
              </div>
            );
          }
          const reviewerMatch = block.content.match(REVIEWER_REGEX)?.[0] ?? block.content.match(REVIEWER_NAMED_REGEX)?.[0];
          const isReviewer = !!reviewerMatch;
          const isFirst = i === 0;
          return (
            <p
              key={i}
              className="text-base font-light leading-[1.85]"
              style={{ color: isFirst ? 'var(--t1)' : 'var(--t2)' }}
            >
              {isReviewer ? (
                <>
                  <strong className="font-medium" style={{ color: 'var(--t1)' }}>
                    {reviewerMatch}
                  </strong>
                  {renderInline(block.content.replace(REVIEWER_REGEX, ' ').replace(REVIEWER_NAMED_REGEX, ' '))}
                </>
              ) : (
                renderInline(block.content)
              )}
            </p>
          );
        })
      ) : (
        <span className="text-sm font-light italic" style={{ color: 'var(--t3)' }}>
          No letter generated.
        </span>
      )}
    </div>
  );
}
