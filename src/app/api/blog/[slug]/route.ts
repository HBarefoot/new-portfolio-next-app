import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { BlogPost } from '@/types/blog';

const BLOG_POSTS_KEY = 'blog:posts';

// GET - Retrieve a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const posts = await kv.get<BlogPost[]>(BLOG_POSTS_KEY) || [];
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
