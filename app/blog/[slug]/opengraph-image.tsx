import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? 'Peer Reject Blog';
  const tags = post?.tags ?? [];
  const readTime = post?.readTime ?? 5;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '200px',
            width: '600px',
            height: '400px',
            borderRadius: '9999px',
            background: 'rgba(244,244,245,0.06)',
            filter: 'blur(120px)',
          }}
        />

        {/* Top: wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', position: 'relative' }}>
          <span style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f4f4f5' }}>
            PEER
          </span>
          <span style={{ fontSize: '18px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#71717a' }}>
            REJECT
          </span>
          <span style={{ marginLeft: '16px', fontSize: '11px', color: '#3f3f46', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Grant Writing Blog
          </span>
        </div>

        {/* Middle: title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', flex: 1, justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#71717a',
                  background: '#1c1c21',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? '38px' : '46px',
              fontWeight: 600,
              color: '#f4f4f5',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: meta + divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '12px', color: '#52525b', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              peer-reject.vercel.app
            </span>
            <span style={{ fontSize: '12px', color: '#3f3f46' }}>·</span>
            <span style={{ fontSize: '12px', color: '#52525b', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {readTime} min read
            </span>
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#09090b',
              background: '#f4f4f5',
              padding: '8px 20px',
              borderRadius: '9999px',
            }}
          >
            Read Article →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
