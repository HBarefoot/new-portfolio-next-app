'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, User, ExternalLink, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '@/types/blog';

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
      const response = await fetch(`/api/blog/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
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
            <h3 className="text-lg font-semibold text-blue-400 mb-2">💼 Business Context</h3>
            <p className="text-slate-300">{post.businessContext}</p>
          </motion.div>
        )}

        {/* Post Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-8
            prose-headings:text-white prose-headings:font-bold
            prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
            prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-slate-300 prose-ul:my-4
            prose-ol:text-slate-300 prose-ol:my-4
            prose-li:my-1
            prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-400
            prose-pre:bg-slate-800/80 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-xl
            prose-a:text-blue-400 prose-a:hover:text-blue-300
            prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-800/30 prose-blockquote:py-1"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
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

        {/* Source Link */}
        {post.sourceWikiPage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-8"
          >
            <a 
              href={post.sourceWikiPage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View original documentation
            </a>
          </motion.div>
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
