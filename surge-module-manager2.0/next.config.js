/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 添加输出配置
  output: 'standalone',
  // 添加基础路径配置
  basePath: '',
  // 添加重写规则
  async rewrites() {
    return {
      beforeFiles: [
        // API 路由重写
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
        {
          source: '/api/github/:path*',
          destination: '/api/github/:path*',
        }
      ]
    }
  },
  // 添加头部配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
