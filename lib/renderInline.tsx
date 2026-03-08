'use client';

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const GARBLED_PLACEHOLDER = '\u200B__GARBLED__\u200B';

/**
 * Preprocess: wrap common unwrapped LaTeX and quoted notation for rendering.
 */
function preprocessText(text: string): string {
  const garbled: string[] = [];
  // First: extract parenthesized garbled notation like (!R\P\(R#L)) and replace with placeholder
  let result = text.replace(/\(([^)]*[!#$\\][^)]*)\)/g, (match, inner) => {
    if (/^[a-zA-Z0-9\s_{}^,]+$/.test(inner)) return match;
    const idx = garbled.length;
    garbled.push(match);
    return GARBLED_PLACEHOLDER + idx + GARBLED_PLACEHOLDER;
  });
  result = result
    // Wrap garbled \(...\) (contains # or invalid symbols) as code so they're not parsed as LaTeX
    .replace(/\\\(([^)]*[#!\\][^)]*)\\\)/g, '`\\($1\\)`')
    .replace(/\\bar\{([^}]+)\}(_[a-zA-Z0-9]+)?/g, '\\( \\bar{$1}$2 \\)')
    .replace(/\\overline\{([^}]+)\}(_[a-zA-Z0-9]+)?/g, '\\( \\overline{$1}$2 \\)')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '\\( \\frac{$1}{$2} \\)')
    .replace(/([A-Z])_([a-zA-Z0-9]+)(?=\s|$|[.,;:])/g, (_, base, sub) => `\\( ${base}_{${sub}} \\)`)
    .replace(/"([^"]*[!#$\\\/()\[\]{}][^"]*)"/g, '`$1`')
    .replace(/"([^"]+)"/g, '*$1*');
  // Restore garbled notation as code blocks
  garbled.forEach((g, i) => {
    result = result.replace(GARBLED_PLACEHOLDER + i + GARBLED_PLACEHOLDER, '`' + g.replace(/`/g, '\\`') + '`');
  });
  return result;
}

/**
 * Renders **bold**, *italic*, _italic_, `code`, and LaTeX \( \) / \[ \] as React elements.
 */
function formatText(text: string): React.ReactNode[] {
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

function renderMath(latex: string, display: boolean): React.ReactNode {
  try {
    const html = katex.renderToString(latex.trim(), {
      displayMode: display,
      throwOnError: false,
      errorColor: 'var(--cr)',
      strict: false,
    });
    return (
      <span
        className={display ? 'block my-3 overflow-x-auto' : 'inline'}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return <code className="text-[0.9em] opacity-80">{latex}</code>;
  }
}

export function renderInline(text: string): React.ReactNode {
  text = preprocessText(text);
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  // Match \( inline \) and \[ display \] math
  const mathRegex = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let match;

  let keyIdx = 0;
  while ((match = mathRegex.exec(text)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      formatText(before).forEach((node) => segments.push(<React.Fragment key={`seg-${keyIdx++}`}>{node}</React.Fragment>));
    }

    if (match[1] !== undefined) {
      segments.push(<React.Fragment key={`seg-${keyIdx++}`}>{renderMath(match[1], false)}</React.Fragment>);
    } else if (match[2] !== undefined) {
      segments.push(<React.Fragment key={`seg-${keyIdx++}`}>{renderMath(match[2], true)}</React.Fragment>);
    }

    lastIndex = mathRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const after = text.slice(lastIndex);
    formatText(after).forEach((node) => segments.push(<React.Fragment key={`seg-${keyIdx++}`}>{node}</React.Fragment>));
  }

  return <>{segments}</>;
}
