import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLandingPage, getLandingPages } from '@/lib/strapi-api';
import { StrapiLandingPage, LandingPageSection, getStrapiImageUrl } from '@/types/strapi';
import LandingPageRenderer from './LandingPageRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
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
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await getLandingPage(slug);
    const pageData = response.data?.data?.[0];
    
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

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  
  let pageData: StrapiLandingPage | null = null;

  try {
    const response = await getLandingPage(slug);
    pageData = response.data?.data?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch landing page:', error);
  }

  if (!pageData) {
    notFound();
  }

  // Check if page is active
  if (!pageData.isActive) {
    notFound();
  }

  // Check expiry
  if (pageData.expiresAt && new Date(pageData.expiresAt) < new Date()) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <LandingPageRenderer 
        sections={pageData.sections || []} 
        calendlyUrl={pageData.calendlyUrl}
        trackingPixels={pageData.trackingPixels}
      />
    </main>
  );
}
