'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Terminal, Package, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { ENGRAM_PACKAGE_SIZE } from '@/lib/engram';

const tabs = [
  { id: 'cli', label: 'CLI Install', icon: Terminal },
  { id: 'npm', label: 'npm Package', icon: Package },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function EngramInstall() {
  const [activeTab, setActiveTab] = useState<TabId>('cli');
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
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              seconds
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose your preferred installation method.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="mb-8 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/10 text-cyan-600 ring-1 ring-cyan-500/30 dark:text-cyan-400'
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
          {activeTab === 'cli' ? (
            <motion.div
              key="cli"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border bg-card/50 p-8"
            >
              <div className="mb-8 text-center">
                <span className="mb-3 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                  Recommended
                </span>
                <p className="text-muted-foreground">
                  One command. Works on macOS, Linux, and Windows (WSL).
                </p>
              </div>

              {/* Steps */}
              <div className="mb-8 grid gap-6 sm:grid-cols-3">
                {[
                  { step: '1', title: 'Install', desc: 'npm install -g @hbarefoot/engram' },
                  { step: '2', title: 'Start', desc: 'engram start' },
                  { step: '3', title: 'Connect', desc: 'Auto-detects your agents' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {item.step}
                    </div>
                    <h4 className="mb-1 font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Install command */}
              <div className="mb-4 overflow-hidden rounded-lg bg-secondary p-4 ring-1 ring-border dark:bg-[#0d1117]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    Install
                  </span>
                  <button
                    onClick={() =>
                      copyCommand('npm install -g @hbarefoot/engram')
                    }
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <code className="text-cyan-600 dark:text-green-400">
                    npm install -g @hbarefoot/engram
                  </code>
                </div>
              </div>

              {/* Start command */}
              <div className="mb-6 overflow-hidden rounded-lg bg-secondary p-4 ring-1 ring-border dark:bg-[#0d1117]">
                <span className="mb-3 block font-mono text-xs text-muted-foreground">
                  Start the server
                </span>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <code className="text-cyan-600 dark:text-green-400">
                    engram start
                  </code>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground/60">
                Requires Node.js 20+ · {ENGRAM_PACKAGE_SIZE}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="npm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border bg-card/50 p-8"
            >
              <div className="mb-8 text-center">
                <p className="text-muted-foreground">
                  Add to your project as a dependency.
                </p>
              </div>

              {/* Install command */}
              <div className="mb-4 overflow-hidden rounded-lg bg-secondary p-4 ring-1 ring-border dark:bg-[#0d1117]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    Install locally
                  </span>
                  <button
                    onClick={() =>
                      copyCommand('npm install @hbarefoot/engram')
                    }
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <code className="text-cyan-600 dark:text-green-400">
                    npm install @hbarefoot/engram
                  </code>
                </div>
              </div>

              {/* Usage */}
              <div className="mb-6 overflow-hidden rounded-lg bg-secondary p-4 ring-1 ring-border dark:bg-[#0d1117]">
                <span className="mb-3 block font-mono text-xs text-muted-foreground">
                  Usage
                </span>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <code className="text-cyan-600 dark:text-green-400">
                    import {'{ remember, recall }'} from '@hbarefoot/engram';
                  </code>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground/60">
                Node.js 20+ required · ESM modules
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
