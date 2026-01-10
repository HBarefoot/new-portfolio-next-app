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
            
            {/* Mobile: Horizontal scroll carousel */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {section.showcaseImages.slice(0, 6).map((image, idx) => {
                  const imageUrl = getStrapiImageUrl(image);
                  return imageUrl ? (
                    <div
                      key={idx}
                      className="relative flex-shrink-0 w-72 h-44 rounded-xl overflow-hidden shadow-lg snap-center"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Showcase ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized={imageUrl.includes('localhost')}
                      />
                    </div>
                  ) : null;
                })}
              </div>
              {/* Scroll indicator */}
              <div className="flex justify-center gap-1.5 mt-3">
                {section.showcaseImages.slice(0, 6).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {section.showcaseImages.slice(0, 8).map((image, idx) => {
                const imageUrl = getStrapiImageUrl(image);
                return imageUrl ? (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Showcase ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={imageUrl.includes('localhost')}
                    />
                  </motion.div>
                ) : null;
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
