import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudy } from '@/lib/strapi-api';
import { StrapiCaseStudy, StrapiEntity, StrapiResponse, StrapiImage, getStrapiImageUrl } from '@/types/strapi';
import CaseStudyCard from '@/components/CaseStudyCard';
import MarkdownContent from '@/components/MarkdownContent';
import CaseStudyShare from '@/components/CaseStudyShare';
import { Calendar, Clock, ExternalLink, Github, Globe, Quote, Star } from 'lucide-react';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ documentId?: string }>;
}

async function getCaseStudyData(slug: string, documentId?: string, isDraft: boolean = false) {
  try {
    let endpoint: string;

    console.log('[Draft Preview Debug]', { slug, documentId, isDraft });

    if (documentId && isDraft) {
      // Fetch by documentId for draft mode using Strapi v5 Documents API
      endpoint = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/case-studies?filters[documentId][$eq]=${documentId}&populate=*&status=draft`;
    } else {
      // Fetch by slug for published content
      endpoint = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/case-studies?filters[slug][$eq]=${slug}&populate=*`;
    }

    console.log('[Draft Preview Debug] Fetching from:', endpoint);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add API key for draft content - always use it for draft mode
    if (isDraft && process.env.STRAPI_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.STRAPI_API_KEY}`;
      console.log('[Draft Preview Debug] Using API key for authentication');
    }

    const response = await fetch(endpoint, {
      headers,
      next: { revalidate: isDraft ? 0 : 60 },
      cache: isDraft ? 'no-store' : 'default',
    });

    console.log('[Draft Preview Debug] Response status:', response.status);

    console.log('[Draft Preview Debug] Response status:', response.status);

    if (!response.ok) {
      console.error(`[Draft Preview Debug] Failed to fetch case study: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('[Draft Preview Debug] Error response:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('[Draft Preview Debug] Data received:', {
      hasData: !!data.data,
      isArray: Array.isArray(data.data),
      length: Array.isArray(data.data) ? data.data.length : 'N/A'
    });

    // Both slug and documentId queries return array responses
    if (data.data && data.data[0]) {
      const item = data.data[0];
      console.log('[Draft Preview Debug] Found item, has attributes:', !!item.attributes);
      // Handle nested attributes structure (Strapi v4 style)
      if (item.attributes) {
        return item;
      }
      // Handle flat structure (Strapi v5 style)
      return {
        id: item.id || item.documentId,
        attributes: item
      };
    }

    console.log('[Draft Preview Debug] No data found in response');
    return null;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { documentId } = await searchParams;
  const { isEnabled } = await draftMode();

  const caseStudy = await getCaseStudyData(slug, documentId, isEnabled);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.attributes.title} - Case Study | Henry Barefoot`,
    description: caseStudy.attributes.excerpt,
  };
}

export default async function CaseStudyDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { documentId } = await searchParams;
  const { isEnabled: isDraftMode } = await draftMode();

  const caseStudyData = await getCaseStudyData(slug, documentId, isDraftMode);

  if (!caseStudyData) {
    notFound();
  }

  const caseStudy = caseStudyData.attributes;
  const heroImageUrl = getStrapiImageUrl(caseStudy.heroImage);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-primary">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover mix-blend-overlay opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {caseStudy.title}
              </h1>
              {caseStudy.heroTagline && (
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-6 drop-shadow-md">
                  {caseStudy.heroTagline}
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 px-6 py-2 rounded-full font-semibold text-primary-foreground">
                  {caseStudy.client}
                </span>
                {caseStudy.industry && (
                  <span className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 px-6 py-2 rounded-full font-semibold text-primary-foreground">
                    {caseStudy.industry}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats/Metrics */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className="bg-secondary/30 py-16 border-b border-border">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {caseStudy.metrics.map((metric: { label: string; value: string; icon?: string; description?: string }, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <p className="text-sm text-muted-foreground">
                      {metric.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          {/* Metadata */}
          <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
            {caseStudy.role && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                  Role
                </h3>
                <p className="text-lg text-foreground">{caseStudy.role}</p>
              </div>
            )}
            {caseStudy.projectDuration && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                  Duration
                </h3>
                <p className="text-lg text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {caseStudy.projectDuration}
                </p>
              </div>
            )}
            {caseStudy.projectDate && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                  Date
                </h3>
                <p className="text-lg text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(caseStudy.projectDate).getFullYear()}
                </p>
              </div>
            )}
          </div>

          {/* Overview Content */}
          {caseStudy.overview && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
              <MarkdownContent content={caseStudy.overview} />
            </div>
          )}
        </div>
      </section>

      {/* The Challenge */}
      {caseStudy.challenge && (
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The Challenge
            </h2>
            <MarkdownContent content={caseStudy.challenge} />
          </div>
        </section>
      )}

      {/* The Solution */}
      {caseStudy.solution && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The Solution
            </h2>
            <MarkdownContent content={caseStudy.solution} />

            {/* Technologies Used */}
            {caseStudy.technologies && Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech: any) => (
                    <span
                      key={tech.id}
                      className="px-4 py-2 bg-secondary text-secondary-foreground border border-border rounded-lg font-medium"
                    >
                      {tech.name || tech.attributes?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Methodologies */}
            {caseStudy.methodologies && caseStudy.methodologies.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Development Methodology
                </h3>
                <div className="space-y-3">
                  {caseStudy.methodologies.map((method: { name: string; description?: string }, idx: number) => (
                    <div key={idx} className="bg-card p-4 rounded-lg border border-border">
                      <h4 className="font-semibold text-primary mb-1">
                        {method.name}
                      </h4>
                      {method.description && (
                        <p className="text-muted-foreground">{method.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Screenshots Gallery */}
      {caseStudy.screenshots && caseStudy.screenshots.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Project Showcase
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {caseStudy.screenshots
                .sort((a: any, b: any) => a.order - b.order)
                .map((screenshot: any, idx: number) => {
                  const imageUrl = getStrapiImageUrl(screenshot.image);
                  return imageUrl ? (
                    <div key={idx} className="space-y-3">
                      <div className="relative h-80 rounded-xl overflow-hidden shadow-sm border border-border">
                        <Image
                          src={imageUrl}
                          alt={screenshot.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {screenshot.title}
                      </h3>
                      {screenshot.caption && (
                        <p className="text-muted-foreground">
                          {screenshot.caption}
                        </p>
                      )}
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery - Professional Carousel */}
      {caseStudy.gallery && (
        (() => {
          // Handle both Strapi v4 (gallery.data) and v5 (direct array) structures
          const galleryImages = Array.isArray(caseStudy.gallery.data)
            ? caseStudy.gallery.data
            : Array.isArray(caseStudy.gallery)
              ? caseStudy.gallery
              : [];

          return galleryImages.length > 0 && (
            <section className="py-12 bg-background border-y border-border">
              <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Project Gallery
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {galleryImages.length} screenshots • Scroll to explore
                    </p>
                  </div>
                </div>

                {/* Scrollable Gallery Container */}
                <div className="relative group">
                  {/* Gradient overlays for scroll hint - adjusted for monochrome */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Horizontal scroll container */}
                  <div className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-4">
                    <div className="flex gap-4 min-w-max">
                      {galleryImages.map((image: any, idx: number) => {
                        const imageUrl = getStrapiImageUrl(image);
                        const imageData = image.attributes || image;
                        return imageUrl ? (
                          <div
                            key={image.id || idx}
                            className="group/item relative w-[280px] md:w-[340px] flex-shrink-0"
                          >
                            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-secondary shadow-sm hover:shadow-lg border border-border transition-all duration-300">
                              <Image
                                src={imageUrl}
                                alt={imageData.alternativeText || `Screenshot ${idx + 1}`}
                                fill
                                className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                              />

                              {/* Image number badge */}
                              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                <span className="text-white text-xs font-semibold">
                                  {idx + 1}/{galleryImages.length}
                                </span>
                              </div>

                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <p className="text-white text-sm font-medium line-clamp-2">
                                    {imageData.alternativeText || `Project Screenshot ${idx + 1}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Scroll hint */}
                  <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span>Scroll or swipe to view all images</span>
                  </div>
                </div>
              </div>
            </section>
          );
        })()
      )}

      {/* Results */}
      {caseStudy.results && (
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              The Results
            </h2>
            <MarkdownContent content={caseStudy.results} />
          </div>
        </section>
      )}

      {/* Client Testimonial */}
      {caseStudy.clientTestimonial && (
        <section className="py-16 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="text-center">
              <Quote className="w-12 h-12 text-primary/50 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-medium italic text-foreground mb-8">
                "{caseStudy.clientTestimonial.quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-6">
                {caseStudy.clientTestimonial.clientPhoto && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
                    <Image
                      src={getStrapiImageUrl(caseStudy.clientTestimonial.clientPhoto)}
                      alt={caseStudy.clientTestimonial.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="text-left">
                  <div className="font-bold text-foreground">
                    {caseStudy.clientTestimonial.clientName}
                  </div>
                  {caseStudy.clientTestimonial.clientTitle && (
                    <div className="text-muted-foreground">
                      {caseStudy.clientTestimonial.clientTitle}
                    </div>
                  )}
                  {caseStudy.clientTestimonial.clientCompany && (
                    <div className="text-primary font-semibold">
                      {caseStudy.clientTestimonial.clientCompany}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: caseStudy.clientTestimonial.rating }).map((_: any, i: number) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Links */}
      {(caseStudy.liveUrl || caseStudy.githubUrl || caseStudy.demoUrl) && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors border border-transparent"
                >
                  <Globe className="w-5 h-5" />
                  View Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {caseStudy.githubUrl && (
                <a
                  href={caseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg transition-colors border border-border"
                >
                  <Github className="w-5 h-5" />
                  View Code
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {caseStudy.demoUrl && (
                <a
                  href={caseStudy.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-card hover:bg-accent text-card-foreground border border-input font-semibold rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Demo
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {caseStudy.relatedCaseStudies && Array.isArray(caseStudy.relatedCaseStudies) && caseStudy.relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              More Case Studies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.relatedCaseStudies.map((related: any, index: number) => (
                <CaseStudyCard
                  key={related.id}
                  caseStudy={related.attributes || related}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share & Back Navigation */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            {/* Share Buttons */}
            <CaseStudyShare
              slug={slug}
              title={caseStudy.title}
              excerpt={caseStudy.excerpt || caseStudy.heroTagline || ''}
            />

            {/* Back Link */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg transition-colors border border-border"
            >
              ← Back to All Case Studies
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
