'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const layers = [
  {
    label: 'Interfaces',
    color: 'border-violet-500/40 bg-violet-500/5',
    labelColor: 'text-violet-600 dark:text-violet-400',
    items: ['Web UI', 'CLI', 'Slack Plugin', 'REST API'],
  },
  {
    label: 'Agent Core',
    color: 'border-cyan-500/40 bg-cyan-500/5',
    labelColor: 'text-cyan-600 dark:text-cyan-400',
    items: ['Skills Router', 'Provider Adapter', 'Memory Pipeline', 'Plugin Loader', 'Cron Engine'],
  },
  {
    label: 'Tool Layer',
    color: 'border-blue-500/40 bg-blue-500/5',
    labelColor: 'text-blue-600 dark:text-blue-400',
    items: ['Built-in Tools', 'MCP Servers (stdio · SSE · HTTP)', 'Plugin Tools', 'Web Pilot (Playwright)'],
  },
  {
    label: 'Storage',
    color: 'border-purple-500/40 bg-purple-500/5',
    labelColor: 'text-purple-600 dark:text-purple-400',
    items: ['SQLite + sqlite-vec', 'FTS5 Index', '~/.paw/config.json', 'Credential Store'],
  },
];

export default function PawArchitecture() {
  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Four-layer{' '}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
              architecture
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Composable, observable, and runs entirely on your machine.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="space-y-4">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <div className={`rounded-xl border p-6 ${layer.color}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${layer.labelColor}`}
                  >
                    {layer.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-muted/80 px-3 py-1.5 font-mono text-xs text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connector arrow */}
              {index < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-4 w-4 text-border" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Web UI reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-border bg-card/50 p-6"
        >
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Web UI Pages
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {[
              { path: '/', label: 'Dashboard' },
              { path: '/chat', label: 'Chat' },
              { path: '/canvas', label: 'Canvas' },
              { path: '/memory', label: 'Memory' },
              { path: '/sessions', label: 'Sessions' },
              { path: '/skills', label: 'Skills' },
              { path: '/cron', label: 'Cron' },
              { path: '/mcp', label: 'MCP' },
              { path: '/config', label: 'Config' },
            ].map((page) => (
              <div
                key={page.path}
                className="rounded-md bg-muted/50 px-2 py-1.5 font-mono text-xs text-foreground/70"
              >
                <span className="text-violet-600 dark:text-violet-400">{page.path}</span>
                <span className="ml-1.5 text-muted-foreground/70">{page.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
