'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCaseStudies } from '@/lib/strapi-api';
import type { StrapiCaseStudy, StrapiEntity } from '@/types/strapi';
import CaseStudyCard from './CaseStudyCard';
// Translations - English only
const translations = {
  en: {
    badge: 'Featured Work',
    title: 'Case Studies',
    subtitle: 'Real-world projects showcasing measurable results and innovative solutions that drive business success.',
    viewAll: 'View All Case Studies',
    efficiencyGain: 'Average Efficiency Gain',
    satisfaction: 'Client Satisfaction Rate',
    savings: 'In Cost Savings Generated',
  }
};

interface CaseStudiesSectionProps {
  locale?: string;
}

const CaseStudiesSection = ({ locale = 'en' }: CaseStudiesSectionProps) => {
  const t = translations.en;
  const caseStudiesPath = '/case-studies';
  const [caseStudies, setCaseStudies] = useState<StrapiCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies({ locale });
        // Get only featured case studies (Strapi v5 flat structure - no .attributes)
        // If the API returns a flat array of objects, filter them directly
        const featured = data.filter((cs: any) => cs.featured === true).slice(0, 3);
        setCaseStudies(featured);
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [locale]);

  // Don't render if no case studies and not loading
  if (!loading && caseStudies.length === 0) {
    return null;
  }

  return (
    <section id="case-studies" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded-full"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                index={index}
                locale={locale}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {caseStudies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={caseStudiesPath}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl group"
            >
              {t.viewAll}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-100 dark:border-gray-700"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">{t.efficiencyGain}</div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg mb-4">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">{t.satisfaction}</div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$500K+</div>
              <div className="text-gray-600 dark:text-gray-400">{t.savings}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
