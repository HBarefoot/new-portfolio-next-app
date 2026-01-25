import { put, list } from '@vercel/blob';
import { unstable_cache } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, BlogMeta } from '@/types/blog';

const BLOG_DATA_FILENAME = 'blog-data.json';
const LOCAL_BLOG_FILE = path.join(process.cwd(), 'src/data/blog.json');
const IS_DEV = process.env.NODE_ENV === 'development';

export interface BlogData {
  posts: BlogPost[];
  meta: BlogMeta;
}

export const emptyBlogData: BlogData = {
  posts: [],
  meta: {
    totalPosts: 0,
    categories: [],
    tags: [],
    lastUpdated: ''
  }
};

export interface BlogDependencies {
  listBlob?: typeof list;
  fetchFn?: typeof fetch;
}

export async function fetchRawBlogData(deps: BlogDependencies = {}): Promise<BlogData> {
  const listBlob = deps.listBlob || list;
  const fetchFn = deps.fetchFn || fetch;

  try {
    const { blobs } = await listBlob({ prefix: BLOG_DATA_FILENAME });

    if (blobs.length === 0) {
      return emptyBlogData;
    }

    const response = await fetchFn(blobs[0].url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading from Blob:', error);
    return emptyBlogData;
  }
}

const getCachedBlogData = unstable_cache(
  async () => fetchRawBlogData(),
  ['blog-data'],
  { revalidate: 60 }
);

export async function readBlogData(deps?: BlogDependencies): Promise<BlogData> {
  // Use local filesystem in development
  if (IS_DEV) {
    try {
      const data = await fs.readFile(LOCAL_BLOG_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return emptyBlogData;
    }
  }

  // Use Vercel Blob in production
  if (deps) {
    return fetchRawBlogData(deps);
  }

  return getCachedBlogData();
}

export async function writeBlogData(data: BlogData): Promise<void> {
  // Use local filesystem in development
  if (IS_DEV) {
    await fs.mkdir(path.dirname(LOCAL_BLOG_FILE), { recursive: true });
    await fs.writeFile(LOCAL_BLOG_FILE, JSON.stringify(data, null, 2));
    return;
  }

  // Use Vercel Blob in production
  await put(BLOG_DATA_FILENAME, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function updateMeta(posts: BlogPost[]): BlogMeta {
  const categories: Record<string, number> = {};
  const tags = new Set<string>();

  posts.forEach(post => {
    categories[post.category] = (categories[post.category] || 0) + 1;
    post.tags.forEach(tag => tags.add(tag));
  });

  return {
    totalPosts: posts.length,
    categories: Object.entries(categories).map(([name, count]) => ({
      name,
      slug: generateSlug(name),
      description: '',
      count
    })),
    tags: Array.from(tags),
    lastUpdated: new Date().toISOString()
  };
}
