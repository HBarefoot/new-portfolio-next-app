'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { localizePathname, getLocaleFromPathname, type Locale } from '@/lib/i18n';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) as Locale;
  const isHomePage = pathname === '/' || pathname === '/es';

  // Memoize localized paths to avoid recalculating on every render
  const homePath = useMemo(() => localizePathname('/', locale), [locale]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    } else {
      document.body.style.overflow = '';
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
        window.location.href = `${homePath}#${item.href}`;
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

  // Memoize navItems to prevent recalculation on every render
  const navItems = useMemo(() => [
    { label: 'Home', href: 'hero', isSection: true },
    { label: 'About', href: 'about', isSection: true },
    { label: 'Services', href: 'services', isSection: true },
    { label: 'Work', href: 'work', isSection: true },
    { label: 'Live Demos', href: '/demos', isSection: false },
    { label: 'Gallery', href: 'projects-gallery', isSection: true },
    { label: 'Blog', href: localizePathname('/blog', locale), isSection: false },
  ], [locale]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/40 transition-all duration-300 ${isScrolled || isMenuOpen
        ? 'bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60'
        : 'bg-background/80 backdrop-blur-sm border-transparent'
        }`}
      ref={menuRef}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={homePath}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/HBeat-youtube-logo.webp"
              alt="Barefoot Digital Logo"
              width={40}
              height={40}
              priority
              className="h-10 w-auto rounded-full ring-2 ring-primary/20"
            />
          </Link>

          {/* Desktop Navigation - Only visible on xl (1280px+) */}
          <nav className="desktop-nav items-center gap-6">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}

            <div className="flex items-center gap-4 pl-4 border-l border-border/40">
              <ThemeToggle />
              <Button asChild size="sm" className="hidden lg:inline-flex">
                <Link href="/strategy">Schedule Call</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button - Hidden on xl (1280px+) */}
          <div className="mobile-nav items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-foreground transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 scale-0' : ''
                    }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Animated Dropdown */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 border-t border-border/40' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="py-4 flex flex-col gap-2">
            {navItems.map((item, index) => (
              item.isSection ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="group flex items-center gap-3 w-full text-left py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 font-medium"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 font-medium"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="pt-4 px-4 pb-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/strategy" onClick={() => setIsMenuOpen(false)}>Schedule Call</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
