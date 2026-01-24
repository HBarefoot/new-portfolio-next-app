'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Briefcase, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '@/types/blog';
import { getBlogPost } from '@/lib/strapi-api';
import { getStrapiMediaUrl, StrapiImage, StrapiEntity } from '@/types/strapi';
import ShareButtons from '@/components/ShareButtons';
// Translations for the blog post page
const translations = {
  en: {
    loading: 'Loading...',
    notFoundTitle: 'Post Not Found',
    notFoundMessage: "The blog post you're looking for doesn't exist.",
    backToBlog: 'Back to Blog',
    businessContext: 'Business Context',
    codeExamples: 'Code Examples',
    copy: 'Copy',
    copied: 'Copied!',
    shareArticle: 'Share this article',
    backToAllPosts: 'Back to all posts',
    minRead: 'min read',
  }
};

// Custom components for ReactMarkdown with professional styling
const MarkdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-bold text-foreground mt-12 mb-6 pb-4 border-b border-border first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-foreground mt-12 mb-5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-foreground/90 mt-10 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-lg font-semibold text-foreground/80 mt-8 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-foreground/90 text-[17px] leading-[1.8] mb-6">
      {children}
    </p>
  ),
  img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { src, alt } = props;
    if (!src || typeof src !== 'string') return null;
    return (
      <div className="relative w-full my-8 rounded-xl overflow-hidden shadow-lg border border-border">
        <Image
          src={src}
          alt={alt || ''}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    );
  },
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
    <li className="text-foreground/90 text-[17px] leading-[1.8] pl-2 relative before:content-['•'] before:absolute before:-left-4 before:text-primary before:font-bold">
      {children}
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-foreground/80">
      {children}
    </em>
  ),
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-muted px-2 py-1 rounded-md text-primary text-sm font-mono border border-border">
          {children}
        </code>
      );
    }
    return (
      <code className="text-foreground/90 text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-muted border border-border rounded-xl my-8 p-5 overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary bg-secondary/50 py-4 px-6 rounded-r-xl my-8 italic text-foreground/80">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-primary hover:underline transition-colors decoration-primary/30 underline-offset-4">
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-gray-200 dark:border-gray-700/50 my-12" />
  ),
};

interface BlogPostContentProps {
  slug: string;
  locale: string;
}

export default function BlogPostContent({ slug, locale }: BlogPostContentProps) {
  const t = translations.en;
  const blogPath = '/blog';

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Construct the canonical blog post URL for sharing,
    // using origin + localized blog path + slug so it's correct
    // regardless of how the page was accessed.
    const localizedBlogPath = '/blog';
    const fullUrl = `${window.location.origin}${localizedBlogPath}/${slug}`;
    setShareUrl(fullUrl);
  }, [locale, slug]);

  useEffect(() => {
    fetchPost();
  }, [slug, locale]);

  const fetchPost = async () => {
    try {
      const strapiPosts = await getBlogPost(slug, locale);

      if (strapiPosts && strapiPosts.length > 0) {
        const strapiPost = strapiPosts[0];

        // Strapi v5 uses flat structure - no attributes wrapper
        // But types in StrapiBlogPost use union types for flexibility
        // We need to cast or check type to access properties safely

        const authorData = strapiPost?.author as any;
        const categoryData = strapiPost?.category as any;
        const coverImageData = strapiPost?.coverImage as any;

        const coverUrl = coverImageData?.url || coverImageData?.data?.attributes?.url || null;
        const avatarUrl = authorData?.avatar?.url || authorData?.avatar?.data?.attributes?.url || null;

        // Transform to BlogPost format
        const transformedPost: BlogPost = {
          id: strapiPost.id?.toString() || strapiPost.documentId || `post-${Math.random()}`,
          slug: strapiPost.slug,
          title: strapiPost.title,
          excerpt: strapiPost.excerpt,
          content: strapiPost.content,
          coverImage: getStrapiMediaUrl(coverUrl),
          author: {
            name: authorData?.name || 'Henry Barefoot',
            avatar: getStrapiMediaUrl(avatarUrl),
            bio: authorData?.bio
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.notFoundTitle}</h1>
          <p className="text-muted-foreground mb-8">{t.notFoundMessage}</p>
          <Link href={blogPath} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12 pt-24">
        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-3 group relative">
              {post.author.avatar ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <span className="font-medium">{post.author.name}</span>
              {/* Author hover card */}
              {post.author.bio && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="flex items-start gap-3">
                    {post.author.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {post.author.bio}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readingTime} {t.minRead}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
              {post.category}
            </span>
            {post.industry && (
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                {post.industry}
              </span>
            )}
          </div>
        </motion.header>

        {/* Cover Image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="aspect-video relative bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-8"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </motion.div>
        )}

        {/* Business Context */}
        {post.businessContext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-secondary/30 border border-primary/20 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {t.businessContext}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{post.businessContext}</p>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.codeExamples}</h2>
            <div className="space-y-6">
              {post.codeSnippets.map((snippet, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/80 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/50">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{snippet.language}</span>
                      {snippet.filename && (
                        <span className="text-sm text-gray-500 dark:text-gray-500">• {snippet.filename}</span>
                      )}
                    </div>
                    <button
                      onClick={() => copyCode(snippet.code, index)}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{t.copy}</span>
                        </>
                      )}
                    </button>
                  </div>
                  {snippet.caption && (
                    <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700/50">
                      {snippet.caption}
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-300">{snippet.code}</code>
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
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-400"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="py-8 border-t border-gray-200 dark:border-gray-700/50"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.shareArticle}
            </span>
            <ShareButtons
              url={shareUrl}
              title={post.title}
              description={post.excerpt}
            />
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-700/50"
        >
          <Link
            href={blogPath}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToAllPosts}
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
