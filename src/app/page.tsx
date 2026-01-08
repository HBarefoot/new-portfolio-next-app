import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import ProjectsGallery from '@/components/ProjectsGallery';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import GameSection from '@/components/GameSection/GameSection';
import Contact from '@/components/Contact';

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
