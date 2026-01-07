import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudy } from '@/lib/strapi-api';
import { StrapiCaseStudy, StrapiEntity, StrapiResponse, getStrapiImageUrl } from '@/types/strapi';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Calendar, Clock, ExternalLink, Github, Globe, Quote, Star } from 'lucide-react';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getCaseStudyData(slug: string) {
  try {
    const response = await getCaseStudy(slug);
    const data = response.data;
    // Strapi v5 returns flat data structure
    if (data.data && data.data[0]) {
      // Wrap in attributes structure if not already present
      const item = data.data[0];
      if (!item.attributes) {
        return {
          id: item.id,
          attributes: item
        };
      }
      return item;
    }
    return null;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyData(slug);

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

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudyData = await getCaseStudyData(slug);

  if (!caseStudyData) {
    notFound();
  }

  const caseStudy = caseStudyData.attributes;
  const heroImageUrl = getStrapiImageUrl(caseStudy.heroImage);

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-blue-600 to-purple-600">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover mix-blend-overlay opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {caseStudy.title}
              </h1>
              {caseStudy.heroTagline && (
                <p className="text-xl md:text-2xl text-white/90 mb-6">
                  {caseStudy.heroTagline}
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-semibold">
                  {caseStudy.client}
                </span>
                {caseStudy.industry && (
                  <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-semibold">
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
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {caseStudy.metrics.map((metric: { label: string; value: string; icon?: string; description?: string }, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          {/* Metadata */}
          <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
            {caseStudy.role && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Role
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">{caseStudy.role}</p>
              </div>
            )}
            {caseStudy.projectDuration && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Duration
                </h3>
                <p className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {caseStudy.projectDuration}
                </p>
              </div>
            )}
            {caseStudy.projectDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Date
                </h3>
                <p className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(caseStudy.projectDate).getFullYear()}
                </p>
              </div>
            )}
          </div>

          {/* Overview Content */}
          {caseStudy.overview && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: caseStudy.overview }} />
            </div>
          )}
        </div>
      </section>

      {/* The Challenge */}
      {caseStudy.challenge && (
        <section className="py-16 bg-red-50 dark:bg-red-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">
                The Challenge
              </h2>
              <div dangerouslySetInnerHTML={{ __html: caseStudy.challenge }} />
            </div>
          </div>
        </section>
      )}

      {/* The Solution */}
      {caseStudy.solution && (
        <section className="py-16 bg-blue-50 dark:bg-blue-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                The Solution
              </h2>
              <div dangerouslySetInnerHTML={{ __html: caseStudy.solution }} />
            </div>

            {/* Technologies Used */}
            {caseStudy.technologies && Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech: any) => (
                    <span
                      key={tech.id}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Development Methodology
                </h3>
                <div className="space-y-3">
                  {caseStudy.methodologies.map((method: { name: string; description?: string }, idx: number) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                        {method.name}
                      </h4>
                      {method.description && (
                        <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
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
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Project Showcase
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {caseStudy.screenshots
                .sort((a: any, b: any) => a.order - b.order)
                .map((screenshot: any, idx: number) => {
                  const imageUrl = getStrapiImageUrl(screenshot.image);
                  return imageUrl ? (
                    <div key={idx} className="space-y-3">
                      <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={imageUrl}
                          alt={screenshot.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {screenshot.title}
                      </h3>
                      {screenshot.caption && (
                        <p className="text-gray-600 dark:text-gray-400">
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

      {/* Results */}
      {caseStudy.results && (
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
                The Results
              </h2>
              <div dangerouslySetInnerHTML={{ __html: caseStudy.results }} />
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonial */}
      {caseStudy.clientTestimonial && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="text-center">
              <Quote className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-medium italic text-gray-900 dark:text-white mb-8">
                "{caseStudy.clientTestimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-center gap-6">
                {caseStudy.clientTestimonial.clientPhoto && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={getStrapiImageUrl(caseStudy.clientTestimonial.clientPhoto)}
                      alt={caseStudy.clientTestimonial.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="text-left">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {caseStudy.clientTestimonial.clientName}
                  </div>
                  {caseStudy.clientTestimonial.clientTitle && (
                    <div className="text-gray-600 dark:text-gray-400">
                      {caseStudy.clientTestimonial.clientTitle}
                    </div>
                  )}
                  {caseStudy.clientTestimonial.clientCompany && (
                    <div className="text-blue-600 dark:text-blue-400 font-semibold">
                      {caseStudy.clientTestimonial.clientCompany}
                    </div>
                  )}
                  
                  {/* Rating */}
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: caseStudy.clientTestimonial.rating }).map((_: any, i: number) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
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
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
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

      {/* Back to Case Studies */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
          >
            ← Back to All Case Studies
          </Link>
        </div>
      </section>
    </article>
  );
}
