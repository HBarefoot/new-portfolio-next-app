'use client';

import * as CookieConsent from 'vanilla-cookieconsent';

/**
 * "Your Privacy Choices" — reopens the consent preferences modal at any time.
 * Required for California (CPRA); together with GPC this is the standing
 * "Do Not Sell or Share" mechanism.
 */
export function PrivacyChoices({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      className={className}
    >
      Your Privacy Choices
    </button>
  );
}
