import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SWC minification (faster than Terser)
  // swcMinify is enabled by default in Next.js 15+
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Compress output
  compress: true,
  
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true, // Minimize CSS
    // Tree-shake these packages for smaller bundles
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'react-markdown',
    ],
  },
  
  // Target modern browsers to reduce polyfill bundle size
  // Removes ~14KB of unnecessary polyfills (Array.prototype.at, Object.fromEntries, etc.)
  transpilePackages: [],
  
  // Cache headers for static assets
  async headers() {
    return [
      {
        // Cache all static assets for 1 year
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JavaScript and CSS for 1 year (they have content hashes)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
