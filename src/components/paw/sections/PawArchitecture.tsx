"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const layers = [
  {
    label: "Interfaces",
    color: "border-violet-500/40 bg-violet-500/5",
    labelColor: "text-violet-600 dark:text-violet-400",
    items: ["MCP Server", "REST API", "Web UI", "CLI"],
  },
  {
    label: "Kernel",
    color: "border-emerald-500/40 bg-emerald-500/5",
    labelColor: "text-emerald-600 dark:text-emerald-400",
    items: ["Provider Router", "Skill Loader", "Tool Registry", "Memory Engine", "Cron + Webhooks"],
  },
  {
    label: "Core Services",
    color: "border-blue-500/40 bg-blue-500/5",
    labelColor: "text-blue-600 dark:text-blue-400",
    items: ["Embeddings (local)", "Vector Store", "Audit Log", "Vault", "Canvas Engine"],
  },
  {
    label: "Runtime",
    color: "border-amber-500/40 bg-amber-500/5",
    labelColor: "text-amber-600 dark:text-amber-400",
    items: ["Bun", "TypeScript", "SQLite + sqlite-vec"],
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
            Four-layer{" "}
            <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
              architecture
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Small surface area. Clean boundaries. Every layer swappable.
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
                  {index === 0 && (
                    <span className="font-mono text-xs text-muted-foreground/50">
                      you talk to this
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

        {/* Provider matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-border bg-card/50 p-6"
        >
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Provider Matrix
          </h3>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
              <span className="font-mono">Anthropic</span>
              <span className="text-xs text-muted-foreground">native</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
              <span className="font-mono">OpenAI</span>
              <span className="text-xs text-muted-foreground">native + o1</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
              <span className="font-mono">Google</span>
              <span className="text-xs text-muted-foreground">native</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
              <span className="font-mono">Ollama</span>
              <span className="text-xs text-muted-foreground">local</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            All providers implement the same interface. Switch by config, not
            refactor.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
