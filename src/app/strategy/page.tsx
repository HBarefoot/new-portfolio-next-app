import { getSiteSettings } from '@/lib/strapi-api';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import { Metadata } from 'next';
import { Calendar, Clock, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schedule a Strategy Call | Henry Barefoot',
  description: 'Book a free 30-minute strategy call to discuss your automation needs and how we can help transform your business operations.',
};

export default async function StrategyPage() {
  const siteSettings = await getSiteSettings();
  const calendlyUrl = siteSettings?.calendlyUrl;

  // Fallback UI if no Calendly URL is configured
  if (!calendlyUrl) {
    return (
      <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Book a Strategy Call</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Scheduling integration coming soon.
        </p>
        <a
          href="mailto:henrybarefoot1987@gmail.com"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
        >
          Email Me Instead
        </a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule Your Strategy Call
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Let's discuss how automation can transform your business operations.
              Book a free 30-minute consultation to explore opportunities and solutions.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">30 Minutes</h3>
                <p className="text-sm text-muted-foreground">
                  Quick but comprehensive
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Virtual Meeting</h3>
                <p className="text-sm text-muted-foreground">
                  Join from anywhere
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Flexible Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a time that works for you
                </p>
              </div>
            </div>
          </div>

          {/* Calendly Widget */}
          <CalendlyEmbed url={calendlyUrl} />

          {/* Alternative Contact */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Prefer a different way to connect?
            </p>
            <a
              href="mailto:henrybarefoot1987@gmail.com"
              className="text-primary hover:underline"
            >
              Send me an email instead
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
