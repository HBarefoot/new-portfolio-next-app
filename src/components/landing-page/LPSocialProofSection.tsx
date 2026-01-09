'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LandingPageSocialProofSection, getStrapiImageUrl } from '@/types/strapi';
import { Check, Award, Shield, Star } from 'lucide-react';

interface Props {
  section: LandingPageSocialProofSection;
}

const iconMap: Record<string, React.ReactNode> = {
  check: <Check className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
};

export default function LPSocialProofSection({ section }: Props) {
  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-950/20">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {section.sectionTitle || 'Why Choose Us'}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" />
          {section.sectionSubtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {section.sectionSubtitle}
            </p>
          )}
        </motion.div>

        {/* Credibility Items */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
          {section.items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                {item.icon && iconMap[item.icon] ? iconMap[item.icon] : <Check className="w-5 h-5" />}
              </span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Showcase Images */}
        {section.showcaseImages && section.showcaseImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              Recent Work & Projects
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {section.showcaseImages.map((image, idx) => {
                const imageUrl = getStrapiImageUrl(image);
                return imageUrl ? (
                  <div
                    key={idx}
                    className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Showcase ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
