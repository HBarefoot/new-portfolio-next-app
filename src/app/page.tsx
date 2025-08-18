import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import ProjectsGallery from '@/components/ProjectsGallery';
import GameSection from '@/components/GameSection/GameSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ProjectsGallery />
        <GameSection />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
