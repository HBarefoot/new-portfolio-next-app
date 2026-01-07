import { Metadata } from 'next';
import { getCaseStudies } from '@/lib/strapi-api';
import { StrapiCaseStudy, StrapiEntity, StrapiResponse } from '@/types/strapi';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies - Henry Barefoot',
  description: 'Explore detailed case studies of my client work, showcasing problem-solving approaches, technical solutions, and measurable results across various industries.',
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getCaseStudiesData() {
  try {
    const response = await getCaseStudies();
    const data = response.data;
    // Strapi v5 returns flat data structure
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item: any) => {
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

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudiesData();

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
              Case Studies
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Explore how I've helped clients solve complex problems and achieve their goals through innovative solutions and strategic thinking.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        {caseStudies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Case studies coming soon. Check back for detailed project breakdowns and success stories.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Case Study */}
            {featuredStudy && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Featured Case Study
                </h2>
                <div className="max-w-5xl mx-auto">
                  <CaseStudyCard caseStudy={featuredStudy.attributes} index={0} />
                </div>
              </div>
            )}

            {/* All Case Studies */}
            {regularStudies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {featuredStudy ? 'More Case Studies' : 'All Case Studies'}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularStudies.map((study, index) => (
                    <CaseStudyCard
                      key={study.id}
                      caseStudy={study.attributes}
                      index={index}
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
