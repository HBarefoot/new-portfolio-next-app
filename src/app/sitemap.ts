import { MetadataRoute } from 'next';

const BASE_URL = 'https://next.henrybarefoot.com';
const LOCALES = ['en', 'es'] as const;
const DEFAULT_LOCALE = 'en';

interface BlogPost {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  locale?: string;
}

interface CaseStudy {
  slug: string;
  updatedAt?: string;
  locale?: string;
}

interface LandingPage {
  slug: string;
  updatedAt?: string;
  locale?: string;
}

interface BlogData {
  posts: BlogPost[];
}

async function getBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/blog?locale=${locale}`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data: BlogData = await response.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

async function getCaseStudies(locale: string = 'en'): Promise<CaseStudy[]> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
    const response = await fetch(`${strapiUrl}/case-studies?locale=${locale}&fields[0]=slug&fields[1]=updatedAt`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getLandingPages(locale: string = 'en'): Promise<LandingPage[]> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
    const response = await fetch(`${strapiUrl}/landing-pages?locale=${locale}&fields[0]=slug&fields[1]=updatedAt&filters[isActive][$eq]=true`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

function getLocalizedUrl(path: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${locale}${path}`;
}

function createAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = getLocalizedUrl(path, locale);
  }
  return alternates;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages with alternates for each locale
  const staticPaths = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/case-studies', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  for (const page of staticPaths) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: getLocalizedUrl(page.path, locale),
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: createAlternates(page.path),
        },
      });
    }
  }

  // Fetch all dynamic content concurrently
  const [blogPostsByLocale, caseStudiesByLocale, landingPagesByLocale] = await Promise.all([
    Promise.all(LOCALES.map(async (locale) => ({ locale, posts: await getBlogPosts(locale) }))),
    Promise.all(LOCALES.map(async (locale) => ({ locale, studies: await getCaseStudies(locale) }))),
    Promise.all(LOCALES.map(async (locale) => ({ locale, pages: await getLandingPages(locale) })))
  ]);

  // Dynamic blog posts for each locale
  for (const { locale, posts } of blogPostsByLocale) {
    for (const post of posts) {
      sitemapEntries.push({
        url: getLocalizedUrl(`/blog/${post.slug}`, locale),
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: createAlternates(`/blog/${post.slug}`),
        },
      });
    }
  }

  // Dynamic case studies for each locale
  for (const { locale, studies } of caseStudiesByLocale) {
    for (const study of studies) {
      sitemapEntries.push({
        url: getLocalizedUrl(`/case-studies/${study.slug}`, locale),
        lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: createAlternates(`/case-studies/${study.slug}`),
        },
      });
    }
  }

  // Dynamic landing pages for each locale
  for (const { locale, pages } of landingPagesByLocale) {
    for (const page of pages) {
      sitemapEntries.push({
        url: getLocalizedUrl(`/lp/${page.slug}`, locale),
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: createAlternates(`/lp/${page.slug}`),
        },
      });
    }
  }

  return sitemapEntries;
}
