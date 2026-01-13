import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import {
  fetchHeroServer,
  fetchAboutServer,
  fetchSkillsServer,
  fetchExperiencesServer,
  fetchProjectsServer
} from '@/lib/strapi-api';
import type { Locale } from '@/lib/i18n';

// Lazy load below-the-fold components that don't need SEO indexing
const ProjectsGallery = dynamic(() => import('@/components/ProjectsGallery'), {
  loading: () => <section className="py-20"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

const CaseStudiesSection = dynamic(() => import('@/components/CaseStudiesSection'), {
  loading: () => <section className="py-20 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4"><div className="animate-pulse h-64"></div></div></section>,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <section className="py-20"><div className="container mx-auto px-4"><div className="animate-pulse h-96"></div></div></section>,
});

interface HomePageContentProps {
  locale: Locale;
}

export default async function HomePageContent({ locale }: HomePageContentProps) {
  // Fetch all data server-side in parallel for optimal performance
  const [heroData, aboutData, skillsData, experiencesData, projectsData] = await Promise.all([
    fetchHeroServer(locale),
    fetchAboutServer(locale),
    fetchSkillsServer(locale),
    fetchExperiencesServer(locale),
    fetchProjectsServer(locale),
  ]);

  return (
    <main>
      <Hero initialData={heroData} locale={locale} />
      <About initialData={aboutData} locale={locale} />
      <Skills initialData={skillsData} locale={locale} />
      <Experience initialData={experiencesData} locale={locale} />
      <Projects initialData={projectsData} locale={locale} />
      <CaseStudiesSection locale={locale} />
      <ProjectsGallery locale={locale} />
      <Contact />
    </main>
  );
}
