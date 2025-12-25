'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white py-12 relative">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Henry Barefoot</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Senior Web Developer crafting exceptional digital experiences with modern technologies.
            </p>
          </motion.div>

          {/* Center Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:flex-col md:space-y-3 md:gap-x-0">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Gallery', href: '#projects-gallery' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(link.href.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  whileHover={{ x: 3 }}
                  className="text-gray-400 hover:text-white transition-all duration-300 cursor-pointer font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Get In Touch</h4>
            <div className="space-y-3 text-gray-400">
              <a
                href="tel:+19545401902"
                className="block hover:text-white transition-colors duration-300 font-medium"
              >
                (954) 540-1902
              </a>
              <a
                href="mailto:henrybarefoot1987@gmail.com"
                className="block hover:text-white transition-colors duration-300 font-medium"
              >
                henrybarefoot1987@gmail.com
              </a>
              <a
                href="https://next.henrybarefoot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors duration-300 font-medium"
              >
                next.henrybarefoot.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-400 text-sm">
              <p>
                © {currentYear} Henry Barefoot. All rights reserved.
              </p>
              <span className="hidden md:inline">•</span>
              <a 
                href="/privacy" 
                className="hover:text-white transition-colors duration-300 font-medium"
              >
                Privacy Policy
              </a>
            </div>
            
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-1"
              >
                <Heart size={14} className="text-red-500 fill-current" />
              </motion.div>
              <span>and Next.js</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    </footer>
  );
};

export default Footer;
