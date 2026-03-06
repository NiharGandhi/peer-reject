import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Prevents Next.js/Turbopack from bundling pdf-parse and its canvas dep,
  // which reference DOM globals (DOMMatrix) unavailable in the Node.js runtime.
  serverExternalPackages: ['pdf-parse', 'canvas'],
};

export default nextConfig;
