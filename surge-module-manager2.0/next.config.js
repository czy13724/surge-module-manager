/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // 确保 API 路由正确处理
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
        {
          source: '/api/github/:path*',
          destination: '/api/github/:path*',
        },
      ],
    }
  },
}
