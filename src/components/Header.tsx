'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavigation = (item: { href: string; isSection?: boolean }) => {
    if (item.isSection) {
      if (isHomePage) {
        // On home page - smooth scroll to section
        scrollToSection(item.href);
      } else {
        // On other page - navigate to home with anchor
        window.location.href = `/#${item.href}`;
      }
    }
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', href: 'hero', isSection: true },
    { label: 'About', href: 'about', isSection: true },
    { label: 'Skills', href: 'skills', isSection: true },
    { label: 'Experience', href: 'experience', isSection: true },
    { label: 'Projects', href: 'projects', isSection: true },
    { label: 'Case Studies', href: '/case-studies', isSection: false },
    { label: 'Gallery', href: 'projects-gallery', isSection: true },
    { label: 'Game', href: 'game', isSection: true },
    { label: 'Blog', href: '/blog', isSection: false },
    { label: 'Course', href: '/fullStack-course', isSection: false },
    { label: 'Contact', href: 'contact', isSection: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-gray-900/20' 
          : 'bg-gray-900/80 backdrop-blur-sm'
      }`}
      ref={menuRef}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/HBeat-youtube-logo.png"
              alt="Henry Barefoot Logo"
              width={140}
              height={40}
              className="h-10 dark:brightness-110 dark:contrast-110"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="text-gray-100 hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-100 hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-gray-100 hover:text-blue-400 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-5 flex flex-col justify-between">
                <span 
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Animated Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-gray-700/50">
            {navItems.map((item, index) => (
              item.isSection ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="group flex items-center gap-3 w-full text-left py-3 px-2 text-gray-100 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 group-hover:bg-blue-400 transition-colors" />
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 py-3 px-2 text-gray-100 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 group-hover:bg-purple-400 transition-colors" />
                  {item.label}
                </Link>
              )
            ))}
            
            {/* Mobile menu footer */}
            <div className="mt-4 pt-4 border-t border-gray-700/50 text-center text-gray-400 text-sm">
              <span className="text-blue-400">Henry Barefoot</span> • Web Developer
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
