'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#22c55e"/>
    <path d="M8 14L12 10L16 14L20 10" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 18L12 14L16 18L20 14" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const FeatureIcons = {
  ai: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/>
      <path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>
    </svg>
  ),
  camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  mist: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  light: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/>
      <path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/>
      <path d="M1 12h2"/><path d="M21 12h2"/>
      <path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  batch: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  alert: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
};

export default function FruteroLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: FeatureIcons.ai,
      title: 'AI Advisor',
      desc: 'Claude or Ollama reads your sensor trends and camera images. Flags contamination risk, pinning issues, and temperature drift before they kill a batch.',
    },
    {
      icon: FeatureIcons.camera,
      title: 'Live Camera & Timelapse',
      desc: 'Stream your chamber over LAN. Snapshots from the dashboard. Auto-generated timelapse when you archive a batch.',
    },
    {
      icon: FeatureIcons.mist,
      title: 'Smart Mist Control',
      desc: 'Mist triggers below your humidity threshold. Safety clamps prevent dry-fires — max-on, min-off, and daily cap enforced at the GPIO layer.',
    },
    {
      icon: FeatureIcons.light,
      title: 'Photoperiod Scheduling',
      desc: '12/12 light cycles (or any cron). Boot-time state restore brings actuators back to the right state after a Pi reboot.',
    },
    {
      icon: FeatureIcons.batch,
      title: 'Batch Tracking',
      desc: 'Track every grow from inoculation to harvest. Phase transitions, yield per batch, AI retrospective when you archive.',
    },
    {
      icon: FeatureIcons.alert,
      title: 'Smart Alerts',
      desc: 'Telegram, email, webhook, or browser push. Notified when sensors go silent, temperature drifts, or AI spots contamination.',
    },
  ];

  const faqs = [
    {
      q: 'Is my data going to the cloud?',
      a: 'No. The Pi controller stores everything locally in SQLite. You can run it forever without ever connecting to the internet. The cloud Fleet is opt-in, and even then the Pi only makes outbound connections.',
    },
    {
      q: 'What hardware do I need?',
      a: 'A Raspberry Pi 4B, a 2-channel relay module, a DHT22 temperature/humidity sensor, and optionally a USB camera and ultrasonic mister. Full pinout in the repo docs.',
    },
    {
      q: 'Can I run this on Ubuntu or macOS?',
      a: 'Yes. The controller works on any Debian-based Linux or macOS for development. GPIO obviously needs a Pi for real hardware control, but the dev mode with stubbed sensors runs anywhere.',
    },
    {
      q: 'Do you sell hardware kits?',
      a: 'Not yet. We publish the exact BOM so you can source parts yourself from Amazon, Adafruit, or AliExpress.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1419] text-[#e5e7eb]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#242d36]/40 bg-[#0f1419]/90 backdrop-blur-xl">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#e5e7eb] font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
            <LogoIcon />
            <span>frutero</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">How it works</a>
            <a href="#pricing" className="text-sm font-medium text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">Pricing</a>
            <a href="https://github.com/HBarefoot/frutero" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">GitHub</a>
            <a href="https://frutero-fleet-production.up.railway.app" className="text-sm font-medium px-3 py-1.5 border border-[#242d36] rounded-md text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-[#1a2129] transition-all">Dashboard</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1a2129] border border-[#242d36] rounded-full text-xs text-[#9ca3af] mb-6">
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse"/>
            Open-source Raspberry Pi controller
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5 text-[#e5e7eb]">
            Run your grow chamber<br/>
            <span className="text-[#22c55e]">without paying SaaS rent.</span>
          </h1>
          <p className="text-base md:text-lg text-[#9ca3af] max-w-[600px] mx-auto mb-8 leading-relaxed">
            Frutero is a local-first controller for monotub fruiting chambers.
            Schedule lights, mist by humidity, stream your camera, and get AI contamination warnings
            — all on your Pi, no account required.
          </p>
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <a href="https://frutero-fleet-production.up.railway.app">
              <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-medium px-5 py-2.5 h-auto rounded-lg">
                Start free trial
              </Button>
            </a>
            <a href="https://github.com/HBarefoot/frutero" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[#242d36] bg-[#1a2129] text-[#e5e7eb] hover:bg-[#1e2730] hover:border-[#2d3748] px-5 py-2.5 h-auto rounded-lg font-medium">
                View on GitHub
              </Button>
            </a>
          </div>
          <p className="text-xs text-[#6b7280]">Free Hobby tier — 1 chamber, always free. No credit card.</p>
        </div>
      </section>

      {/* Demo */}
      <section className="py-10 pb-20 flex justify-center">
        <div className="w-full max-w-[860px] mx-4 bg-[#161c23] border border-[#242d36] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(34,197,94,0.06)]">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2129] border-b border-[#242d36]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"/>
            <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"/>
            <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"/>
            <span className="ml-2 text-xs text-[#6b7280] font-mono">frutero dashboard</span>
          </div>
          <div className="flex min-h-[420px]">
            <div className="w-[170px] py-4 bg-white/[0.02] border-r border-[#242d36] hidden md:block">
              {['Overview', 'Batches', 'Schedules', 'Sensors', 'Camera'].map((item, i) => (
                <div key={item} className={`px-5 py-2 text-xs cursor-default ${i === 0 ? 'text-[#22c55e] bg-[rgba(34,197,94,0.08)] border-r-2 border-r-[#22c55e]' : 'text-[#6b7280]'}`}>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {[
                  { label: 'Temperature', value: '72.4°F', trend: 'optimal', good: true },
                  { label: 'Humidity', value: '87%', trend: 'optimal', good: true },
                  { label: 'CO2', value: '420 ppm', trend: 'elevated', good: false },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#1a2129] border border-[#242d36] rounded-lg p-4">
                    <div className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="text-2xl font-semibold text-[#e5e7eb]">{stat.value}</div>
                    <div className={`text-xs mt-1 ${stat.good ? 'text-[#22c55e]' : 'text-[#eab308]'}`}>{stat.trend}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.15)] rounded-lg p-4 mb-5">
                <div className="text-[#22c55e] flex-shrink-0"><AlertIcon /></div>
                <div>
                  <strong className="text-sm text-[#e5e7eb] block mb-1">AI Advisor</strong>
                  <p className="text-sm text-[#9ca3af] leading-relaxed m-0">Temperature spiked 4°F since yesterday. Check ventilation. No contamination risk detected in latest image.</p>
                </div>
              </div>
              <div className="bg-[#1a2129] border border-[#242d36] rounded-lg p-10 text-center">
                <span className="text-sm text-[#6b7280] italic">Temperature trend — last 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 tracking-tight">Built for growers, not for VCs.</h2>
          <p className="text-center text-[#9ca3af] max-w-[500px] mx-auto mb-12 text-base">
            Every feature exists because a grower needed it. Not because it looks good in a pitch deck.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-[#1a2129] border border-[#242d36] rounded-xl p-7 hover:border-[#2d3748] hover:bg-[#1e2730] transition-all">
                <div className="w-11 h-11 flex items-center justify-center bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.15)] rounded-[10px] text-[#22c55e] mb-4">
                  <f.icon />
                </div>
                <h3 className="text-base font-semibold mb-2 text-[#e5e7eb]">{f.title}</h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 tracking-tight">One chamber is free. Scale when you need to.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Install on your Pi', desc: 'One command: ./install.sh. Node.js, SQLite, systemd service, TLS cert — all handled. Idempotent, so re-run anytime.' },
              { num: '2', title: 'Connect hardware', desc: '2-channel relay, DHT22 sensor, USB camera, ultrasonic mister. Standard GPIO pinout — no soldering skills required.' },
              { num: '3', title: 'Grow locally forever', desc: 'Fully functional without ever signing up. Your data stays on your Pi.' },
              { num: '4', title: 'Upgrade to Fleet (optional)', desc: 'Connect additional chambers to the cloud dashboard. One view, cross-chamber comparisons, fleet-wide AI insights.' },
            ].map(step => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-[#1a2129] border border-[#242d36] rounded-full text-lg font-bold text-[#22c55e] mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/[0.02]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 tracking-tight">Simple pricing. No surprises.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {/* Hobby */}
            <div className="bg-[#1a2129] border border-[#242d36] rounded-xl p-8 flex flex-col">
              <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Hobby</div>
              <div className="text-5xl font-bold text-[#e5e7eb] mb-1 leading-none">$0</div>
              <div className="text-sm text-[#6b7280] mb-6">forever</div>
              <ul className="space-y-3 mb-6 flex-1">
                {['1 chamber', 'Full local controller', 'AI advisor', 'Camera & timelapse', 'Batch tracking', 'Browser alerts'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://github.com/HBarefoot/frutero" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-[#242d36] bg-transparent text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-[#1a2129] hover:border-[#2d3748]">
                  Install now
                </Button>
              </a>
            </div>

            {/* Grower */}
            <div className="bg-[#1a2129] border border-[rgba(34,197,94,0.3)] rounded-xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(34,197,94,0.08)]">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#22c55e] text-black px-4 py-1 rounded-full text-xs font-semibold">
                Most popular
              </div>
              <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Grower</div>
              <div className="text-5xl font-bold text-[#e5e7eb] mb-1 leading-none">$9</div>
              <div className="text-sm text-[#6b7280] mb-6">per chamber / month</div>
              <ul className="space-y-3 mb-6 flex-1">
                {['Unlimited chambers', 'Multi-chamber dashboard', 'Cross-chamber compare', 'Fleet-wide AI insights', 'Web push to your phone', 'Team access with roles', 'Audit log', 'Remote SSH terminal'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://frutero-fleet-production.up.railway.app">
                <Button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-medium">
                  Start free trial
                </Button>
              </a>
            </div>

            {/* Farm */}
            <div className="bg-[#1a2129] border border-[#242d36] rounded-xl p-8 flex flex-col">
              <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Farm</div>
              <div className="text-5xl font-bold text-[#e5e7eb] mb-1 leading-none">$19</div>
              <div className="text-sm text-[#6b7280] mb-6">per chamber / month</div>
              <ul className="space-y-3 mb-6 flex-1">
                {['Everything in Grower', 'API access', 'Priority support', 'Custom integrations', 'Onboarding call', 'SLA guarantee'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:henrybarefoot1987@gmail.com">
                <Button variant="outline" className="w-full border-[#242d36] bg-transparent text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-[#1a2129] hover:border-[#2d3748]">
                  Contact us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 tracking-tight">Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#1a2129] border border-[#242d36] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-[#e5e7eb] hover:bg-[#1e2730] transition-colors"
                >
                  {faq.q}
                  <span className={`text-lg transition-colors ${openFaq === i ? 'text-[#22c55e]' : 'text-[#6b7280]'}`}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-4 text-sm text-[#9ca3af] leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Stop checking humidifiers one by one.</h2>
          <p className="text-base text-[#9ca3af] mb-8">Get the free controller now. Upgrade to Fleet when you outgrow the kitchen counter.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="https://frutero-fleet-production.up.railway.app">
              <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-medium px-5 py-2.5 h-auto rounded-lg">
                Start free trial
              </Button>
            </a>
            <a href="https://github.com/HBarefoot/frutero" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[#242d36] bg-[#1a2129] text-[#e5e7eb] hover:bg-[#1e2730] hover:border-[#2d3748] px-5 py-2.5 h-auto rounded-lg font-medium">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#242d36] py-10">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-sm">
              <LogoIcon />
              <span>frutero</span>
            </div>
            <div className="flex gap-5">
              <a href="https://github.com/HBarefoot/frutero" target="_blank" rel="noopener noreferrer" className="text-xs text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">GitHub</a>
              <a href="https://frutero-fleet-production.up.railway.app" className="text-xs text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">Dashboard</a>
              <a href="mailto:henrybarefoot1987@gmail.com" className="text-xs text-[#9ca3af] hover:text-[#e5e7eb] transition-colors">Contact</a>
            </div>
            <p className="text-xs text-[#6b7280]">Open source. Built by growers, for growers. — Built by Henry, maintained by Waldo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
