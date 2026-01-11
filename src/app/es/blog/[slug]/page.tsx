'use client';

import { useParams } from 'next/navigation';
import BlogPostContent from '@/components/blog/BlogPostContent';

export default function BlogPostPageES() {
  const params = useParams();
  const slug = params.slug as string;
  
  return <BlogPostContent slug={slug} locale="es" />;
}
