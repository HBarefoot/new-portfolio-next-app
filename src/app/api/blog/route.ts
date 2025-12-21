import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { BlogPost, BlogMeta } from '@/types/blog';

const BLOG_SECRET = process.env.BLOG_API_SECRET;
const BLOG_POSTS_KEY = 'blog:posts';
const BLOG_META_KEY = 'blog:meta';

interface BlogData {
  posts: BlogPost[];
  meta: BlogMeta;
}

async function readBlogData(): Promise<BlogData> {
  try {
    const posts = await kv.get<BlogPost[]>(BLOG_POSTS_KEY) || [];
    const meta = await kv.get<BlogMeta>(BLOG_META_KEY) || {
      totalPosts: 0,
      categories: [],
      tags: [],
      lastUpdated: ''
    };
    return { posts, meta };
  } catch (error) {
    console.error('Error reading from KV:', error);
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

async function writeBlogData(data: BlogData): Promise<void> {
  await kv.set(BLOG_POSTS_KEY, data.posts);
  await kv.set(BLOG_META_KEY, data.meta);
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
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
