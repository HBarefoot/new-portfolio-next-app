'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StrapiCaseStudy, getStrapiImageUrl } from '@/types/strapi';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

const translations = {
  en: {
    featured: 'Featured',
    readCaseStudy: 'Read Case Study',
    more: 'more',
  }
};

interface CaseStudyCardProps {
  caseStudy: StrapiCaseStudy;
  index: number;
  locale?: string;
}

const CaseStudyCard = ({ caseStudy, index, locale = 'en' }: CaseStudyCardProps) => {
  const t = translations.en;
  const heroImageUrl = getStrapiImageUrl(caseStudy.heroImage);
  const caseStudyPath = `/case-studies/${caseStudy.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/30 transition-all duration-300 group"
    >
      <Link href={caseStudyPath}>
        {/* Hero Image */}
        <div className="relative h-64 overflow-hidden bg-primary">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={caseStudy.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {caseStudy.client}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Client Badge */}
          <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
            {caseStudy.client}
          </div>

          {/* Featured Badge */}
          {caseStudy.featured && (
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-primary-foreground text-xs font-bold border border-primary-foreground/20">
              {t.featured}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {caseStudy.title}
          </h3>

          {caseStudy.industry && (
            <p className="text-sm text-primary font-semibold mb-3">
              {caseStudy.industry}
            </p>
          )}

          <p className="text-muted-foreground mb-4 line-clamp-3">
            {caseStudy.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {caseStudy.projectDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(caseStudy.projectDate).getFullYear()}</span>
              </div>
            )}
            {caseStudy.projectDuration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{caseStudy.projectDuration}</span>
              </div>
            )}
          </div>

          {/* Metrics Preview */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="bg-secondary/50 p-3 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          {Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.technologies.slice(0, 4).map((tech: any) => (
                <span
                  key={tech.id}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                >
                  {tech.name || tech.attributes?.name}
                </span>
              ))}
              {caseStudy.technologies.length > 4 && (
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                  +{caseStudy.technologies.length - 4} {t.more}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              {t.readCaseStudy}
              <ExternalLink className="w-4 h-4" />
            </span>
            {caseStudy.role && (
              <span className="text-xs text-muted-foreground">
                {caseStudy.role}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CaseStudyCard;
