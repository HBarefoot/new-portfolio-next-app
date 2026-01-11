import BlogPageContent from '@/components/blog/BlogPageContent';

export const metadata = {
  title: 'Blog - Daily Dev Log | Henry Barefoot',
  description: 'Building solutions for real business problems. Code, insights, and lessons learned from the trenches.',
};

export default function BlogPage() {
  return <BlogPageContent locale="en" />;
}
