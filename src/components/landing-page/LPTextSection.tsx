'use client';

import { motion } from 'framer-motion';
import { LandingPageTextSection } from '@/types/strapi';
import MarkdownContent from '@/components/MarkdownContent';

interface Props {
  section: LandingPageTextSection;
}

const bgStyles: Record<string, string> = {
  white: 'bg-white dark:bg-gray-950',
  gray: 'bg-gray-50 dark:bg-gray-900',
  dark: 'bg-gray-900 dark:bg-gray-950',
};

const alignStyles: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export default function LPTextSection({ section }: Props) {
  const bgStyle = bgStyles[section.backgroundColor || 'white'];
  const alignStyle = alignStyles[section.alignment || 'left'];
  const isDark = section.backgroundColor === 'dark';

  return (
    <section className={`py-16 ${bgStyle}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`max-w-4xl mx-auto ${alignStyle}`}
        >
          {section.sectionTitle && (
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}>
              {section.sectionTitle}
            </h2>
          )}
          
          {section.content && (
            <div className={isDark ? 'prose-invert' : ''}>
              <MarkdownContent content={section.content} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
