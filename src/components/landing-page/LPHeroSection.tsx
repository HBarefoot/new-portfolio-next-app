'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LandingPageHeroSection, getStrapiImageUrl } from '@/types/strapi';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface Props {
  section: LandingPageHeroSection;
  calendlyUrl?: string;
}

const backgroundStyles: Record<string, string> = {
  'gradient-blue': 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800',
  'gradient-purple': 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800',
  'gradient-dark': 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
  'image-overlay': 'bg-gray-900',
  'solid-dark': 'bg-gray-900',
  'solid-light': 'bg-white',
};

export default function LPHeroSection({ section, calendlyUrl }: Props) {
  const bgStyle = backgroundStyles[section.backgroundStyle || 'gradient-blue'];
  const isLight = section.backgroundStyle === 'solid-light';
  const imageUrl = getStrapiImageUrl(section.backgroundImage);
  const ctaLink = section.ctaLink || calendlyUrl || '#contact';
  // Skip Next.js image optimization for localhost URLs (dev mode)
  const isLocalhost = imageUrl.includes('localhost');

  return (
    <section className={`relative min-h-[90vh] flex items-center ${bgStyle}`}>
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          unoptimized={isLocalhost}
        />
      )}
      
      {/* Overlay */}
      {!isLight && <div className="absolute inset-0 bg-black/30" />}
      
      <div className="relative container mx-auto px-4 lg:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Credibility Indicators */}
          {section.credibilityIndicators && section.credibilityIndicators.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {section.credibilityIndicators.map((indicator, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isLight 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                  }`}
                >
                  {indicator}
                </span>
              ))}
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}
          >
            {section.headline}
          </motion.h1>

          {/* Subheadline */}
          {section.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${
                isLight ? 'text-gray-600' : 'text-white/90'
              }`}
            >
              {section.subheadline}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {section.ctaText || 'Get Started'}
              <ArrowRight className="w-5 h-5" />
            </a>
            
            {section.secondaryCtaText && section.secondaryCtaLink && (
              <a
                href={section.secondaryCtaLink}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl text-lg transition-all ${
                  isLight
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                }`}
              >
                {section.secondaryCtaText}
              </a>
            )}
          </motion.div>

          {/* Tech Logos */}
          {section.techLogos && section.techLogos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16"
            >
              <p className={`text-sm mb-4 ${isLight ? 'text-gray-500' : 'text-white/60'}`}>
                Built with modern technologies
              </p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                {section.techLogos.map((logo, idx) => {
                  const logoUrl = getStrapiImageUrl(logo);
                  return logoUrl ? (
                    <div key={idx} className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
                      <Image src={logoUrl} alt="" fill className="object-contain" unoptimized={logoUrl.includes('localhost')} />
                    </div>
                  ) : null;
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className={`w-8 h-8 animate-bounce ${isLight ? 'text-gray-400' : 'text-white/50'}`} />
        </motion.div>
      </div>
    </section>
  );
}
