const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') || [];

/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: isProd ? `https://${owner}.github.io/${repo}` : undefined,
  basePath: isProd ? `/${repo}` : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: isProd ? 'export' : undefined,
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};
