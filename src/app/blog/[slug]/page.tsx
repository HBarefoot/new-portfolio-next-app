'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, User, ExternalLink, Copy, Check, Briefcase } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '@/types/blog';
import { getBlogPost } from '@/lib/strapi-api';
import type { StrapiBlogPost, StrapiEntity } from '@/types/strapi';

// Custom components for ReactMarkdown with professional styling
const MarkdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-bold text-white mt-12 mb-6 pb-4 border-b border-slate-700/50 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-slate-100 mt-10 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-lg font-semibold text-slate-200 mt-8 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-slate-300 text-[17px] leading-[1.8] mb-6">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-6 ml-6 space-y-3">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-6 ml-6 space-y-3 list-decimal">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-slate-300 text-[17px] leading-[1.8] pl-2 relative before:content-['•'] before:absolute before:-left-4 before:text-blue-400 before:font-bold">
      {children}
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-white">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-slate-200">
      {children}
    </em>
  ),
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-slate-800 px-2 py-1 rounded-md text-blue-400 text-sm font-mono border border-slate-700/50">
          {children}
        </code>
      );
    }
    return (
      <code className="text-slate-300 text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-slate-800/90 border border-slate-700/50 rounded-xl my-8 p-5 overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 bg-slate-800/30 py-4 px-6 rounded-r-xl my-8 italic text-slate-300">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-slate-700/50 my-12" />
  ),
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await getBlogPost(slug);
      const strapiPosts = response.data.data as StrapiEntity<StrapiBlogPost>[];
      
      if (strapiPosts && strapiPosts.length > 0) {
        const entity = strapiPosts[0];
        const strapiPost = entity.attributes;
        
        // Safe access to nested relations with explicit undefined checks
        const authorData = strapiPost.author && strapiPost.author.data ? strapiPost.author.data.attributes : null;
        const categoryData = strapiPost.category && strapiPost.category.data ? strapiPost.category.data.attributes : null;
        const coverImageData = strapiPost.coverImage && strapiPost.coverImage.data ? strapiPost.coverImage.data.attributes : null;
        
        // Transform to BlogPost format
        const transformedPost: BlogPost = {
          id: entity.id.toString(),
          slug: strapiPost.slug,
          title: strapiPost.title,
          excerpt: strapiPost.excerpt,
          content: strapiPost.content,
          coverImage: coverImageData?.url,
          author: {
            name: authorData?.name || 'Henry Barefoot',
            avatar: authorData?.avatar?.data?.attributes?.url
          },
          tags: Array.isArray(strapiPost.tags) ? strapiPost.tags : [],
          category: categoryData?.name || 'Development',
          publishedAt: strapiPost.publishedAt,
          updatedAt: strapiPost.updatedAt,
          readingTime: strapiPost.readingTime || 5,
          sourceWikiPage: strapiPost.sourceWikiPage,
          codeSnippets: strapiPost.codeSnippets || [],
          businessContext: strapiPost.businessContext,
          industry: strapiPost.industry
        };
        
        setPost(transformedPost);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const copyCode = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Post Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full">
              {post.category}
            </span>
            {post.industry && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                {post.industry}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        {post.coverImage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="aspect-video bg-slate-800 rounded-xl overflow-hidden mb-8"
          >
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Business Context */}
        {post.businessContext && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Business Context
            </h3>
            <p className="text-slate-300">{post.businessContext}</p>
          </motion.div>
        )}

        {/* Post Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Code Snippets */}
        {post.codeSnippets && post.codeSnippets.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
            <div className="space-y-6">
              {post.codeSnippets.map((snippet, index) => (
                <div key={index} className="bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700/50">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-slate-400">{snippet.language}</span>
                      {snippet.filename && (
                        <span className="text-sm text-slate-500">• {snippet.filename}</span>
                      )}
                    </div>
                    <button
                      onClick={() => copyCode(snippet.code, index)}
                      className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  {snippet.description && (
                    <div className="px-4 py-2 text-sm text-slate-400 bg-slate-900/30 border-b border-slate-700/50">
                      {snippet.description}
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-slate-300">{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-400"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-slate-700/50"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
