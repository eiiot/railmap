/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  pwa: {
    dest: 'public',
  },
  async redirects() {
    return [
      {
        source: '/next',
        destination: '/',
        permanent: true,
      },
    ]
  },
})
