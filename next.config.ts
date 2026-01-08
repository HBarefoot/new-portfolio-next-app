import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next/Image to load remote images from the Strapi instance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.henrybarefoot.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'postgres.railway.internal',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
