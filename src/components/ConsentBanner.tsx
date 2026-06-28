'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

declare global {
  interface Window {
    // Matches the existing global augmentation elsewhere in the app.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

function readRegion(): 'eu' | 'us' {
  const m = document.cookie.match(/(?:^|;\s*)bf_region=(eu|us)/);
  return (m?.[1] as 'eu' | 'us') ?? 'us';
}

function updateConsent(adGranted: boolean) {
  window.dataLayer = window.dataLayer || [];
  // Mirror the inline gtag() shape so Consent Mode receives a proper arguments object.
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('consent', 'update', {
    ad_storage: adGranted ? 'granted' : 'denied',
    ad_user_data: adGranted ? 'granted' : 'denied',
    ad_personalization: adGranted ? 'granted' : 'denied',
    analytics_storage: adGranted ? 'granted' : 'denied',
  });
  window.dataLayer.push({
    event: adGranted ? 'consent_ad_granted' : 'consent_ad_denied',
  });
}

export default function ConsentBanner() {
  useEffect(() => {
    const region = readRegion();
    const gpc =
      (navigator as Navigator & { globalPrivacyControl?: boolean })
        .globalPrivacyControl === true;
    // US visitors without GPC default to advertising ON (opt-out model);
    // EEA/UK or any GPC visitor defaults to OFF (opt-in / already opted out).
    const adDefault = region === 'us' && !gpc;

    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: 'box', position: 'bottom right' },
        preferencesModal: { layout: 'box' },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: { enabled: true }, // Cloudflare + Vercel: cookieless, not in GTM
        advertising: { enabled: adDefault }, // Meta + LinkedIn: gated via Consent Mode
      },
      onFirstConsent: () =>
        updateConsent(CookieConsent.acceptedCategory('advertising')),
      onChange: () => updateConsent(CookieConsent.acceptedCategory('advertising')),
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'Privacy & cookies',
              description:
                region === 'eu'
                  ? 'We use cookies for analytics and, with your consent, advertising measurement (Meta and LinkedIn). Accept, reject, or manage your choices.'
                  : 'We use cookies for analytics and advertising measurement (Meta and LinkedIn). You can manage your choices anytime via "Your Privacy Choices."',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage choices',
              footer:
                '<a href="/privacy">Privacy Policy</a><a href="/terms">Terms</a>',
            },
            preferencesModal: {
              title: 'Your privacy choices',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save choices',
              closeIconLabel: 'Close',
              sections: [
                {
                  title: 'Strictly necessary',
                  description:
                    'Required for the site to function. Always active.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analytics',
                  description:
                    'Aggregated, cookieless performance metrics (Cloudflare, Vercel).',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Advertising',
                  description:
                    'Conversion measurement via Meta Pixel and LinkedIn Insight Tag. For California residents, opting out here is your "Do Not Sell or Share" request.',
                  linkedCategory: 'advertising',
                },
                {
                  title: 'More information',
                  description:
                    'See our <a href="/privacy">Privacy Policy</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
