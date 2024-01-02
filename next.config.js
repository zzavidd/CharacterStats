/** @type {import('next').NextConfig} */
const nextConfig = {
  'eslint': {
    'ignoreDuringBuilds': true
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    'ignoreBuildErrors':  true
  }
};

module.exports = nextConfig;
