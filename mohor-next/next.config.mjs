/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  async rewrites() {
    // The legacy static pages link to "index.html"; serve the Next.js home page instead.
    return [{ source: '/index.html', destination: '/' }];
  },
};

export default nextConfig;
