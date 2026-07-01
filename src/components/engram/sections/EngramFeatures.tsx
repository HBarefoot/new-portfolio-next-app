'use client';

import { motion } from 'framer-motion';
import { Brain, Search, Cpu, Shield, Layout, Plug, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Hybrid Memory Retrieval',
    description:
      'Combines semantic similarity, recency, confidence, and access patterns for contextual recall.',
    stat: '5-layer scoring',
  },
  {
    icon: Search,
    title: 'Full-Text Search',
    description:
      'SQLite FTS5 for instant keyword search across all memories.',
    stat: 'FTS5 native',
  },
  {
    icon: Cpu,
    title: 'Local Embeddings',
    description:
      'all-MiniLM-L6-v2 runs locally (~23MB). No API keys, no cloud, works offline.',
    stat: '~23MB model',
  },
  {
    icon: Shield,
    title: 'Secret Detection',
    description:
      'Automatic detection and redaction of API keys, passwords, and credentials.',
    stat: 'Never stores secrets',
  },
  {
    icon: Layout,
    title: 'Web Dashboard',
    description:
      'Modern React UI for visualizing, searching, and managing memories.',
    stat: 'Vite + React',
  },
  {
    icon: Plug,
    title: 'MCP + REST API',
    description:
      '6 MCP tools for Claude/Cursor. Full REST API for n8n, LangChain, custom agents.',
    stat: '6 MCP tools',
  },
  {
    icon: Sparkles,
    title: 'Optional On-Device LLM',
    description:
      'Sharpen extraction with a local model — recommended henrybarefoot1987/engram-extract (Qwen3-1.7B, Apache-2.0), or any Ollama / OpenAI-compatible endpoint. +50 pts entity recognition vs rules; runs 100% on your machine; off by default.',
    stat: 'Optional · local',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EngramFeatures() {
  return (
    <section className="relative px-6 py-24 lg:px-8">
      {/* Subtle gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Built for{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              developers
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need for persistent AI memory, nothing you don&apos;t.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-cyan-500/30 hover:bg-card/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                <feature.icon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              {feature.stat && (
                <div className="mt-4 inline-flex items-center rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  {feature.stat}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
