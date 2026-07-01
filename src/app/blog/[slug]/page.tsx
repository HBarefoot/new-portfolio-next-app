import type { Metadata } from 'next';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { getBlogPost } from '@/lib/strapi-api';
import { getStrapiImageUrl, getStrapiMediaUrl } from '@/types/strapi';

const SITE = 'https://www.barefootdigital.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const posts = await getBlogPost(slug, 'en');
    const post = posts?.[0];
    if (!post) return { title: 'Article Not Found' };

    const seo = post.seo ?? {};

    const title = seo.metaTitle ?? post.title;
    const description =
      seo.metaDescription ??
      post.excerpt ??
      post.content?.replace(/<[^>]+>/g, '').slice(0, 155).trim();

    // Prefer the raw 1200x630 ogImage (no webp downscaling); fall back to the post's
    // coverImage, then the site default card.
    const ogImageUrl = (seo.ogImage as { url?: string } | undefined)?.url;
    const image =
      getStrapiMediaUrl(ogImageUrl ?? '') ||
      getStrapiImageUrl(post.coverImage) ||
      `${SITE}/og-default.png`;

    const url = seo.canonicalURL ?? `${SITE}/blog/${post.slug}`;

    return {
      title,
      description,
      keywords: seo.keywords,
      robots: seo.metaRobots ?? 'index, follow',
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        url,
        title,
        description,
        siteName: 'Barefoot Digital',
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: seo.twitterCard ?? 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error('Failed to generate blog post metadata:', error);
    return { title: 'Blog' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostContent slug={slug} locale="en" />;
}
