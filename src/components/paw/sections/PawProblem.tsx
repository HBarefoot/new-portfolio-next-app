'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Puzzle,
  Wrench,
  Brain,
  GitBranch,
  Database,
  Sparkles,
} from 'lucide-react';

const existing = [
  { icon: Code2, label: 'Hard-coded prompts glued to one provider' },
  { icon: Terminal, label: 'CLI scripts that lose context between runs' },
  { icon: Cpu, label: 'Custom wrappers around the OpenAI API' },
  { icon: Layers, label: 'RAG pipelines that forget session state' },
  { icon: Wrench, label: 'Plugin systems you outgrow in a week' },
];

const pawSolves = [
  { icon: Brain, label: 'Pluggable providers — switch Claude/Ollama/OpenAI/Gemini live' },
  { icon: Database, label: 'Hybrid vector + full-text memory that persists across sessions' },
  { icon: Sparkles, label: 'Skills load on demand — keeps token usage low' },
  { icon: Puzzle, label: 'Drop-in plugin discovery from a single folder' },
  { icon: GitBranch, label: 'MCP support over stdio, SSE, and HTTP transports' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function PawProblem() {
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
            AI agent frameworks are{' '}
            <span className="text-muted-foreground line-through">stuck</span>{' '}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
              shipping
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every framework picks a lane. Paw stays out of yours.
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

          {/* What Paw Does */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-8"
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              What Paw Does
            </h3>
            <ul className="space-y-4">
              {pawSolves.map((item) => (
                <motion.li
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                  <span className="text-foreground/90">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
