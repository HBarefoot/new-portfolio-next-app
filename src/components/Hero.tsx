'use client';

import { motion } from 'framer-motion';
import { Download, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import type { StrapiHero } from '@/types/strapi';
import { getStrapiImageUrl } from '@/types/strapi';
import dynamic from 'next/dynamic';

const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => null
});
interface HeroProps {
  initialData?: StrapiHero | null;
  locale?: string;
}

const Hero = ({ initialData, locale = 'en' }: HeroProps) => {
  // Use server-provided data directly - no client-side state needed
  const heroData = initialData;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Create a link to download resume
    const resumeUrl = heroData?.resumeFile?.data?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${heroData.resumeFile.data.attributes.url}`
      : '/Resume_HB.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Henry-Barefoot-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fallback data for when Strapi is not available - used directly, no state changes
  const displayData = heroData || {
    name: 'Henry Barefoot',
    title: 'SR. WEB DEVELOPER',
    subtitle: 'n8n Automation & WordPress Specialist',
    description: 'Crafting exceptional digital experiences with modern web technologies. Specializing in React, Next.js, and full-stack development with 8+ years of experience.',
    email: 'henrybarefoot1987@gmail.com',
    phone: '(954) 540-1902'
  };

  // Determine image source - computed once, no state dependency
  const imageSrc = heroData?.profileImage
    ? getStrapiImageUrl(heroData.profileImage)
    : '/henry-profile.webp';

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* Animated Background Elements - Lazy Loaded */}
      <HeroBackground />
      <div className="w-full max-w-none mx-auto px-4 lg:px-6 py-8 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {displayData.name}
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6"
            >
              {displayData.title}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg"
            >
              {displayData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="mr-2" size={20} />
                Get In Touch
              </button>

              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
              >
                <Download className="mr-2" size={20} />
                Download Resume
              </button>
            </motion.div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400"
            >
              {displayData.phone && (
                <a
                  href={`tel:${displayData.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  {displayData.phone}
                </a>
              )}
              {displayData.email && (
                <a
                  href={`mailto:${displayData.email}`}
                  className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  {displayData.email}
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Profile Image - No conditional rendering based on state */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-2 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={imageSrc}
                    alt={`${displayData.name} - ${displayData.title}`}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full"
                    priority
                    loading="eager"
                    fetchPriority="high"
                    quality={75}
                    sizes="(max-width: 639px) 256px, (max-width: 1023px) 288px, 320px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESEGEhMxQVGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANB6c6oh1qW/DPHLBZqSGKeCUAOh+H4QQCCCOQcUl2WMRx7J9mcYx0CrU7SY5sT/2Q=="
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ translateY: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ willChange: 'transform' }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 sm:p-3 shadow-lg"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </motion.div>

              <motion.div
                animate={{ translateY: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                style={{ willChange: 'transform' }}
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 sm:p-4 shadow-lg"
              >
                <div className="text-blue-600 font-bold text-xs sm:text-sm">5+</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ translateY: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ willChange: 'transform' }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
