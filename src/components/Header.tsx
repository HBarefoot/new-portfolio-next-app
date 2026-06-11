'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Assuming this is from next/navigation
import { Button } from '@/components/ui/button'; // Assuming this path
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const homePath = '/';
  const isHomePage = pathname === '/';

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
    { label: 'Services', href: 'services', isSection: true },
    { label: 'Work', href: 'work', isSection: true },
    { label: 'Blueprint', href: 'contact', isSection: true },
    { label: 'Frutero', href: '/frutero', isSection: false },
    { label: 'Engram', href: '/engram', isSection: false },
    { label: 'Paw', href: '/paw', isSection: false },
    { label: 'Free Audit', href: '/audit', isSection: false },
    { label: 'Live Demos', href: '/demos', isSection: false },
    { label: 'Blog', href: '/blog', isSection: false },
  ], []);

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
              className="h-10 w-10"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
