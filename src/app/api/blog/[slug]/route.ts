import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { BlogPost, BlogMeta } from '@/types/blog';

const BLOG_DATA_FILENAME = 'blog-data.json';

interface BlogData {
  posts: BlogPost[];
  meta: BlogMeta;
}

async function readBlogData(): Promise<BlogData> {
  try {
    const { blobs } = await list({ prefix: BLOG_DATA_FILENAME });
    
    if (blobs.length === 0) {
      return {
        posts: [],
        meta: { totalPosts: 0, categories: [], tags: [], lastUpdated: '' }
      };
    }

    const response = await fetch(blobs[0].url);
    return await response.json();
  } catch (error) {
    console.error('Error reading from Blob:', error);
    return {
      posts: [],
      meta: { totalPosts: 0, categories: [], tags: [], lastUpdated: '' }
    };
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
