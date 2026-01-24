import { MetadataRoute } from 'next';
import { readBlogData } from '@/lib/blog';

export const revalidate = 3600;

const BASE_URL = 'https://next.henrybarefoot.com';

interface BlogPost {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}

interface CaseStudy {
  slug: string;
  updatedAt?: string;
}

interface LandingPage {
  slug: string;
  updatedAt?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await readBlogData();
    return data.posts || [];
  } catch {
    return [];
  }
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
    const response = await fetch(`${strapiUrl}/case-studies?fields[0]=slug&fields[1]=updatedAt`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getLandingPages(): Promise<LandingPage[]> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
    const response = await fetch(`${strapiUrl}/landing-pages?fields[0]=slug&fields[1]=updatedAt&filters[isActive][$eq]=true`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPaths = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/case-studies', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  for (const page of staticPaths) {
    sitemapEntries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Fetch all dynamic content concurrently
  const [blogPosts, caseStudies, landingPages] = await Promise.all([
    getBlogPosts(),
    getCaseStudies(),
    getLandingPages()
  ]);

  // Dynamic blog posts
  for (const post of blogPosts) {
    sitemapEntries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Dynamic case studies
  for (const study of caseStudies) {
    sitemapEntries.push({
      url: `${BASE_URL}/case-studies/${study.slug}`,
      lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Dynamic landing pages
  for (const page of landingPages) {
    sitemapEntries.push({
      url: `${BASE_URL}/lp/${page.slug}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return sitemapEntries;
}
