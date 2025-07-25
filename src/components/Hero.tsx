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
        {/* Network Nodes and Connections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0"
        >
          {/* Node Network */}
          <svg width="100%" height="100%" className="absolute inset-0">
            {/* Connection Lines */}
            <motion.path
              d="M 100,150 Q 300,100 500,200 T 900,150"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4,4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="opacity-30"
            />
            <motion.path
              d="M 200,300 Q 400,250 600,350 T 1000,300"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="6,6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
              className="opacity-30"
            />
            <motion.path
              d="M 150,500 Q 350,400 550,500 T 850,450"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1"
              strokeDasharray="3,3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
              className="opacity-30"
            />
          </svg>

          {/* Workflow Nodes */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
            className="absolute top-32 left-20"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500 opacity-20 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
            className="absolute top-48 right-32"
          >
            <div className="w-6 h-6 rounded-full bg-purple-500 opacity-20 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 3 }}
            className="absolute bottom-48 left-32"
          >
            <div className="w-10 h-6 rounded bg-cyan-500 opacity-20 flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 right-20"
          >
            <div className="w-7 h-7 rounded bg-indigo-500 opacity-20 flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Data Flow Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              x: [0, 200, 400, 600, 800],
              y: [100 + i * 50, 120 + i * 45, 140 + i * 55, 110 + i * 60, 130 + i * 50],
              opacity: [0, 0.6, 0.8, 0.6, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: '5%',
              top: `${15 + i * 8}%`,
            }}
          >
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </motion.div>
        ))}

        {/* AI Brain Circuit Pattern */}
        <motion.div
          animate={{ 
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4"
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="3,3" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="1,1" />
            <circle cx="70" cy="70" r="8" fill="#3b82f6" opacity="0.3" />
            <circle cx="130" cy="70" r="6" fill="#8b5cf6" opacity="0.3" />
            <circle cx="100" cy="130" r="7" fill="#06b6d4" opacity="0.3" />
            <line x1="70" y1="70" x2="130" y2="70" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
            <line x1="70" y1="70" x2="100" y2="130" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
            <line x1="130" y1="70" x2="100" y2="130" stroke="#06b6d4" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </motion.div>

        {/* N8N-style Workflow Blocks */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 opacity-10"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-1 h-0.5 bg-gray-400"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <div className="w-1 h-0.5 bg-gray-400"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
          </div>
        </motion.div>

        {/* API Connection Visualization */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute top-20 right-20"
        >
          <svg width="120" height="80" viewBox="0 0 120 80">
            <rect x="10" y="30" width="20" height="20" fill="#3b82f6" opacity="0.5" rx="2" />
            <rect x="90" y="30" width="20" height="20" fill="#8b5cf6" opacity="0.5" rx="2" />
            <path d="M30,40 Q60,20 90,40" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="60" cy="30" r="3" fill="#06b6d4" opacity="0.6" />
          </svg>
        </motion.div>
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
