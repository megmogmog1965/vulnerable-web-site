/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: '',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vulnerable-web-site.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
  publicRuntimeConfig: {
    remoteHosts: [
      'localhost:3000',
      '127.0.0.1:3000',
      'vulnerable-web-site.vercel.app',
    ],
  },
}

module.exports = nextConfig
