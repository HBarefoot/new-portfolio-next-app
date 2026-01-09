'use client';

import { useEffect } from 'react';
import { LandingPageSection } from '@/types/strapi';
import {
  LPHeroSection,
  LPProblemSolutionSection,
  LPServicesSection,
  LPSocialProofSection,
  LPProcessSection,
  LPFaqSection,
  LPCtaSection,
  LPUrgencyBanner,
  LPTextSection,
} from '@/components/landing-page';
import Script from 'next/script';

interface Props {
  sections: LandingPageSection[];
  calendlyUrl?: string;
  trackingPixels?: {
    facebookPixel?: string;
    googleAnalytics?: string;
    [key: string]: string | undefined;
  };
}

export default function LandingPageRenderer({ sections, calendlyUrl, trackingPixels }: Props) {
  // Initialize tracking pixels
  useEffect(() => {
    // Facebook Pixel
    if (trackingPixels?.facebookPixel && typeof window !== 'undefined') {
      // The actual pixel is loaded via Script component below
      console.log('Facebook Pixel initialized');
    }
  }, [trackingPixels]);

  const renderSection = (section: LandingPageSection, index: number) => {
    const key = `section-${section.__component}-${section.id || index}`;

    switch (section.__component) {
      case 'landing-page.hero-section':
        return <LPHeroSection key={key} section={section} calendlyUrl={calendlyUrl} />;
      
      case 'landing-page.problem-solution-section':
        return <LPProblemSolutionSection key={key} section={section} />;
      
      case 'landing-page.services-section':
        return <LPServicesSection key={key} section={section} calendlyUrl={calendlyUrl} />;
      
      case 'landing-page.social-proof-section':
        return <LPSocialProofSection key={key} section={section} />;
      
      case 'landing-page.process-section':
        return <LPProcessSection key={key} section={section} />;
      
      case 'landing-page.faq-section':
        return <LPFaqSection key={key} section={section} />;
      
      case 'landing-page.cta-section':
        return <LPCtaSection key={key} section={section} calendlyUrl={calendlyUrl} />;
      
      case 'landing-page.urgency-banner':
        return <LPUrgencyBanner key={key} section={section} calendlyUrl={calendlyUrl} />;
      
      case 'landing-page.text-section':
        return <LPTextSection key={key} section={section} />;
      
      default:
        console.warn(`Unknown section component: ${(section as any).__component}`);
        return null;
    }
  };

  return (
    <>
      {/* Google Analytics */}
      {trackingPixels?.googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingPixels.googleAnalytics}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${trackingPixels.googleAnalytics}');
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {trackingPixels?.facebookPixel && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${trackingPixels.facebookPixel}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Render all sections */}
      {sections.map((section, index) => renderSection(section, index))}
    </>
  );
}
