'use client';

import ShareButtons from './ShareButtons';

interface CaseStudyShareProps {
  slug: string;
  title: string;
  excerpt: string;
}

export default function CaseStudyShare({ slug, title, excerpt }: CaseStudyShareProps) {
  // Build the full URL on the client side
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://next.henrybarefoot.com';
  
  const url = `${baseUrl}/case-studies/${slug}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Share this case study
      </span>
      <ShareButtons 
        url={url}
        title={title}
        description={excerpt}
      />
    </div>
  );
}
