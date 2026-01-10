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
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ],
    // Optimize images for faster loading
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true, // Minimize CSS
  },
};

export default nextConfig;
