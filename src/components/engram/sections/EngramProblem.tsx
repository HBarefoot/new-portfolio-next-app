'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  Database,
  Pencil,
  Settings,
  Sparkles,
  GitBranch,
  Clock,
  TrendingDown,
  Layers,
} from 'lucide-react';

const existing = [
  { icon: Database, label: 'RAG (vector search over docs)' },
  { icon: FileText, label: 'Static system prompts / .claude files' },
  { icon: MessageSquare, label: 'Conversation history (context window)' },
  { icon: Pencil, label: "Manual memory edits (Claude's memory)" },
  { icon: Settings, label: '.cursorrules / project configs' },
];

const engramSolves = [
  { icon: Sparkles, label: 'Captures what your agent chooses to remember' },
  { icon: GitBranch, label: 'Detects duplicates and contradictions automatically' },
  { icon: Layers, label: 'Prioritizes relevant memory by context' },
  { icon: TrendingDown, label: 'Decays outdated info automatically' },
  { icon: Clock, label: 'Works across agents, not locked to one platform' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function EngramProblem() {
  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            AI memory is{' '}
            <span className="text-muted-foreground line-through">broken</span>{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              fixable
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every tool tries to solve memory differently. None of them get it
            right.
          </p>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* What Exists */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card/50 p-8"
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What Exists Today
            </h3>
            <ul className="space-y-4">
              {existing.map((item) => (
                <motion.li
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
                  <span className="text-muted-foreground">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* What Engram Does */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-8"
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              What Engram Does
            </h3>
            <ul className="space-y-4">
              {engramSolves.map((item) => (
                <motion.li
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-foreground">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
