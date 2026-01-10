import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow the site to be embedded in iframes from Strapi admin panel
  // This is required for the Preview feature to work
  const cmsUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  
  // Set Content Security Policy
  // - frame-ancestors: Allow embedding from Strapi for preview
  // - script-src: Allow GTM, GA, Meta Pixel, Cloudflare, Vercel analytics
  // - img-src: Allow tracking pixels
  // - connect-src: Allow Strapi CMS API, analytics, and tracking endpoints
  response.headers.set(
    'Content-Security-Policy',
    `frame-ancestors 'self' ${cmsUrl} https://cms.henrybarefoot.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://cdn.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://va.vercel-scripts.com https://connect.facebook.net; ` +
    `img-src 'self' data: blob: https: http://localhost:1337; ` +
    `connect-src 'self' ${cmsUrl} https://cms.henrybarefoot.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.vercel-insights.com https://www.facebook.com https://connect.facebook.net;`
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};
