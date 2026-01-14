import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudy, getCaseStudyByDocumentId } from '@/lib/strapi-api';
import { StrapiCaseStudy, StrapiEntity, StrapiImage, getStrapiImageUrl } from '@/types/strapi';
import MarkdownContent from '@/components/MarkdownContent';
import CaseStudyShare from '@/components/CaseStudyShare';
import { Calendar, Clock, ExternalLink, Github, Globe, Quote, Star } from 'lucide-react';

export const revalidate = 60;

// Spanish translations for case study page
const t = {
  role: 'Rol',
  duration: 'Duración',
  date: 'Fecha',
  overview: 'Resumen',
  challenge: 'El Desafío',
  solution: 'La Solución',
  technologiesUsed: 'Tecnologías Utilizadas',
  devMethodology: 'Metodología de Desarrollo',
  results: 'Los Resultados',
  keyFeatures: 'Características Principales',
  testimonial: 'Testimonios del Cliente',
  gallery: 'Galería del Proyecto',
  liveProject: 'Ver Proyecto en Vivo',
  sourceCode: 'Código Fuente',
  backToAll: '← Volver a Todos los Casos de Estudio',
  shareStudy: 'Compartir este caso de estudio:',
};

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ documentId?: string }>;
}

async function getCaseStudyData(slug: string, locale: string = 'es', documentId?: string, isDraft: boolean = false) {
  try {
    let item: any = null;

    if (documentId && isDraft) {
      item = await getCaseStudyByDocumentId(documentId, isDraft, locale);
    } else {
      const data = await getCaseStudy(slug, locale);
      item = data?.[0] || null;
    }

    if (item) {
      if ('attributes' in item) {
        return item as unknown as StrapiEntity<StrapiCaseStudy>;
      }
      return {
        id: item.id || parseInt(item.documentId || '0'),
        attributes: item
      };
    }
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
  
  const caseStudy = await getCaseStudyData(slug, 'es', documentId, isEnabled);

  if (!caseStudy) {
    return {
      title: 'Caso de Estudio No Encontrado',
    };
  }

  return {
    title: `${caseStudy.attributes.title} - Caso de Estudio | Henry Barefoot`,
    description: caseStudy.attributes.excerpt,
  };
}

export default async function CaseStudyDetailPageES({ params, searchParams }: Props) {
  const { slug } = await params;
  const { documentId } = await searchParams;
  const { isEnabled: isDraftMode } = await draftMode();
  
  const caseStudyData = await getCaseStudyData(slug, 'es', documentId, isDraftMode);

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
              {caseStudy.metrics.map((metric: { label: string; value: string; description?: string }, idx: number) => (
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
                  {t.role}
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">{caseStudy.role}</p>
              </div>
            )}
            {caseStudy.projectDuration && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                  {t.duration}
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
                  {t.date}
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
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.overview}</h2>
              <MarkdownContent content={caseStudy.overview} />
            </div>
          )}
        </div>
      </section>

      {/* The Challenge */}
      {caseStudy.challenge && (
        <section className="py-16 bg-red-50 dark:bg-red-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">
              {t.challenge}
            </h2>
            <MarkdownContent content={caseStudy.challenge} />
          </div>
        </section>
      )}

      {/* The Solution */}
      {caseStudy.solution && (
        <section className="py-16 bg-blue-50 dark:bg-blue-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              {t.solution}
            </h2>
            <MarkdownContent content={caseStudy.solution} />

            {/* Technologies Used */}
            {caseStudy.technologies && Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t.technologiesUsed}
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
                  {t.devMethodology}
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

      {/* The Results */}
      {caseStudy.results && (
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
              {t.results}
            </h2>
            <MarkdownContent content={caseStudy.results} />
          </div>
        </section>
      )}

      {/* Key Features */}
      {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {t.keyFeatures}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.keyFeatures.map((feature: { title: string; description: string }, idx: number) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {caseStudy.testimonials && caseStudy.testimonials.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">{t.testimonial}</h2>
            <div className="space-y-8">
              {caseStudy.testimonials.map((testimonial: { quote: string; author: string; role?: string }, idx: number) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                  <Quote className="w-10 h-10 text-white/50 mb-4" />
                  <p className="text-xl italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    {testimonial.role && (
                      <p className="text-white/70">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {caseStudy.gallery && Array.isArray(caseStudy.gallery) && caseStudy.gallery.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t.gallery}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {caseStudy.gallery.map((image: StrapiImage, idx: number) => {
                const imageUrl = getStrapiImageUrl(image);
                if (!imageUrl) return null;
                return (
                  <div key={idx} className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={image.alternativeText || `Galería imagen ${idx + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTAs */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                <Globe className="w-5 h-5" />
                {t.liveProject}
              </a>
            )}
            {caseStudy.repoUrl && (
              <a
                href={caseStudy.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-semibold transition-colors"
              >
                <Github className="w-5 h-5" />
                {t.sourceCode}
              </a>
            )}
          </div>

          {/* Share */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              {t.shareStudy}
            </p>
            <CaseStudyShare title={caseStudy.title} slug={caseStudy.slug} excerpt={caseStudy.excerpt || ''} />
          </div>

          {/* Back Link */}
          <div className="text-center mt-12">
            <Link
              href="/es/case-studies"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
            >
              {t.backToAll}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
