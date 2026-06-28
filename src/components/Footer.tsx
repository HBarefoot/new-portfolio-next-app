"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { PrivacyChoices } from "@/components/PrivacyChoices"

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
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <PrivacyChoices className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer" />
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-8 text-center">
          {/* Trust line — plain-language data-protection practices. Scoped to
              paid client engagements; not a statement about website analytics
              or lead-form data. Keep claims verbatim and literally true. */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span>GDPR &amp; CCPA rights respected</span>
            <span aria-hidden="true">·</span>
            <span>We don&apos;t train AI models on client data</span>
            <span aria-hidden="true">·</span>
            <span>Client data stays in your own infrastructure</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {new Date().getFullYear()} Barefoot Digital. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
