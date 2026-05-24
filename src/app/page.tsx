import { HeroSection } from '@/components/barefoot-home/hero-section';
import { ServicesSection } from '@/components/barefoot-home/services-section';
import { WorkExperienceSection } from '@/components/barefoot-home/work-experience-section';
import { FeaturedWorkSection } from '@/components/barefoot-home/featured-work-section';
import { LeadMagnetSection } from '@/components/barefoot-home/lead-magnet-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section - The new pivot */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* Services - New section */}
      <ServicesSection />

      {/* Work Experience - Career history */}
      <WorkExperienceSection />

      {/* Featured Work - Replaces Projects, mapped to 'work' */}
      <FeaturedWorkSection />

      {/* Lead Magnet - New conversion element 
          This IS the 'Get the Automation Blueprint' section
      */}
      <LeadMagnetSection />

      {/* Empty divs for legacy anchor links */}
      <div id="about" className="h-0 w-0" />
      <div id="projects-gallery" className="h-0 w-0" />
    </main>
  );
}
