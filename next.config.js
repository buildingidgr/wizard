/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ensure node_modules are included in the build
    config.resolve.modules.push('node_modules');
    return config;
  },
}

module.exports = nextConfig

