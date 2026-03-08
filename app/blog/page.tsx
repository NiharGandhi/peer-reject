import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Grant Writing Blog — Peer Reject',
  description:
    'Practical guides on grant writing, peer review, methodology, and research funding. Learn what reviewers look for and how to fix common grant proposal mistakes.',
  alternates: { canonical: 'https://peer-reject.vercel.app/blog' },
  openGraph: {
    title: 'Grant Writing Blog — Peer Reject',
    description:
      'Practical guides on grant writing, peer review, methodology, and research funding.',
    url: 'https://peer-reject.vercel.app/blog',
    siteName: 'Peer Reject',
    type: 'website',
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogListPage() {
  const posts = getAllPosts();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Grant Writing Blog — Peer Reject',
    description:
      'Practical guides on grant writing, peer review, methodology, and research funding.',
    url: 'https://peer-reject.vercel.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Peer Reject',
      url: 'https://peer-reject.vercel.app',
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `https://peer-reject.vercel.app/blog/${p.slug}`,
      datePublished: p.date,
      keywords: p.tags.join(', '),
      timeRequired: `PT${p.readTime}M`,
    })),
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
          className="absolute top-[-5%] left-[20%] w-[700px] h-[400px] rounded-full opacity-[0.05] blur-[160px]"
          style={{ backgroundColor: 'var(--t1)' }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[120px]"
          style={{ backgroundColor: 'var(--cr)' }}
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
          href="/"
          className="text-xs tracking-widest uppercase font-medium transition-colors"
          style={{ color: 'var(--t3)' }}
        >
          Try the Tool &rarr;
        </Link>
      </nav>

      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-20 pb-14">
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] mb-5" style={{ color: 'var(--t3)' }}>
          Resources
        </p>
        <h1
          className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-5"
          style={{ color: 'var(--t1)', fontFamily: 'var(--font-display)' }}
        >
          Grant Writing &amp; Research Blog
        </h1>
        <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--t2)' }}>
          Practical guides on writing fundable proposals, surviving peer review,
          and fixing the mistakes that lead to rejection.
        </p>
      </section>

      {/* Post grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'var(--border)' }}>
          {posts.map((post, i) => {
            const tagColors = ['var(--gold)', 'var(--teal)', 'var(--cr)'];
            const tagColor = tagColors[i % tagColors.length];
            return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group flex flex-col gap-4 p-7"
              style={{ background: 'var(--bg1)' }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded"
                    style={{
                      color: tagColor,
                      background: 'var(--bg3)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2
                className="text-base font-semibold leading-snug transition-colors duration-200"
                style={{ color: 'var(--t1)', fontFamily: 'var(--font-display)' }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--t3)' }}>
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--t3)' }}>
                  {formatDate(post.date)}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--t3)' }}>
                  {post.readTime} min read
                </span>
              </div>
            </Link>
          );
          })}
        </div>
      </section>

      {/* CTA strip */}
      <section
        className="relative z-10 border-t border-[var(--border)]"
        style={{ background: 'var(--bg1)' }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-base font-semibold mb-1" style={{ color: 'var(--t1)' }}>
              Ready to stress-test your proposal?
            </p>
            <p className="text-sm" style={{ color: 'var(--t2)' }}>
              Get a hostile AI review in under 2 minutes — before the real committee sees it.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-widest uppercase font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'var(--t1)',
              color: 'var(--bg)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Try Peer Reject &rarr;
          </Link>
        </div>
      </section>

    </main>
    </>
  );
}
