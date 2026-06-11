'use client';

import { motion } from 'framer-motion';
import {
  Check,
  Settings,
  Plug,
  Brain,
  Cpu,
  Sparkles,
  Code2,
  Workflow,
  Github,
  MessageSquare,
  Globe,
  Boxes,
  Webhook,
  Layers,
} from 'lucide-react';

const integrations = [
  { name: 'Claude', status: 'native' as const, note: 'claude-sonnet-4-5', icon: Brain, group: 'provider' },
  { name: 'Ollama', status: 'native' as const, note: 'Local models', icon: Cpu, group: 'provider' },
  { name: 'OpenAI', status: 'native' as const, note: 'GPT-4o, o1', icon: Sparkles, group: 'provider' },
  { name: 'Gemini', status: 'native' as const, note: 'gemini-2.0-flash', icon: Code2, group: 'provider' },
  { name: 'MCP · stdio', status: 'native' as const, note: 'Process transport', icon: Plug, group: 'mcp' },
  { name: 'MCP · SSE', status: 'native' as const, note: 'Server-sent events', icon: Webhook, group: 'mcp' },
  { name: 'MCP · HTTP', status: 'native' as const, note: 'REST transport', icon: Globe, group: 'mcp' },
  { name: 'Slack', status: 'plugin' as const, note: 'Built-in plugin', icon: MessageSquare, group: 'plugin' },
  { name: 'Web Pilot', status: 'plugin' as const, note: 'Playwright automation', icon: Workflow, group: 'plugin' },
  { name: 'Custom plugins', status: 'dropin' as const, note: 'Drop into plugins/', icon: Boxes, group: 'plugin' },
  { name: 'GitHub', status: 'mcp' as const, note: 'via MCP server', icon: Github, group: 'service' },
  { name: 'Cron scheduler', status: 'native' as const, note: 'Built-in', icon: Settings, group: 'service' },
];

const statusConfig = {
  native: { label: 'Native', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: Check },
  plugin: { label: 'Plugin', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', icon: Plug },
  dropin: { label: 'Drop-in', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', icon: Boxes },
  mcp: { label: 'MCP', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Layers },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
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
            Plays well with{' '}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
              everything
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Providers, MCP servers, plugins, services. Bring your own stack.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {integrations.map((item) => {
            const status = statusConfig[item.status];
            return (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-border/80 hover:bg-card/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}
                    >
                      <status.icon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
