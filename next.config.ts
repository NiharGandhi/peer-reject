import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Prevents Next.js from bundling pdf-parse, avoiding its test-file side-effects
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;
