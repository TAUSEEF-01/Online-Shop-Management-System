/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.istockphoto.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
