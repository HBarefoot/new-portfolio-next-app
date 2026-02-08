'use client';

import EngramHero from './sections/EngramHero';
import EngramProblem from './sections/EngramProblem';
import EngramFeatures from './sections/EngramFeatures';
import EngramInstall from './sections/EngramInstall';
import EngramAgents from './sections/EngramAgents';
import EngramArchitecture from './sections/EngramArchitecture';
import EngramCTA from './sections/EngramCTA';

export default function EngramLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <EngramHero />
      <EngramProblem />
      <EngramFeatures />
      <EngramInstall />
      <EngramAgents />
      <EngramArchitecture />
      <EngramCTA />
    </main>
  );
}
