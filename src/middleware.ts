import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow the site to be embedded in iframes from Strapi admin panel
  // This is required for the Preview feature to work
  const cmsUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  
  // Set frame-ancestors CSP directive to allow embedding from Strapi
  // Note: We only set frame-ancestors, not script-src, to avoid conflicts with Cloudflare
  response.headers.set(
    'Content-Security-Policy',
    `frame-ancestors 'self' ${cmsUrl} https://cms.henrybarefoot.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://cdn.vercel-insights.com;`
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};
