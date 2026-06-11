'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Search,
  Puzzle,
  Clock,
  Layout,
  Plug,
  Calendar,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Multi-Provider AI',
    description:
      'Claude, OpenAI, Ollama, Gemini. Switch providers via config — no code changes, no migrations.',
    stat: '4 providers',
  },
  {
    icon: Search,
    title: 'Hybrid Memory',
    description:
      'Vector search + full-text recall. Auto-extracts facts from conversations and persists across sessions.',
    stat: 'sqlite-vec + FTS',
  },
  {
    icon: Puzzle,
    title: 'Skills on Demand',
    description:
      'Tools grouped into skills that load only when invoked. Cuts input tokens from 15-25k to ~1k per request.',
    stat: 'Token-efficient',
  },
  {
    icon: Layout,
    title: 'Live Canvas',
    description:
      'Agent-driven visual workspace. Prompt the AI to build HTML/CSS/JS, see a live preview, iterate in real time.',
    stat: 'Split-pane',
  },
  {
    icon: Plug,
    title: 'MCP Native',
    description:
      'Connect external tool servers over stdio, SSE, or HTTP. Manage everything from the web UI.',
    stat: '3 transports',
  },
  {
    icon: Calendar,
    title: 'Cron Scheduler',
    description:
      'Schedule prompts, tool calls, or events on cron expressions. Built-in scheduler with cron UI.',
    stat: 'Cron expressions',
  },
  {
    icon: Clock,
    title: 'Plugin System',
    description:
      'Drop-in plugin discovery from a single folder. Slack and Web Pilot ship built-in.',
    stat: 'plugins/',
  },
  {
    icon: Shield,
    title: 'Production Security',
    description:
      'Rate limiting, user allowlist/blocklist, pairing-code approval, sandboxed tool execution.',
    stat: 'Pairing codes',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PawFeatures() {
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
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
              builders
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to ship an agent, nothing you don&apos;t.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-violet-500/30 hover:bg-card/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <feature.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              {feature.stat && (
                <div className="mt-4 inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-600 dark:text-violet-400">
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
