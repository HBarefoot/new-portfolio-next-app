'use client';

import { motion } from 'framer-motion';
import { Bot, Check, Settings, Plug } from 'lucide-react';

const agents = [
  { name: 'Claude Desktop', status: 'auto' as const, note: 'One-click connect', icon: Bot },
  { name: 'Claude Code', status: 'auto' as const, note: 'One-click connect', icon: Bot },
  { name: 'Cursor', status: 'auto' as const, note: 'One-click connect', icon: Bot },
  { name: 'Windsurf', status: 'auto' as const, note: 'One-click connect', icon: Bot },
  { name: 'ChatGPT', status: 'manual' as const, note: 'Setup guide provided', icon: Settings },
  { name: 'n8n', status: 'rest' as const, note: 'HTTP integration', icon: Plug },
  { name: 'Custom MCP', status: 'auto' as const, note: 'Any MCP client', icon: Plug },
];

const statusConfig = {
  auto: { label: 'Auto-config', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: Check },
  manual: { label: 'Manual', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', icon: Settings },
  rest: { label: 'REST API', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Plug },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function EngramAgents() {
  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Works with your{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              favorite agents
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Auto-configures for most tools. One shared memory across all of
            them.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {agents.map((agent) => {
            const status = statusConfig[agent.status];
            return (
              <motion.div
                key={agent.name}
                variants={itemVariants}
                className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-border/80 hover:bg-card/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <agent.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold">{agent.name}</h4>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}
                    >
                      <status.icon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {agent.note}
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
