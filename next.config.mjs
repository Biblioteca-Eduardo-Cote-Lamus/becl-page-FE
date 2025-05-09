/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'biblioteca.ufps.edu.co',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
  // Configuración para servir archivos estáticos
  async headers() {
    return [
      {
        source: '/imagenes_carnets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Configuración para servir archivos estáticos
  async rewrites() {
    return [
      {
        source: '/imagenes_carnets/:path*',
        destination: '/imagenes_carnets/:path*',
      },
    ];
  },
  // Configuración para servir archivos estáticos
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      type: 'asset/resource',
    });
    return config;
  },
  // Configuración para servir archivos estáticos en producción
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL || '',
};

export default nextConfig;
