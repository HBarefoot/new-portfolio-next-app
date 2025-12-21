import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, BlogMeta } from '@/types/blog';

const BLOG_SECRET = process.env.BLOG_API_SECRET;
const BLOG_DATA_FILENAME = 'blog-data.json';
const LOCAL_BLOG_FILE = path.join(process.cwd(), 'src/data/blog.json');
const IS_DEV = process.env.NODE_ENV === 'development';

interface BlogData {
  posts: BlogPost[];
  meta: BlogMeta;
}

const emptyBlogData: BlogData = {
  posts: [],
  meta: {
    totalPosts: 0,
    categories: [],
    tags: [],
    lastUpdated: ''
  }
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading from Blob:', error);
    return emptyBlogData;
  }
}

async function writeBlogData(data: BlogData): Promise<void> {
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function updateMeta(posts: BlogPost[]): BlogMeta {
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

// GET - Retrieve all blog posts
export async function GET() {
  const data = await readBlogData();
  return NextResponse.json(data);
}

// POST - Create a new blog post (from n8n)
export async function POST(request: NextRequest) {
  // Verify API secret
  const authHeader = request.headers.get('x-blog-secret');
  if (BLOG_SECRET && authHeader !== BLOG_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 }
      );
    }

    const data = await readBlogData();
    
    // Check for duplicate by sourceWikiPage (prevent re-blogging same wiki page)
    if (body.sourceWikiPage) {
      const existingByPath = data.posts.find(p => p.sourceWikiPage === body.sourceWikiPage);
      if (existingByPath) {
        return NextResponse.json({ 
          success: false, 
          message: 'Blog post already exists for this wiki page',
          existingSlug: existingByPath.slug,
          existingTitle: existingByPath.title
        }, { status: 409 });
      }
    }
    
    // Generate post data
    const slug = body.slug || generateSlug(body.title);
    
    // Check for duplicate slug
    const existingPost = data.posts.find(p => p.slug === slug);
    if (existingPost) {
      // Update existing post
      const updatedPost: BlogPost = {
        ...existingPost,
        title: body.title,
        excerpt: body.excerpt || existingPost.excerpt,
        content: body.content,
        coverImage: body.coverImage || existingPost.coverImage,
        tags: body.tags || existingPost.tags,
        category: body.category || existingPost.category,
        updatedAt: new Date().toISOString(),
        readingTime: calculateReadingTime(body.content),
        sourceWikiPage: body.sourceWikiPage || existingPost.sourceWikiPage,
        codeSnippets: body.codeSnippets || existingPost.codeSnippets,
        businessContext: body.businessContext || existingPost.businessContext,
        industry: body.industry || existingPost.industry
      };
      
      const postIndex = data.posts.findIndex(p => p.slug === slug);
      data.posts[postIndex] = updatedPost;
      data.meta = updateMeta(data.posts);
      
      await writeBlogData(data);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Post updated',
        post: updatedPost 
      });
    }

    // Create new post
    const newPost: BlogPost = {
      id: `post_${Date.now()}`,
      slug,
      title: body.title,
      excerpt: body.excerpt || body.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
      content: body.content,
      coverImage: body.coverImage,
      author: {
        name: body.authorName || 'Henry Barefoot',
        avatar: body.authorAvatar
      },
      tags: body.tags || [],
      category: body.category || 'Development',
      publishedAt: body.publishedAt || new Date().toISOString(),
      readingTime: calculateReadingTime(body.content),
      sourceWikiPage: body.sourceWikiPage,
      codeSnippets: body.codeSnippets || [],
      businessContext: body.businessContext,
      industry: body.industry
    };

    data.posts.unshift(newPost); // Add to beginning
    data.meta = updateMeta(data.posts);
    
    await writeBlogData(data);

    return NextResponse.json({ 
      success: true, 
      message: 'Post created',
      post: newPost 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create post', details: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Remove a blog post by slug
export async function DELETE(request: NextRequest) {
  // Verify API secret
  const authHeader = request.headers.get('x-blog-secret');
  if (BLOG_SECRET && authHeader !== BLOG_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const data = await readBlogData();
    const postIndex = data.posts.findIndex(p => p.slug === slug);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    data.posts.splice(postIndex, 1);
    data.meta = updateMeta(data.posts);
    
    await writeBlogData(data);

    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted'
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to delete post', details: errorMessage },
      { status: 500 }
    );
  }
}
