'use client';

import { motion } from 'framer-motion';
import { Brain, Download, Github, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EngramHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/15" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/images/engram/engram_logo_dark_bg_1770436697879.png"
            alt="Engram logo"
            width={120}
            height={120}
            priority
            className="mx-auto h-24 w-24 rounded-full sm:h-28 sm:w-28"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 ring-1 ring-inset ring-cyan-500/20 dark:text-cyan-400">
            <Brain className="h-4 w-4" />
            v1.1 — Desktop App Now Available
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Your AI finally{' '}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
            remembers you
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg leading-8 text-muted-foreground"
        >
          Engram gives AI agents persistent, cross-session memory. Stop
          re-explaining your codebase, preferences, and context. Works with
          Claude, Cursor, ChatGPT, and any MCP-compatible tool.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-mono text-sm text-muted-foreground/60"
        >
          SQLite for agent state. Local-first. Open source.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="https://github.com/HBarefoot/engram/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-colors hover:bg-cyan-400"
          >
            <Download className="h-4 w-4" />
            Download for Mac
          </Link>

          <div className="flex items-center gap-2 rounded-lg bg-muted/80 px-4 py-3 font-mono text-sm text-foreground/80 ring-1 ring-border">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <code>npm install -g @hbarefoot/engram</code>
          </div>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Link
            href="https://github.com/HBarefoot/engram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
