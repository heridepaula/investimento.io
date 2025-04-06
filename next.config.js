module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map'
    }
    return config
  },
  async headers() {
    const isLocal = process.env.NODE_ENV === 'development'
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: isLocal ? 'no-store' : 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
