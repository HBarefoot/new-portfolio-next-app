'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-gray-900/20' 
          : 'bg-gray-900/80 backdrop-blur-sm'
      }`}
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
              className="p-2 text-gray-100 hover:text-blue-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg border-t border-gray-800">
            <nav className="px-4 py-2">
              {navItems.map((item) => (
                item.isSection ? (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item)}
                    className="block w-full text-left py-3 text-gray-100 hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-gray-100 hover:text-blue-400 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
