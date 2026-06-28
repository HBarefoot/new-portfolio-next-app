"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-background pt-24">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              AI Enablement & Engineering
            </span>
          </motion.div>

          <h1
            className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Put AI to work in your organization.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Barefoot Digital helps teams go from AI curiosity to AI in production — strategy, enablement, and the systems to back it. Built by an engineer who ships real tools, Engram and Paw, and real deployments — not slideware.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg" className="group">
              <Link href="/strategy">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#work">See What We&apos;ve Built</Link>
            </Button>
          </motion.div>

          {/* TODO(owner): Stats trust bar removed pending attributed sources.
              The previous "95% Efficiency Gain" / "$500K+ Cost Savings" numbers
              were unattributed round figures. Re-add ONLY once the owner confirms
              a real, attributable source (e.g. "Allied Yacht Transport: 95% faster
              quoting"). Do not display unattributed metrics. */}
        </div>
      </div>
    </section>
  )
}
