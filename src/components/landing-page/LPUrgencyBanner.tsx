'use client';

import { motion } from 'framer-motion';
import { LandingPageUrgencyBanner } from '@/types/strapi';
import { Gift, Clock, ArrowRight } from 'lucide-react';

interface Props {
  section: LandingPageUrgencyBanner;
  calendlyUrl?: string;
}

export default function LPUrgencyBanner({ section, calendlyUrl }: Props) {
  const ctaLink = section.ctaLink || calendlyUrl || '#contact';

  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-white" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {section.title}
            </h2>
          </div>

          {/* Offers */}
          {section.offers && section.offers.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                {section.offers.map((offer, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="text-white text-lg flex items-center justify-center gap-2"
                  >
                    <span className="text-yellow-300">✓</span>
                    {offer}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Deadline & Spots */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {section.deadline && (
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Offer ends: {section.deadline}</span>
              </div>
            )}
            {section.spotsAvailable && (
              <div className="px-4 py-2 bg-red-600 text-white font-bold rounded-full animate-pulse">
                {section.spotsAvailable}
              </div>
            )}
          </div>

          {/* CTA */}
          {section.ctaText && (
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {section.ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
