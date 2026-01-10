'use client';

import { motion } from 'framer-motion';
import { Download, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getHero } from '@/lib/strapi-api';
import type { StrapiHero } from '@/types/strapi';
import { getStrapiImageUrl } from '@/types/strapi';

const Hero = () => {
  const [heroData, setHeroData] = useState<StrapiHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await getHero();
        setHeroData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch hero data:', error);
        // Fallback data will be used below
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);
  // Pre-calculate coordinates to avoid hydration mismatch
  const hubConnections = [
    { angle: 0, x: 270, y: 150 },
    { angle: 45, x: 234.85, y: 65.15 },
    { angle: 90, x: 150, y: 30 },
    { angle: 135, x: 65.15, y: 65.15 },
    { angle: 180, x: 30, y: 150 },
    { angle: 225, x: 65.15, y: 234.85 },
    { angle: 270, x: 150, y: 270 },
    { angle: 315, x: 234.85, y: 234.85 }
  ];

  const secondaryHubConnections = [
    { angle: 30, x: 202.99, y: 80 },
    { angle: 90, x: 125, y: 35 },
    { angle: 150, x: 47.01, y: 80 },
    { angle: 210, x: 47.01, y: 170 },
    { angle: 270, x: 125, y: 215 },
    { angle: 330, x: 202.99, y: 170 }
  ];

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

  // Fallback data for when Strapi is not available
  const displayData = heroData || {
    name: 'Henry Barefoot',
    title: 'SR. WEB DEVELOPER',
    subtitle: 'n8n Automation & WordPress Specialist',
    description: 'Crafting exceptional digital experiences with modern web technologies. Specializing in React, Next.js, and full-stack development with 8+ years of experience.',
    email: 'henrybarefoot1987@gmail.com',
    phone: '(954) 540-1902'
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Central Hub Network - Constrained positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 lg:left-1/6 lg:transform-none"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        >
          <svg width="250" height="250" viewBox="0 0 250 250" className="w-48 h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 max-w-full max-h-full">
            {/* Central Node */}
            <motion.circle
              cx="125"
              cy="125"
              r="12"
              fill="#3b82f6"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="opacity-80"
            />
            
            {/* Radiating Connection Lines - Adjusted for smaller SVG */}
            {hubConnections.map((connection, i) => (
              <g key={`connection-${i}`}>
                <motion.line
                  x1="125"
                  y1="125"
                  x2={125 + (connection.x - 150) * 0.8}
                  y2={125 + (connection.y - 150) * 0.8}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 3
                  }}
                  className="opacity-70"
                />
                
                {/* Flowing Data Particles */}
                <motion.circle
                  r="3"
                  fill="#8b5cf6"
                  animate={{
                    cx: [125, 125 + (connection.x - 150) * 0.8],
                    cy: [125, 125 + (connection.y - 150) * 0.8],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* End Nodes */}
                <motion.circle
                  cx={125 + (connection.x - 150) * 0.8}
                  cy={125 + (connection.y - 150) * 0.8}
                  r="6"
                  fill="#8b5cf6"
                  animate={{ 
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: i * 0.2,
                    repeat: Infinity 
                  }}
                />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Secondary Hub Network - Constrained positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 3, delay: 2 }}
          className="absolute bottom-1/4 right-4 lg:top-1/3 lg:right-8 z-10"
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 max-w-full max-h-full">
            {/* Central Node */}
            <motion.rect
              x="85"
              y="85"
              width="30"
              height="30"
              rx="6"
              fill="#06b6d4"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="opacity-70"
            />
            
            {/* Radiating Lines - Adjusted for smaller viewport */}
            {secondaryHubConnections.map((connection, i) => (
              <g key={`secondary-${i}`}>
                <motion.line
                  x1="100"
                  y1="100"
                  x2={100 + (connection.x - 125) * 0.7}
                  y2={100 + (connection.y - 125) * 0.7}
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 3, 
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 2
                  }}
                  className="opacity-60"
                />
                
                {/* Data Flow */}
                <motion.circle
                  r="2"
                  fill="#f59e0b"
                  animate={{
                    cx: [100, 100 + (connection.x - 125) * 0.7],
                    cy: [100, 100 + (connection.y - 125) * 0.7],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                
                {/* Target Nodes */}
                <motion.polygon
                  points={`${100 + (connection.x - 125) * 0.7},${100 + (connection.y - 125) * 0.7 - 4} ${100 + (connection.x - 125) * 0.7 + 4},${100 + (connection.y - 125) * 0.7 + 4} ${100 + (connection.x - 125) * 0.7 - 4},${100 + (connection.y - 125) * 0.7 + 4}`}
                  fill="#f59e0b"
                  animate={{ 
                    scale: [0.7, 1.4, 0.7],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 4, 
                    delay: i * 0.3,
                    repeat: Infinity 
                  }}
                />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Network Streams - Temporarily disabled to eliminate horizontal scroll */}
      </div>
      <div className="w-full max-w-none mx-auto px-4 lg:px-6 py-8 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {loading ? (
                <span className="inline-block bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-12 w-64"></span>
              ) : (
                displayData.name
              )}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6"
            >
              {loading ? (
                <span className="inline-block bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-8 w-48"></span>
              ) : (
                displayData.title
              )}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {loading ? (
                <span className="space-y-2">
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-6 w-full"></span>
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 animate-pulse rounded h-6 w-3/4"></span>
                </span>
              ) : (
                displayData.description
              )}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400"
            >
              {!loading && displayData.phone && (
                <a
                  href={`tel:${displayData.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center justify-center lg:justify-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  {displayData.phone}
                </a>
              )}
              {!loading && displayData.email && (
                <a
                  href={`mailto:${displayData.email}`}
                  className="flex items-center justify-center lg:justify-start hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  {displayData.email}
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-2 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {loading ? (
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                  ) : (
                    <Image
                      src={getStrapiImageUrl(heroData?.profileImage) || '/henry-profile.webp'}
                      alt={`${displayData.name} - ${displayData.title}`}
                      width={320}
                      height={320}
                      className="w-full h-full object-cover rounded-full"
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                    />
                  )}
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 sm:p-3 shadow-lg"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 sm:p-4 shadow-lg"
              >
                <div className="text-blue-600 font-bold text-xs sm:text-sm">5+</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
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
