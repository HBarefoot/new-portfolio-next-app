"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Cloud,
  Code2,
  Boxes,
  Wrench,
  Sparkles,
  Layers,
  Plug,
  Cpu,
  Workflow,
} from "lucide-react";

const existing = [
  { icon: Lock, label: "Vendor lock-in (one provider, one model)" },
  { icon: Cloud, label: "Cloud-only agent platforms (no local-first)" },
  { icon: Code2, label: "Glue code in every project to wire tools together" },
  { icon: Boxes, label: "Monolithic frameworks that do too much" },
  { icon: Wrench, label: "Hard-coded skills you can't add or remove" },
];

const pawSolves = [
  { icon: Sparkles, label: "Multi-provider routing: Claude, GPT, Gemini, Ollama" },
  { icon: Layers, label: "Local-first kernel with a live web UI" },
  { icon: Plug, label: "MCP-native — add any tool with one line" },
  { icon: Cpu, label: "Skills activate on demand, no restart required" },
  { icon: Workflow, label: "Cron, webhooks, and a canvas for visual workflows" },
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
            Building AI agents is{" "}
            <span className="text-muted-foreground line-through">hard</span>{" "}
            <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
              composable
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every framework picks its own model, its own tools, its own UI. Paw
            gives you the pieces without the lock-in.
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
