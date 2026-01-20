'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, Filter } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { getBlogPosts, getBlogCategories } from '@/lib/strapi-api';
import { getStrapiMediaUrl } from '@/types/strapi';
import { type Locale, defaultLocale, localizePathname } from '@/lib/i18n';

interface BlogPageContentProps {
  locale: Locale;
}

// Translations
const translations = {
  en: {
    title: 'Daily Dev Log',
    subtitle: 'Building solutions for real business problems. Code, insights, and lessons learned from the trenches.',
    searchPlaceholder: 'Search posts...',
    allCategories: 'All Categories',
    loading: 'Loading...',
    noPosts: 'No Posts Yet',
    noPostsDescription: 'Blog posts will appear here as they are automatically generated from my daily development work.',
    noMatchingPosts: 'No posts match your search criteria.',
    readMore: 'Read More',
    postsAcross: 'posts across',
    categories: 'categories',
    min: 'min',
  },
  es: {
    title: 'Diario de Desarrollo',
    subtitle: 'Construyendo soluciones para problemas empresariales reales. Código, perspectivas y lecciones aprendidas desde las trincheras.',
    searchPlaceholder: 'Buscar artículos...',
    allCategories: 'Todas las Categorías',
    loading: 'Cargando...',
    noPosts: 'Sin Artículos',
    noPostsDescription: 'Los artículos del blog aparecerán aquí a medida que se generen automáticamente de mi trabajo diario de desarrollo.',
    noMatchingPosts: 'Ningún artículo coincide con tu búsqueda.',
    readMore: 'Leer Más',
    postsAcross: 'artículos en',
    categories: 'categorías',
    min: 'min',
  },
};

export default function BlogPageContent({ locale }: BlogPageContentProps) {
  const t = translations[locale];

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, [locale]);

  const fetchData = async () => {
    try {
      // Fetch posts and categories from Strapi in parallel
      const [strapiBlogPosts, strapiCategories] = await Promise.all([
        getBlogPosts({ locale }),
        getBlogCategories()
      ]);

      // Transform Strapi data to BlogPost format
      const transformedPosts: BlogPost[] = strapiBlogPosts
        .filter((post: any) => post && post.title)
        .map((post: any) => {
          const authorData = post?.author;
          const categoryData = post?.category;
          const coverImageData = post?.coverImage;

          return {
            id: post.id?.toString() || post.documentId,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: getStrapiMediaUrl(coverImageData?.url),
            author: {
              name: authorData?.name || 'Henry Barefoot',
              avatar: getStrapiMediaUrl(authorData?.avatar?.url),
              bio: authorData?.bio
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
        .filter((cat: any) => cat && cat.name)
        .map((cat: any) => ({
          name: cat?.name || 'Uncategorized',
          slug: cat?.slug || 'uncategorized',
          description: cat?.description || '',
          count: cat?.blog_posts?.length || 0
        }));

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
    return new Date(dateString).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate localized blog post URL
  const getBlogPostUrl = (slug: string) => {
    return localizePathname(`/blog/${slug}`, locale);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 bg-secondary/50 border border-input rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="all">{t.allCategories}</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t.noPosts}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery || selectedCategory !== 'all'
                ? t.noMatchingPosts
                : t.noPostsDescription}
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
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 group shadow-sm"
              >
                {post.coverImage && (
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                      {post.category}
                    </span>
                    {post.industry && (
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                        {post.industry}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-3">
                    <div className="flex items-center gap-3">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                          {post.author.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-medium">{post.author.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} {t.min}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={getBlogPostUrl(post.slug)}
                    className="inline-flex items-center gap-2 mt-4 text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {t.readMore} <ArrowRight className="w-4 h-4" />
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
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50 text-center text-gray-600 dark:text-gray-400"
          >
            <p>
              {posts.length} {t.postsAcross} {categories.length} {t.categories}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
