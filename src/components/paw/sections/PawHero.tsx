'use client';

import { motion } from 'framer-motion';
import { Github, Terminal, Copy, Check, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PAW_LOGO_URL =
  'https://cms.henrybarefoot.com/uploads/paw_logo_blue_border_1771467263800_1027fe5096.webp';

export default function PawHero() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(
        'git clone https://github.com/HBarefoot/paw && cd paw && bun install && bun start',
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/15" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Logo — circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div
            className="relative h-28 w-28 sm:h-32 sm:w-32"
            style={{
              boxShadow:
                '0 0 0 1px rgba(124,92,255,0.35), 0 0 40px rgba(124,92,255,0.25), 0 0 80px rgba(0,255,163,0.12)',
              borderRadius: '9999px',
            }}
          >
            <Image
              src={PAW_LOGO_URL}
              alt="Paw logo"
              width={128}
              height={128}
              priority
              unoptimized
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-600 ring-1 ring-inset ring-violet-500/20 dark:text-violet-400">
            <Bot className="h-4 w-4" />
            v0.1.0 — Open Source Agent Framework
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Your AI, your{' '}
          <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
            framework
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg leading-8 text-muted-foreground"
        >
          Paw is a personal AI agent framework. Multi-provider, MCP-native,
          with a live canvas, on-demand skills, vector memory, cron scheduling,
          and a full web UI. Built with Bun, runs anywhere.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-mono text-sm text-muted-foreground/60"
        >
          Bun runtime. Local-first. Pluggable. Open source.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={copyCommand}
            className="flex items-center gap-2 rounded-lg bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-400"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Install Command'}
          </button>

          <div className="flex items-center gap-2 rounded-lg bg-muted/80 px-4 py-3 font-mono text-sm text-foreground/80 ring-1 ring-border">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <code>bun install &amp;&amp; bun start</code>
          </div>

          <Link
            href="https://github.com/HBarefoot/paw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-5 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-card hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { label: 'Providers', value: '4+' },
            { label: 'MCP transport', value: 'stdio · SSE · HTTP' },
            { label: 'Memory', value: 'Hybrid vector + FTS' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
