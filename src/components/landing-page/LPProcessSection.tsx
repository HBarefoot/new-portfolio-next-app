'use client';

import { motion } from 'framer-motion';
import { LandingPageProcessSection } from '@/types/strapi';

interface Props {
  section: LandingPageProcessSection;
}

export default function LPProcessSection({ section }: Props) {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {section.sectionTitle || 'How We Work Together'}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          {section.sectionSubtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {section.sectionSubtitle}
            </p>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 transform md:-translate-x-1/2" />

            {/* Steps */}
            {section.steps.map((step, idx) => (
              <motion.div
                key={step.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step Number */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.stepNumber || idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-1/2 ${
                  idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                }`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      {step.badge && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                          {step.badge}
                        </span>
                      )}
                    </div>
                    
                    {step.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {step.description}
                      </p>
                    )}
                    
                    {step.duration && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        ⏱️ {step.duration}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
