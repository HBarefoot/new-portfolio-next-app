'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, Filter } from 'lucide-react';
import { BlogPost, BlogMeta, BlogCategory } from '@/types/blog';
import { getBlogPosts, getBlogCategories } from '@/lib/strapi-api';
import type { StrapiBlogPost, StrapiBlogCategory, StrapiEntity } from '@/types/strapi';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch posts from Strapi
      const postsResponse = await getBlogPosts();
      const strapiBlogPosts = postsResponse.data.data as StrapiEntity<StrapiBlogPost>[];
      
      // Fetch categories from Strapi
      const categoriesResponse = await getBlogCategories();
      const strapiCategories = categoriesResponse.data.data as StrapiEntity<StrapiBlogCategory>[];

      // Transform Strapi data to BlogPost format
      const transformedPosts: BlogPost[] = strapiBlogPosts
        .filter(entity => entity && entity.attributes) // Filter out any invalid entries
        .map((entity) => {
          const post = entity.attributes;
          
          // Safe access to nested relations with explicit undefined checks
          const authorData = post?.author?.data?.attributes;
          const categoryData = post?.category?.data?.attributes;
          const coverImageData = post?.coverImage?.data?.attributes;
          
          return {
            id: entity.id.toString(),
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: coverImageData?.url,
            author: {
              name: authorData?.name || 'Henry Barefoot',
              avatar: authorData?.avatar?.data?.attributes?.url
            },
            tags: Array.isArray(post.tags) ? post.tags : [],
            category: categoryData?.name || 'Development',
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            readingTime: post.readingTime || 5,
            sourceWikiPage: post.sourceWikiPage,
            codeSnippets: post.codeSnippets || [],
            businessContext: post.businessContext,
            industry: post.industry
          };
        });

      // Transform categories
      const transformedCategories: BlogCategory[] = strapiCategories
        .filter(entity => entity && entity.attributes) // Filter out any invalid entries
        .map((entity) => {
          const cat = entity.attributes;
          return {
            name: cat?.name || 'Uncategorized',
            slug: cat?.slug || 'uncategorized',
            description: cat?.description || '',
            count: cat?.blog_posts?.data?.length || 0
          };
        });

      setPosts(transformedPosts);
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Daily Dev Log
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Building solutions for real business problems. Code, insights, and lessons learned from the trenches.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-white mb-2">No Posts Yet</h2>
            <p className="text-slate-400">
              {searchQuery || selectedCategory !== 'all' 
                ? 'No posts match your search criteria.' 
                : 'Blog posts will appear here as they are automatically generated from my daily development work.'}
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
              >
                {post.coverImage && (
                  <div className="aspect-video bg-slate-700 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    {post.industry && (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded">
                        {post.industry}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-slate-400">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Stats */}
        {posts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-slate-700/50 text-center text-slate-400"
          >
            <p>
              {posts.length} posts across {categories.length} categories
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
