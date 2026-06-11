"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Terminal, Package, Check, Copy, GitBranch } from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "curl", label: "Curl Install", icon: Terminal },
  { id: "git", label: "From Source", icon: GitBranch },
  { id: "npm", label: "npm Package", icon: Package },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function PawInstall() {
  const [activeTab, setActiveTab] = useState<TabId>("curl");
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const commands: Record<TabId, { label: string; cmd: string; note?: string }[]> = {
    curl: [
      { label: "Install", cmd: "curl -fsSL https://paw.sh/install | bash", note: "Recommended" },
      { label: "Start", cmd: "paw start" },
      { label: "Open UI", cmd: "open http://localhost:3030" },
    ],
    git: [
      { label: "Clone", cmd: "git clone https://github.com/HBarefoot/paw.git" },
      { label: "Install", cmd: "cd paw && bun install" },
      { label: "Start", cmd: "bun run dev" },
    ],
    npm: [
      { label: "Install", cmd: "npm install -g @henrybarefoot/paw" },
      { label: "Start", cmd: "paw start" },
    ],
  };

  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Get started in{" "}
            <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
              one command
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three install paths. Pick the one that fits your workflow.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/30 dark:text-violet-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-border bg-card/50 p-8"
          >
            <div className="mb-8 text-center">
              {commands[activeTab][0].note && (
                <span className="mb-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {commands[activeTab][0].note}
                </span>
              )}
              <p className="text-muted-foreground">
                {activeTab === "curl" && "One command. Works on macOS, Linux, and WSL."}
                {activeTab === "git" && "For contributors and tinkerers. Bun 1.x required."}
                {activeTab === "npm" && "Global install via npm. Auto-updates on version bump."}
              </p>
            </div>

            {/* Command steps */}
            <div className="space-y-3">
              {commands[activeTab].map((item, index) => {
                const key = `${activeTab}-${index}`;
                return (
                  <div key={key} className="group">
                    <div className="mb-1 flex items-center justify-between px-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {index + 1}. {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-3 font-mono text-sm transition-colors group-hover:border-violet-500/30">
                      <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <code className="flex-1 overflow-x-auto text-foreground/80">
                        {item.cmd}
                      </code>
                      <button
                        onClick={() => copyCommand(item.cmd, key)}
                        className="shrink-0 rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Copy command"
                      >
                        {copied === key ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Requirements footer */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>macOS 12+</span>
              <span className="text-border">•</span>
              <span>Linux x64 / arm64</span>
              <span className="text-border">•</span>
              <span>Windows (WSL2)</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer link */}
        <div className="mt-8 text-center">
          <Link
            href="https://github.com/HBarefoot/paw#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            Full installation guide in the README
          </Link>
        </div>
      </div>
    </section>
  );
}
