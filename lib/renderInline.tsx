import React from 'react';

/**
 * Renders **bold**, *italic*, _italic_, and `code` inline markdown as React elements.
 */
export function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|_[^_\n]+_|`[^`\n]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length > 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length > 2)
    ) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="font-mono text-[0.88em] px-1 py-0.5 rounded"
          style={{ background: 'var(--bg2)', color: 'var(--t1)', border: '1px solid var(--border)' }}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
