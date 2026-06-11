"use client";

import { motion } from "framer-motion";
import { Github, Terminal, BookOpen, FileText, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PawCTA() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText("curl -fsSL https://paw.sh/install | bash");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <section className="relative px-6 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ship an agent in{" "}
            <span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-emerald-300">
              an afternoon
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One install command. Bun runtime. Open source.
          </p>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={copyCommand}
            className="flex items-center gap-2 rounded-lg bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-400"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Install Command"}
          </button>

          <div className="flex items-center gap-2 rounded-lg bg-muted/80 px-4 py-3 font-mono text-sm text-foreground/80 ring-1 ring-border">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <code>curl -fsSL https://paw.sh/install | bash</code>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <Link
            href="https://github.com/HBarefoot/paw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href="https://www.npmjs.com/package/@henrybarefoot/paw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            npm
          </Link>
          <Link
            href="https://wiki.henrybarefoot.com/en/projects/paw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Docs
          </Link>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 font-mono text-xs text-muted-foreground/60"
        >
          MIT licensed. Built with Bun. Shipped in public.
        </motion.p>
      </div>
    </section>
  );
}
