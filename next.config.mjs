/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
        pathname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
