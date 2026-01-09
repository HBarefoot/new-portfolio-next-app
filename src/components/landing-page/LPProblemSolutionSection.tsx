'use client';

import { motion } from 'framer-motion';
import { LandingPageProblemSolutionSection } from '@/types/strapi';
import { X, Check } from 'lucide-react';

interface Props {
  section: LandingPageProblemSolutionSection;
}

export default function LPProblemSolutionSection({ section }: Props) {
  const problems = section.items.filter(item => item.type === 'problem');
  const solutions = section.items.filter(item => item.type === 'solution');

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {section.sectionTitle || 'The Challenge'}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
              <X className="w-6 h-6" />
              Common Problems
            </h3>
            <ul className="space-y-4">
              {problems.map((item, idx) => (
                <motion.li
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-red-500" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center gap-2">
              <Check className="w-6 h-6" />
              Our Solutions
            </h3>
            <ul className="space-y-4">
              {solutions.map((item, idx) => (
                <motion.li
                  key={item.id || idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-green-500" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
