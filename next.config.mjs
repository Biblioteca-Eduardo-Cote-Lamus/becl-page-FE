/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    domains: ['biblioteca.ufps.edu.co'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
