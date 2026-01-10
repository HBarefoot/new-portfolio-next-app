import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import ProjectsGallery from '@/components/ProjectsGallery';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import Contact from '@/components/Contact';

// Lazy load heavy components that are below the fold
const GameSection = dynamic(
  () => import('@/components/GameSection/GameSection'),
  { 
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    ),
  }
);

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CaseStudiesSection />
      <ProjectsGallery />
      <GameSection />
      <Contact />
    </main>
  );
}
