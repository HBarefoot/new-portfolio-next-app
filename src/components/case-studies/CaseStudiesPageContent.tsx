import { getCaseStudies } from '@/lib/strapi-api';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Briefcase } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localizePathname } from '@/lib/i18n';

// Translations for case studies page
const translations = {
  en: {
    title: 'Case Studies',
    subtitle: "Explore how I've helped clients solve complex problems and achieve their goals through innovative solutions and strategic thinking.",
    featuredTitle: 'Featured Case Study',
    moreTitle: 'More Case Studies',
    allTitle: 'All Case Studies',
    emptyMessage: 'Case studies coming soon. Check back for detailed project breakdowns and success stories.',
  },
  es: {
    title: 'Casos de Estudio',
    subtitle: 'Explora cómo he ayudado a clientes a resolver problemas complejos y alcanzar sus objetivos a través de soluciones innovadoras y pensamiento estratégico.',
    featuredTitle: 'Caso de Estudio Destacado',
    moreTitle: 'Más Casos de Estudio',
    allTitle: 'Todos los Casos de Estudio',
    emptyMessage: 'Próximamente casos de estudio. Vuelve pronto para ver análisis detallados de proyectos e historias de éxito.',
  },
};

interface CaseStudiesPageContentProps {
  locale: Locale;
}

async function getCaseStudiesData(locale: string) {
  try {
    const data = await getCaseStudies({ locale });
    // Strapi v5 returns flat data structure
    if (data && Array.isArray(data)) {
      return data.map((item: any) => {
        // Wrap in attributes structure if not already present
        if (!item.attributes) {
          return {
            id: item.id,
            attributes: item
          };
        }
        return item;
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export default async function CaseStudiesPageContent({ locale }: CaseStudiesPageContentProps) {
  const t = translations[locale];
  const caseStudies = await getCaseStudiesData(locale);
  const caseStudiesPath = localizePathname('/case-studies', locale);

  // Separate featured and regular case studies
  const featuredStudy = caseStudies.find((study: any) => study.attributes.featured);
  const regularStudies = caseStudies.filter((study: any) => !study.attributes.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Briefcase className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-6 py-16 pt-24">
        {caseStudies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.emptyMessage}
            </p>
          </div>
        ) : (
          <>
            {/* Featured Case Study */}
            {featuredStudy && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {t.featuredTitle}
                </h2>
                <div className="max-w-5xl mx-auto">
                  <CaseStudyCard caseStudy={featuredStudy.attributes} index={0} locale={locale} />
                </div>
              </div>
            )}

            {/* All Case Studies */}
            {regularStudies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {featuredStudy ? t.moreTitle : t.allTitle}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularStudies.map((study: any, index: number) => (
                    <CaseStudyCard
                      key={study.id}
                      caseStudy={study.attributes}
                      index={index}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
