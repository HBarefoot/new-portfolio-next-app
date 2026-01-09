'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingPageFaqSection } from '@/types/strapi';
import { ChevronDown } from 'lucide-react';

interface Props {
  section: LandingPageFaqSection;
}

export default function LPFaqSection({ section }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            {section.sectionTitle || 'Frequently Asked Questions'}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {section.items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-b-xl -mt-2 pt-6">
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
