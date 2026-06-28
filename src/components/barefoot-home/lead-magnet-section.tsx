"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { submitAudit } from "@/actions/submit-audit"

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function LeadMagnetSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await submitAudit({
        email,
        leadSource: 'Blueprint Download',
        auditData: {},
      })

      if (!response.success) {
        throw new Error(response.message || 'Something went wrong. Please try again.')
      }

      // GTM: Track successful lead generation
      try {
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'generate_lead',
            lead_source: 'blueprint_download',
            contact_id: response.id || 'unknown'
          });
        }
      } catch (e) {
        console.warn("GTM tracking skipped", e);
      }

      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      console.error(err)
      setError("Failed to submit. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <FileText className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Is your organization ready for AI?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            A short, practical assessment to find where AI can help your team — and where it can&apos;t yet.
          </p>

          {/* TODO(owner): the actual assessment asset is new content the owner must
              create. The form below is wired (captures email → submitAudit), but no
              assessment/guide file is delivered yet. Wire the delivery once the asset
              exists. Do not generate the assessment content here. */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30 sm:w-72"
                />
                <Button type="submit" size="lg" className="group h-11" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      Get the Assessment
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
              {error && (
                <p className="mt-3 text-xs text-destructive text-center">
                  {error}
                </p>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              {/* TODO(owner): update confirmation once the assessment asset/flow exists.
                  Kept neutral so it doesn't promise an asset that isn't delivered yet. */}
              <p className="text-foreground font-medium">{"Thanks — we'll be in touch shortly."}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
