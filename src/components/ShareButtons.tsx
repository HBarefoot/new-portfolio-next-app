'use client';

import { useState } from 'react';
import { Linkedin, Twitter, Facebook, Link2, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export default function ShareButtons({
  url,
  title,
  description = '',
  className = '',
  variant = 'horizontal'
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(false);

  // Encode parameters for URL safety
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  // Native share links (no tracking, no scripts)
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Failed to copy:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  // Native Web Share API (mobile-friendly)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || title,
          url: url,
        });
      } catch (err) {
        // User cancelled or error - fail silently
        if ((err as Error).name !== 'AbortError') {
          setShareError(true);
          setTimeout(() => setShareError(false), 2000);
        }
      }
    }
  };

  // Check if Web Share API is available
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const buttonBaseClass = `
    inline-flex items-center justify-center
    p-2.5 rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-gray-900
  `;

  const containerClass = variant === 'vertical'
    ? 'flex flex-col gap-2'
    : 'flex flex-wrap items-center gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-[#0A66C2] hover:bg-[#004182] text-white focus:ring-[#0A66C2]`}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
        {variant === 'horizontal' && (
          <span className="ml-2 text-sm font-medium hidden sm:inline">LinkedIn</span>
        )}
      </a>

      {/* Twitter/X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-black hover:bg-gray-800 text-white focus:ring-gray-500`}
        aria-label="Share on X (Twitter)"
        title="Share on X (Twitter)"
      >
        <Twitter className="w-5 h-5" />
        {variant === 'horizontal' && (
          <span className="ml-2 text-sm font-medium hidden sm:inline">Twitter</span>
        )}
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-[#1877F2] hover:bg-[#0d65d9] text-white focus:ring-[#1877F2]`}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
        {variant === 'horizontal' && (
          <span className="ml-2 text-sm font-medium hidden sm:inline">Facebook</span>
        )}
      </a>

      {/* Native Share (Mobile) */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className={`${buttonBaseClass} bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary`}
          aria-label="Share via device"
          title="Share via device"
        >
          <Share2 className="w-5 h-5" />
          {variant === 'horizontal' && (
            <span className="ml-2 text-sm font-medium hidden sm:inline">Share</span>
          )}
        </button>
      )}

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`${buttonBaseClass} ${copied
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          } focus:ring-ring`}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        title={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? (
          <Check className="w-5 h-5" />
        ) : (
          <Link2 className="w-5 h-5" />
        )}
        {variant === 'horizontal' && (
          <span className="ml-2 text-sm font-medium hidden sm:inline">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        )}
      </button>
    </div>
  );
}

// Compact version for inline use
export function ShareButtonsCompact({ url, title, description }: Omit<ShareButtonsProps, 'variant' | 'className'>) {
  return (
    <ShareButtons
      url={url}
      title={title}
      description={description}
      className="justify-center"
    />
  );
}

// Floating/sticky version for articles
export function ShareButtonsFloating({ url, title, description }: Omit<ShareButtonsProps, 'variant' | 'className'>) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-card rounded-xl shadow-lg p-2 border border-border">
        <ShareButtons
          url={url}
          title={title}
          description={description}
          variant="vertical"
        />
      </div>
    </div>
  );
}
