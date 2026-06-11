'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const layers = [
  {
    label: 'Interfaces',
    color: 'border-cyan-500/40 bg-cyan-500/5',
    labelColor: 'text-cyan-600 dark:text-cyan-400',
    items: ['MCP Server', 'REST API', 'CLI', 'Dashboard'],
  },
  {
    label: 'Core Engine',
    color: 'border-blue-500/40 bg-blue-500/5',
    labelColor: 'text-blue-600 dark:text-blue-400',
    items: ['recall', 'store', 'embed', 'extract', 'consolidate'],
  },
  {
    label: 'Storage',
    color: 'border-purple-500/40 bg-purple-500/5',
    labelColor: 'text-purple-600 dark:text-purple-400',
    items: ['SQLite (~/.engram/memory.db)', 'FTS5 Index', 'Embeddings'],
  },
];

export default function EngramArchitecture() {
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
            Three-layer{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              architecture
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, composable, and runs entirely on your machine.
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
              transition={{ delay: index * 0.15 }}
            >
              <div className={`rounded-xl border p-6 ${layer.color}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${layer.labelColor}`}
                  >
                    {layer.label}
                  </span>
                  {index < layers.length - 1 && (
                    <span className="font-mono text-xs text-muted-foreground/50">
                      &darr;
                    </span>
                  )}
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

        {/* MCP Tools reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-border bg-card/50 p-6"
        >
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            MCP Tools (6)
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: 'engram_remember', desc: 'Store a memory with content, context, and tags' },
              { name: 'engram_recall', desc: 'Get relevant memories based on query' },
              { name: 'engram_forget', desc: 'Remove a memory by ID' },
              { name: 'engram_status', desc: 'Health check and stats' },
              { name: 'engram_feedback', desc: 'Mark memories as helpful/unhelpful' },
              { name: 'engram_context', desc: 'Generate pre-formatted context blocks' },
            ].map((tool) => (
              <div key={tool.name} className="flex items-start gap-3">
                <code className="shrink-0 rounded bg-muted px-2 py-0.5 font-mono text-xs text-cyan-600 dark:text-cyan-400">
                  {tool.name}
                </code>
                <span className="text-xs text-muted-foreground">
                  {tool.desc}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
