const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure for monorepo if needed
  transpilePackages: ['@monorepo/utils'],
  // Enable standalone output for Docker
  output: 'standalone',
  // Configure experimental features if needed
  experimental: {
    // Optimize for serverless environments
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
}

module.exports = nextConfig
