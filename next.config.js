/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
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
