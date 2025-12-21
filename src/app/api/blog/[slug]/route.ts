import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, BlogMeta } from '@/types/blog';

const BLOG_FILE_PATH = path.join(process.cwd(), 'src/data/blog.json');

interface BlogData {
  posts: BlogPost[];
  meta: BlogMeta;
}

async function readBlogData(): Promise<BlogData> {
  try {
    const data = await fs.readFile(BLOG_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      posts: [],
      meta: {
        totalPosts: 0,
        categories: [],
        tags: [],
        lastUpdated: ''
      }
    };
  }
}

// GET - Retrieve a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = await readBlogData();
  const post = data.posts.find(p => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
