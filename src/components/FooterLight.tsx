'use client';

import { Heart, ArrowUp } from 'lucide-react';

const FooterLight = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white py-12 relative">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 hover:scale-110 active:scale-95 text-white p-3 rounded-full shadow-lg transition-all duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Branding */}
          <div className="text-center md:text-left animate-fade-up">
            <h3 className="text-2xl font-bold mb-4 text-white">Henry Barefoot</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Senior Web Developer crafting exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
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
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(link.href.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column - Contact Info */}
          <div className="text-center md:text-right animate-fade-up" style={{ animationDelay: '0.2s' }}>
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
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
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
              <span className="mx-1 animate-pulse">
                <Heart size={14} className="text-red-500 fill-current" />
              </span>
              <span>and Next.js</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    </footer>
  );
};

export default FooterLight;
