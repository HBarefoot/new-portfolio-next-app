import { MetadataRoute } from 'next';
import { getBlogPosts, getCaseStudies, getLandingPages } from '@/lib/strapi-api';

const BASE_URL = 'https://next.henrybarefoot.com';
const LOCALES = ['en', 'es'] as const;
const DEFAULT_LOCALE = 'en';

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

  // Dynamic blog posts for each locale
  for (const locale of LOCALES) {
    const posts = await getBlogPosts({ locale });
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
  for (const locale of LOCALES) {
    const caseStudies = await getCaseStudies({ locale });
    for (const study of caseStudies) {
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
  for (const locale of LOCALES) {
    const landingPages = await getLandingPages(locale);
    for (const page of landingPages) {
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
