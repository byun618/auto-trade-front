/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
  },
  swcMinify: true,
  // images: {
  //   domains: ['d5heyd26xkg7n.cloudfront.net'],
  // },
}

module.exports = nextConfig
