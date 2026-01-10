import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow the site to be embedded in iframes from Strapi admin panel
  // This is required for the Preview feature to work
  const cmsUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  
  // Set Content Security Policy
  // - frame-ancestors: Allow embedding from Strapi for preview
  // - script-src: Allow GTM, GA, Cloudflare, Vercel analytics
  // - img-src: Allow GTM/GA tracking pixels
  // - connect-src: Allow GTM/GA data collection
  response.headers.set(
    'Content-Security-Policy',
    `frame-ancestors 'self' ${cmsUrl} https://cms.henrybarefoot.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://cdn.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://va.vercel-scripts.com; ` +
    `img-src 'self' data: blob: https: http://localhost:1337; ` +
    `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.vercel-insights.com;`
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};
