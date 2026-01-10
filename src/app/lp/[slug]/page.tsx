import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getLandingPage, getLandingPages, getLandingPageByDocumentId } from '@/lib/strapi-api';
import { StrapiLandingPage, LandingPageSection, getStrapiImageUrl } from '@/types/strapi';
import LandingPageRenderer from './LandingPageRenderer';

// Enable dynamic rendering for preview/draft support
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ documentId?: string }>;
}

// Generate static paths for active landing pages
export async function generateStaticParams() {
  try {
    const response = await getLandingPages();
    const pages = response.data?.data || [];
    
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
    
    // In draft mode with documentId, fetch by documentId
    if (isDraft && documentId) {
      const response = await getLandingPageByDocumentId(documentId, true);
      pageData = response.data?.data || null;
    } else {
      const response = await getLandingPage(slug);
      pageData = response.data?.data?.[0] || null;
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
    // In draft mode with documentId, fetch by documentId
    if (isDraft && documentId) {
      const response = await getLandingPageByDocumentId(documentId, true);
      pageData = response.data?.data || null;
    } else {
      const response = await getLandingPage(slug);
      pageData = response.data?.data?.[0] || null;
    }
  } catch (error) {
    console.error('Failed to fetch landing page:', error);
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
