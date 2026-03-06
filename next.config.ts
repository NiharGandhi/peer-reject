import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Prevent Next.js/Turbopack from bundling pdf-parse — load it at runtime
  // from node_modules to avoid its test-file side-effects at build time.
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;
