"use client";

import { motion } from "framer-motion";
import { Download, Github, Terminal, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PawHero() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText("git clone https://github.com/HBarefoot/paw.git && cd paw && bun install");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full ring-1 ring-violet-500/30 shadow-[0_0_40px_rgba(124,92,255,0.25)]">
            <img
              src="https://cms.henrybarefoot.com/uploads/paw_logo_blue_border_1771467263800_1027fe5096.webp"
              alt="Paw"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-600 ring-1 ring-inset ring-violet-500/20 dark:text-violet-400">
            <Terminal className="h-4 w-4" />
            v0.x — Open Source Agent Framework
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Your AI agent,{" "}
          <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
            your stack
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg leading-8 text-muted-foreground"
        >
          Paw is a personal AI agent framework: multi-provider, MCP-native, with
          a live canvas, on-demand skills, vector memory, and a web UI. Bring
          Claude, GPT, Gemini, or Ollama. Swap them anytime.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-mono text-sm text-muted-foreground/60"
        >
          Bun runtime. MCP-native. Skills on demand. Open source.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={copyCommand}
            className="flex items-center gap-2 rounded-lg bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-400"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Install Command"}
          </button>

          <Link
            href="https://github.com/HBarefoot/paw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:border-violet-500/30 hover:bg-card/80"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </motion.div>

        {/* Command preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 font-mono text-sm"
        >
          <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
          <code className="flex-1 overflow-x-auto whitespace-nowrap text-foreground/80">
            git clone https://github.com/HBarefoot/paw.git && cd paw && bun install
          </code>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            { label: "Providers", value: "4+" },
            { label: "MCP Tools", value: "30+" },
            { label: "Skills", value: "On demand" },
            { label: "License", value: "MIT" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
