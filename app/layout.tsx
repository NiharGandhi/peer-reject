import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const APP_URL = 'https://peer-reject.vercel.app';

export const metadata: Metadata = {
  title: 'Peer Reject — AI Grant Review Simulator',
  description:
    'Upload your research proposal and get a hostile AI review — rejection letter, severity-ranked weaknesses, and actionable fixes — in under 2 minutes. Powered by K2 Think V2.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Peer Reject — AI Grant Review Simulator',
    description:
      'Simulate an adversarial grant review panel. Get a formal rejection letter, ranked weaknesses (Fatal / Major / Minor), numbered fixes, and a revised abstract — before the real committee sees your work.',
    url: APP_URL,
    siteName: 'Peer Reject',
    type: 'website',
    images: [
      {
        url: `${APP_URL}/landing.png`,
        width: 1200,
        height: 630,
        alt: 'Peer Reject — AI Grant Review Simulator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peer Reject — AI Grant Review Simulator',
    description:
      'Upload your proposal. Get a hostile AI review in under 2 minutes — rejection letter, ranked weaknesses, and actionable fixes.',
    images: [`${APP_URL}/landing.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: APP_URL,
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Peer Reject',
  description:
    'AI-powered grant rejection simulator. Adversarial multi-agent review of research proposals using K2 Think V2 — produces a formal rejection letter, severity-ranked weakness report, actionable fixes, and a revised abstract.',
  url: APP_URL,
  applicationCategory: 'ResearchApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'MBZUAI / IFM Research Institute',
    url: 'https://mbzuai.ac.ae',
  },
  featureList: [
    'Parallel adversarial AI grant review simulation',
    'Severity-ranked weakness report (Fatal, Major, Minor)',
    'Numbered actionable fix recommendations',
    'Revised abstract generation',
    'Real-time streaming review output',
    'Document-aware agent panel selection',
  ],
  keywords:
    'grant review simulator, AI peer review, grant proposal feedback, academic AI tool, K2 Think V2, adversarial review, research proposal checker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans`}
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
