import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getLandingPage, getLandingPageSlugs, getLandingPageByDocumentId } from '@/lib/strapi-api';
import { StrapiLandingPage, LandingPageSection, getStrapiImageUrl } from '@/types/strapi';
import LandingPageRenderer from './LandingPageRenderer';

// Enable dynamic rendering for preview/draft support
export const dynamic = 'force-dynamic';

const LOCALE = 'en';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ documentId?: string }>;
}

// Generate static paths for active landing pages
export async function generateStaticParams() {
  try {
    const pages = await getLandingPageSlugs(LOCALE);
    
    return pages.map((page: StrapiLandingPage) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Failed to generate landing page params:', error);
    return [];
  }
}

// Generate dynamic metadata
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { documentId } = await searchParams;
  const { isEnabled: isDraft } = await draftMode();
  
  try {
    let pageData: StrapiLandingPage | null = null;
    
    // First, try to fetch by slug
    const landingPages = await getLandingPage(slug, LOCALE);
    pageData = landingPages[0] || null;
    
    // Fallback to documentId if slug doesn't match
    if (!pageData && documentId) {
      pageData = await getLandingPageByDocumentId(documentId, isDraft, LOCALE);
    }
    
    if (!pageData) {
      return {
        title: 'Page Not Found',
      };
    }

    const ogImage = pageData.ogImage ? getStrapiImageUrl(pageData.ogImage) : undefined;

    return {
      title: pageData.metaTitle || pageData.title,
      description: pageData.metaDescription,
      openGraph: {
        title: pageData.metaTitle || pageData.title,
        description: pageData.metaDescription || undefined,
        images: ogImage ? [ogImage] : undefined,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageData.metaTitle || pageData.title,
        description: pageData.metaDescription || undefined,
        images: ogImage ? [ogImage] : undefined,
      },
      alternates: {
        canonical: `https://next.henrybarefoot.com/lp/${slug}`,
        languages: {
          'en': `https://next.henrybarefoot.com/lp/${slug}`,
          'es': `https://next.henrybarefoot.com/es/lp/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error('Failed to generate landing page metadata:', error);
    return {
      title: 'Landing Page',
    };
  }
}

export default async function LandingPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { documentId } = await searchParams;
  const { isEnabled: isDraft } = await draftMode();
  
  let pageData: StrapiLandingPage | null = null;

  try {
    // First, try to fetch by slug (works for published pages)
    const landingPages = await getLandingPage(slug, LOCALE);
    pageData = landingPages[0] || null;
    
    // If not found and we have documentId, try fetching by documentId
    // This handles preview mode and cases where slug might differ
    if (!pageData && documentId) {
      pageData = await getLandingPageByDocumentId(documentId, isDraft, LOCALE);
    }
  } catch (error) {
    console.error('Failed to fetch landing page:', error);
    
    // Fallback: try documentId if available
    if (documentId) {
      try {
        pageData = await getLandingPageByDocumentId(documentId, isDraft, LOCALE);
      } catch (docError) {
        console.error('Failed to fetch landing page by documentId:', docError);
      }
    }
  }

  if (!pageData) {
    notFound();
  }

  // In draft mode, allow viewing inactive pages
  if (!isDraft && !pageData.isActive) {
    notFound();
  }

  // Check expiry (skip in draft mode)
  if (!isDraft && pageData.expiresAt && new Date(pageData.expiresAt) < new Date()) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {isDraft && (
        <div className="bg-yellow-500 text-black text-center py-2 text-sm font-medium">
          Preview Mode - This page is not published yet
        </div>
      )}
      <LandingPageRenderer 
        sections={pageData.sections || []} 
        calendlyUrl={pageData.calendlyUrl}
        trackingPixels={pageData.trackingPixels}
      />
    </main>
  );
}
