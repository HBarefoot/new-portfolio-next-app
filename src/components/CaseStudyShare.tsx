'use client';

import { useState, useEffect } from 'react';
import ShareButtons from './ShareButtons';

interface CaseStudyShareProps {
  slug: string;
  title: string;
  excerpt: string;
}

export default function CaseStudyShare({ slug, title, excerpt }: CaseStudyShareProps) {
  const [url, setUrl] = useState(`https://next.henrybarefoot.com/case-studies/${slug}`);

  useEffect(() => {
    // Use the actual browser URL to ensure we share the correct page
    setUrl(window.location.href);
  }, []);

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
