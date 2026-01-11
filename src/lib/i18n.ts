// Internationalization configuration and utilities

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en';

export type Locale = typeof locales[number];

// Locale display names
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

// Locale flags (emoji)
export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};

// Check if a locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];
  
  if (isValidLocale(potentialLocale) && potentialLocale !== defaultLocale) {
    return potentialLocale;
  }
  
  return defaultLocale;
}

// Remove locale prefix from pathname
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale !== defaultLocale) {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname;
}

// Add locale prefix to pathname (only for non-default locales)
export function localizePathname(pathname: string, locale: Locale): string {
  // Remove any existing locale prefix first
  const cleanPath = removeLocaleFromPathname(pathname);
  
  // Don't add prefix for default locale
  if (locale === defaultLocale) {
    return cleanPath;
  }
  
  // Add locale prefix
  return `/${locale}${cleanPath}`;
}

// Get alternate URLs for hreflang tags (SEO)
export function getAlternateUrls(pathname: string, baseUrl: string): Record<Locale, string> {
  const cleanPath = removeLocaleFromPathname(pathname);
  
  return {
    en: `${baseUrl}${cleanPath}`,
    es: `${baseUrl}/es${cleanPath}`,
  };
}
