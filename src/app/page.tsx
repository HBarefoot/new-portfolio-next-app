import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import { fetchHeroServer } from '@/lib/strapi-api';

// Lazy load below-the-fold components to reduce initial JS bundle
// These don't need to be in the critical rendering path
const About = dynamic(() => import('@/components/About'), {
  loading: () => <section className="py-20 bg-white dark:bg-gray-950"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <section className="py-20 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <section className="py-20"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <section className="py-20 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

const ProjectsGallery = dynamic(() => import('@/components/ProjectsGallery'), {
  loading: () => <section className="py-20"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

const CaseStudiesSection = dynamic(() => import('@/components/CaseStudiesSection'), {
  loading: () => <section className="py-20 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4"><div className="animate-pulse h-64"></div></div></section>,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <section className="py-20"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

// Heavy game component - already lazy loaded
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

export default async function Home() {
  // Fetch Hero data server-side to avoid image flash
  const heroData = await fetchHeroServer();
  
  return (
    <main>
      <Hero initialData={heroData} />
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
