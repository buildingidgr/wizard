/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true
  },
  // Ensure that the root path is served
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index',
      },
    ]
  },
}

module.exports = nextConfig

