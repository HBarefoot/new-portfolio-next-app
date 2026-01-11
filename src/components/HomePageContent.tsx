import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import { fetchHeroServer } from '@/lib/strapi-api';
import type { Locale } from '@/lib/i18n';

// Lazy load below-the-fold components
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

interface HomePageContentProps {
  locale: Locale;
}

export default async function HomePageContent({ locale }: HomePageContentProps) {
  // Fetch Hero data server-side with locale
  const heroData = await fetchHeroServer(locale);
  
  return (
    <main>
      <Hero initialData={heroData} locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <Experience locale={locale} />
      <Projects locale={locale} />
      <CaseStudiesSection locale={locale} />
      <ProjectsGallery locale={locale} />
      <GameSection />
      <Contact />
    </main>
  );
}
