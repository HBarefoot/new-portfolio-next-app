'use client';

import PawHero from './sections/PawHero';
import PawProblem from './sections/PawProblem';
import PawFeatures from './sections/PawFeatures';
import PawInstall from './sections/PawInstall';
import PawIntegrations from './sections/PawIntegrations';
import PawArchitecture from './sections/PawArchitecture';
import PawCTA from './sections/PawCTA';

export default function PawLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PawHero />
      <PawProblem />
      <PawFeatures />
      <PawInstall />
      <PawIntegrations />
      <PawArchitecture />
      <PawCTA />
    </main>
  );
}
