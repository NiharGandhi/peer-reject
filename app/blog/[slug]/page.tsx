import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPost } from '@/lib/blog';
import type { Block } from '@/lib/blog';

// ── Static params ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// ── Per-post metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://peer-reject.vercel.app/blog/${post.slug}`;
  return {
    title: `${post.title} — Peer Reject`,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'Peer Reject',
      type: 'article',
      publishedTime: post.date,
      authors: ['Peer Reject'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

// ── Block renderer ─────────────────────────────────────────────────────────
function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          key={idx}
          className="text-xl sm:text-2xl font-semibold leading-snug mt-10 mb-3"
          style={{ color: 'var(--t1)', fontFamily: 'var(--font-display)' }}
        >
          {block.text}
        </h2>
      );

    case 'h3':
      return (
        <h3
          key={idx}
          className="text-base sm:text-lg font-semibold leading-snug mt-7 mb-2"
          style={{ color: 'var(--t1)' }}
        >
          {block.text}
        </h3>
      );

    case 'p':
      return (
        <p
          key={idx}
          className="text-base leading-[1.85] mb-1"
          style={{ color: 'var(--t2)' }}
        >
          {block.text}
        </p>
      );

    case 'ul':
      return (
        <ul key={idx} className="space-y-2 my-4 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: 'var(--t2)' }}>
              <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--t3)' }} />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol key={idx} className="space-y-2 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: 'var(--t2)' }}>
              <span
                className="shrink-0 text-[10px] font-mono mt-1 tabular-nums"
                style={{ color: 'var(--t3)' }}
              >
                {String(i + 1).padStart(2, '0')}.
              </span>
              {item}
            </li>
          ))}
        </ol>
      );

    case 'callout':
      return (
        <div
          key={idx}
          className="my-8 px-6 py-5 rounded-[var(--radius-card)] border-l-2"
          style={{
            background: 'var(--bg2)',
            borderColor: 'var(--t1)',
            borderLeftColor: 'var(--t1)',
          }}
        >
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--t1)' }}>
            {block.text}
          </p>
        </div>
      );

    case 'quote':
      return (
        <blockquote
          key={idx}
          className="my-8 pl-5 border-l-2 italic"
          style={{ borderColor: 'var(--border-hi)', color: 'var(--t2)' }}
        >
          <p className="text-base leading-relaxed">{block.text}</p>
        </blockquote>
      );

    default:
      return null;
  }
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const formatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const url = `https://peer-reject.vercel.app/blog/${post.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Peer Reject',
      url: 'https://peer-reject.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Peer Reject',
      url: 'https://peer-reject.vercel.app',
    },
    keywords: post.tags.join(', '),
    timeRequired: `PT${post.readTime}M`,
    image: `${url}/opengraph-image`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-[-5%] left-[20%] w-[700px] h-[400px] rounded-full opacity-[0.04] blur-[160px]"
          style={{ backgroundColor: 'var(--t1)' }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-[var(--border)]">
        <Link href="/" className="flex items-baseline gap-1 select-none">
          <span className="text-lg font-normal tracking-[0.2em] uppercase" style={{ color: 'var(--t1)' }}>
            Peer
          </span>
          <span className="text-lg font-light tracking-[0.2em] uppercase" style={{ color: 'var(--t3)' }}>
            Reject
          </span>
        </Link>
        <Link
          href="/blog"
          className="text-xs tracking-widest uppercase font-medium transition-colors"
          style={{ color: 'var(--t3)' }}
        >
          &larr; Blog
        </Link>
      </nav>

      {/* Article */}
      <article className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 pt-16 pb-24">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded"
              style={{ color: 'var(--t3)', background: 'var(--bg3)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight mb-5"
          style={{ color: 'var(--t1)', fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="flex items-center gap-4 pb-8 mb-8 border-b border-[var(--border)] text-[11px] font-mono uppercase tracking-wider"
          style={{ color: 'var(--t3)' }}
        >
          <span>{formatted}</span>
          <span style={{ color: 'var(--border-hi)' }}>·</span>
          <span>{post.readTime} min read</span>
        </div>

        {/* Content blocks */}
        <div className="space-y-1">
          {post.content.map((block, idx) => renderBlock(block, idx))}
        </div>

        {/* CTA */}
        <div
          className="mt-14 p-7 rounded-[var(--radius-card)] border border-[var(--border)]"
          style={{ background: 'var(--bg1)' }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--t3)' }}>
            Peer Reject
          </p>
          <p className="text-base font-semibold mb-2" style={{ color: 'var(--t1)' }}>
            Ready to find out what a hostile reviewer thinks of your proposal?
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--t2)' }}>
            Upload your PDF and receive a formal rejection letter, severity-ranked weaknesses,
            and numbered fixes in under 2 minutes.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-widest uppercase font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'var(--t1)',
              color: 'var(--bg)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Try Peer Reject &rarr;
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section
          className="relative z-10 border-t border-[var(--border)]"
          style={{ background: 'var(--bg1)' }}
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-12 py-14">
            <p
              className="text-[10px] font-mono uppercase tracking-[0.3em] mb-8"
              style={{ color: 'var(--t3)' }}
            >
              Related Articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="blog-card flex flex-col gap-3 p-6"
                >
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{ color: 'var(--t1)', fontFamily: 'var(--font-display)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t3)' }}>
                    {p.excerpt.slice(0, 100)}…
                  </p>
                  <span
                    className="text-[9px] font-mono uppercase tracking-widest mt-auto"
                    style={{ color: 'var(--t3)' }}
                  >
                    {p.readTime} min read &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
    </>
  );
}
