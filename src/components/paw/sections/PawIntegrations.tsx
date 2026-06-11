"use client";

import { motion } from "framer-motion";
import {
  Check,
  Github,
  Slack,
  Cloud,
  Database,
  Globe,
  Mail,
  MessageSquare,
  Wrench,
  Boxes,
  Plug,
  Workflow,
} from "lucide-react";

const providers = [
  { name: "Anthropic Claude", category: "model" as const, note: "Sonnet, Opus, Haiku" },
  { name: "OpenAI", category: "model" as const, note: "GPT-4o, o1, o3-mini" },
  { name: "Google Gemini", category: "model" as const, note: "Pro, Flash, Nano" },
  { name: "Ollama", category: "model" as const, note: "Local models, no API key" },
];

const integrations = [
  { name: "GitHub", icon: Github, category: "tool" as const, note: "Repos, issues, PRs" },
  { name: "Slack", icon: Slack, category: "tool" as const, note: "Channels, DMs, reactions" },
  { name: "Gmail", icon: Mail, category: "tool" as const, note: "Read, draft, send" },
  { name: "Notion", icon: Boxes, category: "tool" as const, note: "Pages, databases" },
  { name: "Postgres", icon: Database, category: "tool" as const, note: "Query, schema, migrations" },
  { name: "Web Search", icon: Globe, category: "tool" as const, note: "SerpAPI, Brave, Tavily" },
  { name: "Discord", icon: MessageSquare, category: "tool" as const, note: "Servers, channels" },
  { name: "AWS S3", icon: Cloud, category: "tool" as const, note: "Buckets, signed URLs" },
  { name: "Any MCP", icon: Plug, category: "mcp" as const, note: "Drop-in via stdio" },
];

const categoryConfig = {
  model: {
    label: "Model",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
  },
  tool: {
    label: "Tool",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  mcp: {
    label: "MCP",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function PawIntegrations() {
  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Plugs into{" "}
            <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
              everything
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Swap models. Wire tools. Drop in any MCP server. Paw meets your
            stack where it lives.
          </p>
        </motion.div>

        {/* Models row */}
        <div className="mb-12">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Models
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {providers.map((provider) => {
              const cat = categoryConfig[provider.category];
              return (
                <motion.div
                  key={provider.name}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-violet-500/30 hover:bg-card/80"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold">{provider.name}</h4>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cat.bg} ${cat.color}`}
                    >
                      <Check className="h-3 w-3" />
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{provider.note}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Tools grid */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tools &amp; Integrations
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {integrations.map((integration) => {
              const cat = categoryConfig[integration.category];
              return (
                <motion.div
                  key={integration.name}
                  variants={itemVariants}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-border/80 hover:bg-card/80"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <integration.icon className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold">{integration.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {integration.note}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cat.bg} ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 text-center"
        >
          <Wrench className="mx-auto mb-3 h-6 w-6 text-violet-600 dark:text-violet-400" />
          <p className="text-sm text-foreground/80">
            Missing a tool? Write a 30-line MCP server and Paw picks it up
            automatically. No framework changes required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
