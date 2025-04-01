/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // This is important for Docker deployment
  experimental: {
    outputFileTracingRoot: './',
  },
};

export default nextConfig;

