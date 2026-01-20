"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/50 bg-background py-12"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Barefoot Digital
            </span>
            <p className="text-sm text-muted-foreground">
              AI-powered automation for logistics & fintech.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="#services"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="#work"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/strategy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Barefoot Digital. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
