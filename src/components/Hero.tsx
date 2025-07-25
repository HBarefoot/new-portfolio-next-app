'use client';

import { motion } from 'framer-motion';
import { Download, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Create a link to download resume
    const link = document.createElement('a');
    link.href = '/henry-barefoot-resume.pdf'; // You'll need to add this file to public folder
    link.download = 'Henry-Barefoot-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Central Hub Network - Left Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute top-1/4 left-1/6"
        >
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* Central Node */}
            <motion.circle
              cx="150"
              cy="150"
              r="12"
              fill="#3b82f6"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="opacity-60"
            />
            
            {/* Radiating Connection Lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={`connection-${i}`}>
                <motion.line
                  x1="150"
                  y1="150"
                  x2={150 + Math.cos(angle * Math.PI / 180) * 120}
                  y2={150 + Math.sin(angle * Math.PI / 180) * 120}
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 4
                  }}
                  className="opacity-40"
                />
                
                {/* Flowing Data Particles */}
                <motion.circle
                  r="2"
                  fill="#8b5cf6"
                  animate={{
                    cx: [150, 150 + Math.cos(angle * Math.PI / 180) * 120],
                    cy: [150, 150 + Math.sin(angle * Math.PI / 180) * 120],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* End Nodes */}
                <motion.circle
                  cx={150 + Math.cos(angle * Math.PI / 180) * 120}
                  cy={150 + Math.sin(angle * Math.PI / 180) * 120}
                  r="6"
                  fill="#8b5cf6"
                  animate={{ 
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.3, 0.6, 0.3]
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

        {/* Secondary Hub Network - Right Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 3, delay: 2 }}
          className="absolute top-1/2 right-1/6"
        >
          <svg width="250" height="250" viewBox="0 0 250 250">
            {/* Central Node */}
            <motion.rect
              x="115"
              y="115"
              width="20"
              height="20"
              rx="4"
              fill="#06b6d4"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="opacity-50"
            />
            
            {/* Radiating Lines - Fewer connections */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <g key={`secondary-${i}`}>
                <motion.line
                  x1="125"
                  y1="125"
                  x2={125 + Math.cos(angle * Math.PI / 180) * 90}
                  y2={125 + Math.sin(angle * Math.PI / 180) * 90}
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 2.5, 
                    delay: i * 0.4,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 3
                  }}
                  className="opacity-35"
                />
                
                {/* Data Flow */}
                <motion.circle
                  r="1.5"
                  fill="#f59e0b"
                  animate={{
                    cx: [125, 125 + Math.cos(angle * Math.PI / 180) * 90],
                    cy: [125, 125 + Math.sin(angle * Math.PI / 180) * 90],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                
                {/* Target Nodes */}
                <motion.polygon
                  points={`${125 + Math.cos(angle * Math.PI / 180) * 90},${125 + Math.sin(angle * Math.PI / 180) * 90 - 4} ${125 + Math.cos(angle * Math.PI / 180) * 90 + 4},${125 + Math.sin(angle * Math.PI / 180) * 90 + 4} ${125 + Math.cos(angle * Math.PI / 180) * 90 - 4},${125 + Math.sin(angle * Math.PI / 180) * 90 + 4}`}
                  fill="#f59e0b"
                  animate={{ 
                    scale: [0.7, 1.2, 0.7],
                    opacity: [0.2, 0.5, 0.2]
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

        {/* Flowing Network Streams - Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 4, delay: 0.5 }}
          className="absolute inset-0"
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            {/* Horizontal Flow Streams */}
            <motion.path
              d="M 0,200 Q 200,180 400,200 T 800,200 T 1200,200"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="8,8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            <motion.path
              d="M 0,400 Q 250,420 500,400 T 1000,400 T 1400,400"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="1.5"
              strokeDasharray="6,6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear",
                delay: 2
              }}
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Ambient Data Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            animate={{
              x: [0, 100, 200, 300, 400, 500],
              y: [100 + i * 30, 90 + i * 35, 110 + i * 25, 95 + i * 40, 105 + i * 30, 100 + i * 30],
              opacity: [0, 0.3, 0.6, 0.3, 0.1, 0],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: '-50px',
              top: `${10 + i * 6}%`,
            }}
          >
            <div 
              className="w-1 h-1 rounded-full"
              style={{
                background: `hsl(${200 + i * 20}, 70%, 60%)`,
              }}
            />
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              Henry Barefoot
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-600 font-semibold mb-6"
            >
              SR. WEB DEVELOPER
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Crafting exceptional digital experiences with modern web technologies. 
              Specializing in React, Next.js, and full-stack development with 5+ years of experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="mr-2" size={20} />
                Get In Touch
              </button>
              
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
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
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm text-gray-600"
            >
              <a
                href="tel:+19545401902"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Phone size={16} className="mr-2" />
                (954) 540-1902
              </a>
              <a
                href="mailto:henrybarefoot1987@gmail.com"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                henrybarefoot1987@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-2 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/henry-profile.jpeg"
                    alt="Henry Barefoot - Senior Web Developer"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full"
                    priority
                    unoptimized
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully');
                    }}
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg"
              >
                <div className="text-blue-600 font-bold text-sm">5+</div>
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
