import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en';
export type Locale = typeof locales[number];

// Check if pathname starts with a locale
function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  if (locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale handling for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // Static files with extensions
  ) {
    const response = NextResponse.next();
    setSecurityHeaders(response, request);
    return response;
  }

  // Check if there's a locale in the pathname
  const pathnameLocale = getLocaleFromPathname(pathname);

  // If locale is the default (en), redirect to remove it from URL
  // e.g., /en/blog -> /blog (cleaner URLs for default locale)
  if (pathnameLocale === defaultLocale) {
    const newPathname = pathname.replace(`/${defaultLocale}`, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // If no locale in pathname, it's the default locale (en)
  // No redirect needed - just continue
  const response = NextResponse.next();

  // Set the locale header so pages can read it
  const locale = pathnameLocale || defaultLocale;
  response.headers.set('x-locale', locale);

  setSecurityHeaders(response, request);
  return response;
}

function setSecurityHeaders(response: NextResponse, request: NextRequest) {
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
    `frame-ancestors 'self' ${cmsUrl} https://cms.henrybarefoot.com https://vercel.live https://vercel.com; ` +
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://cdn.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://va.vercel-scripts.com https://connect.facebook.net https://vercel.live https://vercel.com https://snap.licdn.com; ` +
    `img-src 'self' data: blob: https: http://localhost:1337; ` +
    `connect-src 'self' ${cmsUrl} https://cms.henrybarefoot.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.vercel-insights.com https://www.facebook.com https://connect.facebook.net http://localhost:8000 https://performance-service-production.up.railway.app https://vercel.live https://vercel.com wss://ws-us3.pusher.com https://www.googletagmanager.com https://px.ads.linkedin.com;`
  );
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
