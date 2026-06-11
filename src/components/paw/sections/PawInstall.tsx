'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Package, GitBranch, Check, Copy } from 'lucide-react';

const tabs = [
  { id: 'quickstart', label: 'Quick Start', icon: Terminal },
  { id: 'docker', label: 'Docker', icon: Package },
  { id: 'clone', label: 'From Source', icon: GitBranch },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function PawInstall() {
  const [activeTab, setActiveTab] = useState<TabId>('quickstart');
  const [copied, setCopied] = useState(false);

  const copyCommand = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const content = {
    quickstart: {
      recommended: true,
      intro: 'Three commands. Up and running in under a minute.',
      steps: [
        { step: '1', title: 'Clone', desc: 'git clone … && cd paw' },
        { step: '2', title: 'Install', desc: 'bun install' },
        { step: '3', title: 'Init', desc: 'bun run bin/paw.ts init' },
        { step: '4', title: 'Start', desc: 'bun start' },
      ],
      command: 'git clone https://github.com/HBarefoot/paw && cd paw && bun install && bun start',
      footer: 'Requires Bun 1.1+ · runs on macOS, Linux, and Windows (WSL)',
    },
    docker: {
      recommended: false,
      intro: 'Run Paw in a container. No local runtime required.',
      steps: [
        { step: '1', title: 'Pull', desc: 'docker pull …' },
        { step: '2', title: 'Config', desc: 'Mount ~/.paw' },
        { step: '3', title: 'Run', desc: 'docker run -p 3000:3000 …' },
      ],
      command: 'docker run -p 3000:3000 -v ~/.paw:/root/.paw ghcr.io/hbarefoot/paw:latest',
      footer: 'Image: ghcr.io/hbarefoot/paw · port 3000 exposed',
    },
    clone: {
      recommended: false,
      intro: 'Build from source. Full control, latest commits.',
      steps: [
        { step: '1', title: 'Clone', desc: 'git clone …' },
        { step: '2', title: 'Install', desc: 'bun install' },
        { step: '3', title: 'Dev', desc: 'bun run dev' },
      ],
      command: 'git clone https://github.com/HBarefoot/paw && cd paw && bun install && bun run dev',
      footer: 'Use this branch if you want auto-reload during development',
    },
  };

  const current = content[activeTab];

  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Get started in{' '}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
              minutes
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose your preferred install method.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/30 dark:text-violet-400'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-border bg-card/50 p-8"
          >
            <div className="mb-8 text-center">
              {current.recommended && (
                <span className="mb-3 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                  Recommended
                </span>
              )}
              <p className="text-muted-foreground">{current.intro}</p>
            </div>

            {/* Steps */}
            <div className={`mb-8 grid gap-6 ${activeTab === 'quickstart' ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
              {current.steps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-600 dark:text-violet-400">
                    {item.step}
                  </div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Command box */}
            <div className="mb-4 flex items-center justify-between rounded-lg bg-zinc-950 px-4 py-3 ring-1 ring-zinc-800">
              <code className="overflow-x-auto font-mono text-sm text-zinc-100">
                <span className="text-violet-400">$</span> {current.command}
              </code>
              <button
                onClick={() => copyCommand(current.command)}
                className="ml-4 shrink-0 rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                aria-label="Copy command"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              {current.footer}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
