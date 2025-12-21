import { MetadataRoute } from 'next';

const BASE_URL = 'https://next.henrybarefoot.com';

interface BlogPost {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}

interface BlogData {
  posts: BlogPost[];
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/blog`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) return [];
    const data: BlogData = await response.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  const posts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
