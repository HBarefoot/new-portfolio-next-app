"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Plug,
  Sparkles,
  Database,
  Layout,
  Clock,
  Wrench,
  Boxes,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Multi-Provider Routing",
    description:
      "Claude, OpenAI, Gemini, and Ollama in one config. Switch models per request, fall back automatically on errors.",
    stat: "4 providers",
  },
  {
    icon: Plug,
    title: "MCP-Native",
    description:
      "First-class Model Context Protocol support. Add any MCP server with one line — tools stream in instantly.",
    stat: "30+ MCP tools",
  },
  {
    icon: Sparkles,
    title: "On-Demand Skills",
    description:
      "Skills are plugins that activate when needed. Write TypeScript, drop it in, the agent picks it up.",
    stat: "Plugin system",
  },
  {
    icon: Database,
    title: "Vector Memory",
    description:
      "Long-term memory with semantic recall. The agent remembers your preferences, your codebase, your past work.",
    stat: "Vector + metadata",
  },
  {
    icon: Layout,
    title: "Live Canvas",
    description:
      "A web UI for visual workflows, canvas pages, and human-in-the-loop approvals. Edit and ship in one place.",
    stat: "Visual editor",
  },
  {
    icon: Clock,
    title: "Cron + Webhooks",
    description:
      "Schedule agent runs with cron. Trigger them from external services with webhooks. Proactive triggers built in.",
    stat: "Scheduled jobs",
  },
  {
    icon: Wrench,
    title: "Tool SDK",
    description:
      "Define a tool once, expose it via MCP, REST, and the canvas. Type-safe, with permission gates and audit logs.",
    stat: "Single source of truth",
  },
  {
    icon: Boxes,
    title: "Bun Runtime",
    description:
      "Built on Bun for fast startup, native TypeScript, and a tiny memory footprint. One binary, zero ceremony.",
    stat: "Bun 1.x",
  },
  {
    icon: Globe,
    title: "Web UI + REST API",
    description:
      "Ship a UI and an API from the same config. No separate frontend/backend build pipelines to maintain.",
    stat: "Full-stack",
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
            Built for{" "}
            <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
              shipping
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to run an AI agent in production, nothing you
            don&apos;t.
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
