import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// EEA + UK — visitors here get the opt-in (consent-required) banner model.
// Add CH/BR/etc. later if those regions should also be treated as opt-in.
const EEA_UK = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', // EU
  'IS', 'LI', 'NO', // EEA
  'GB', // UK
]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  setSecurityHeaders(response, request);
  setRegionCookie(response, request);
  return response;
}

// Classify the visitor by Cloudflare's CF-IPCountry header and expose a readable
// (non-HttpOnly) cookie the consent banner reads to choose opt-in vs opt-out UX.
// This only drives banner wording — the legally-critical consent default is
// enforced by Google Consent Mode's own geo-detection in the layout.
function setRegionCookie(response: NextResponse, request: NextRequest) {
  const country = request.headers.get('cf-ipcountry')?.toUpperCase() ?? 'US';
  const region = EEA_UK.has(country) ? 'eu' : 'us';
  response.cookies.set('bf_region', region, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });
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
  //
  // Each directive is built from a list and de-duplicated so that ${cmsUrl}
  // (which resolves to the CMS origin in production) does not produce repeated
  // entries alongside the hardcoded production CMS host.
  const directive = (name: string, sources: string[]) =>
    `${name} ${Array.from(new Set(sources)).join(' ')}`;

  const csp = [
    directive('frame-ancestors', [
      "'self'",
      cmsUrl,
      'https://cms.henrybarefoot.com',
      'https://vercel.live',
      'https://vercel.com',
    ]),
    directive('script-src', [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://static.cloudflareinsights.com',
      'https://cdn.vercel-insights.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://ssl.google-analytics.com',
      'https://tagmanager.google.com',
      'https://va.vercel-scripts.com',
      'https://connect.facebook.net',
      'https://vercel.live',
      'https://vercel.com',
      'https://snap.licdn.com',
    ]),
    directive('img-src', ["'self'", 'data:', 'blob:', 'https:', 'http://localhost:1337']),
    directive('connect-src', [
      "'self'",
      cmsUrl,
      'https://cms.henrybarefoot.com',
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://region1.google-analytics.com',
      'https://www.google.com',
      'https://*.vercel-insights.com',
      'https://www.facebook.com',
      'https://connect.facebook.net',
      'http://localhost:8000',
      'https://performance-service-production.up.railway.app',
      'https://vercel.live',
      'https://vercel.com',
      'wss://ws-us3.pusher.com',
      'https://www.googletagmanager.com',
      'https://px.ads.linkedin.com',
    ]),
  ].join('; ');

  response.headers.set('Content-Security-Policy', `${csp};`);
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
