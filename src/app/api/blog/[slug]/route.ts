import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, BlogMeta } from '@/types/blog';

const BLOG_DATA_FILENAME = 'blog-data.json';
const LOCAL_BLOG_FILE = path.join(process.cwd(), 'src/data/blog.json');
const IS_DEV = process.env.NODE_ENV === 'development';

interface BlogData {
  posts: BlogPost[];
  meta: BlogMeta;
}

const emptyBlogData: BlogData = {
  posts: [],
  meta: { totalPosts: 0, categories: [], tags: [], lastUpdated: '' }
};

async function readBlogData(): Promise<BlogData> {
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
  try {
    const { blobs } = await list({ prefix: BLOG_DATA_FILENAME });
    
    if (blobs.length === 0) {
      return emptyBlogData;
    }

    const response = await fetch(blobs[0].url);
    return await response.json();
  } catch (error) {
    console.error('Error reading from Blob:', error);
    return emptyBlogData;
  }
}

// GET - Retrieve a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const data = await readBlogData();
    const post = data.posts.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
