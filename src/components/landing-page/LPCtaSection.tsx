'use client';

import { motion } from 'framer-motion';
import { LandingPageCtaSection } from '@/types/strapi';
import { ArrowRight, Mail, Phone } from 'lucide-react';

interface Props {
  section: LandingPageCtaSection;
  calendlyUrl?: string;
}

const backgroundStyles: Record<string, string> = {
  'gradient-blue': 'bg-gradient-to-r from-blue-600 to-indigo-700',
  'gradient-purple': 'bg-gradient-to-r from-purple-600 to-indigo-700',
  'gradient-dark': 'bg-gradient-to-r from-gray-800 to-gray-900',
  'solid-blue': 'bg-blue-600',
  'solid-dark': 'bg-gray-900',
};

export default function LPCtaSection({ section, calendlyUrl }: Props) {
  const bgStyle = backgroundStyles[section.backgroundStyle || 'gradient-blue'];
  const ctaLink = section.ctaLink || calendlyUrl || '#contact';

  return (
    <section className={`py-20 ${bgStyle}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {section.headline}
          </h2>
          
          {section.subheadline && (
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {section.subheadline}
            </p>
          )}

          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {section.ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Contact Info */}
          {(section.contactEmail || section.contactPhone) && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
              {section.contactEmail && (
                <a 
                  href={`mailto:${section.contactEmail}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {section.contactEmail}
                </a>
              )}
              {section.contactPhone && (
                <a 
                  href={`tel:${section.contactPhone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {section.contactPhone}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
