"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { submitAudit } from "@/actions/submit-audit"
import { suggestEmail } from "@/lib/mailcheck"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

// Standard email format check (Layer 1 — blocking).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LeadMagnetSection() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formatError, setFormatError] = useState<string | null>(null)
  const [suggestion, setSuggestion] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear advisory/blocking messages as the user edits.
    if (formatError) setFormatError(null)
    if (error) setError(null)
    if (suggestion) setSuggestion(null)
  }

  // Layer 2 — "did you mean?" typo check on blur (advisory, non-blocking).
  const handleBlur = () => {
    setSuggestion(suggestEmail(email))
  }

  const acceptSuggestion = () => {
    if (!suggestion) return
    setEmail(suggestion)
    setSuggestion(null)
    setFormatError(null)
    inputRef.current?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Layer 1 — format check blocks submit.
    if (!EMAIL_RE.test(email.trim())) {
      setFormatError("Please enter a valid email address.")
      inputRef.current?.focus()
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await submitAudit({
        email: email.trim(),
        leadSource: 'Blueprint Download',
        auditData: {},
      })

      if (!response.success) {
        throw new Error(response.message || 'Submission failed')
      }

      // Hand off the record reference + email to the thank-you page via
      // sessionStorage (never the URL). Prefer the Strapi v5 documentId, which
      // is what the update route is keyed by; fall back to the numeric id.
      try {
        const ref = response.documentId ?? (response.id != null ? String(response.id) : null)
        if (ref) {
          sessionStorage.setItem('bf_assessment_id', ref)
        }
        sessionStorage.setItem('bf_assessment_email', email.trim())
      } catch {
        // sessionStorage unavailable — the thank-you page still shows the
        // download; only the optional company/role block is skipped.
      }

      // Conversion event — GTM maps this to Meta/LinkedIn lead tags under the
      // existing Consent Mode v2 gating. Do not fire pixels directly here.
      try {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ event: 'assessment_lead' })
      } catch (err) {
        console.warn("dataLayer push skipped", err)
      }

      router.push('/assessment/ready')
      // Keep the pending state through navigation (no reset on success).
    } catch (err) {
      console.error(err)
      setError("Something went wrong — please try again.")
      setIsLoading(false)
      // Email is preserved in state — do not clear it.
    }
  }

  const describedBy =
    [
      suggestion ? "lead-email-suggestion" : null,
      formatError ? "lead-email-error" : null,
      error ? "lead-email-submit-error" : null,
      "lead-email-note",
    ]
      .filter(Boolean)
      .join(" ")

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

          <form onSubmit={handleSubmit} className="mt-8" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <div className="sm:w-72">
                <label htmlFor="lead-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="lead-email"
                  ref={inputRef}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={describedBy}
                  aria-invalid={formatError ? true : undefined}
                  className="h-11 w-full border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30"
                />
              </div>
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

            {/* Layer 2 — advisory typo suggestion, click to accept (non-blocking) */}
            {suggestion && (
              <p id="lead-email-suggestion" className="mt-3 text-sm text-muted-foreground" aria-live="polite">
                Did you mean{" "}
                <button
                  type="button"
                  onClick={acceptSuggestion}
                  className="font-medium text-accent underline underline-offset-2 hover:text-accent/80"
                >
                  {suggestion}
                </button>
                ?
              </p>
            )}

            {/* Layer 1 — blocking format error */}
            {formatError && (
              <p id="lead-email-error" className="mt-3 text-xs text-destructive" aria-live="polite">
                {formatError}
              </p>
            )}

            {/* Submit failure */}
            {error && (
              <p id="lead-email-submit-error" className="mt-3 text-xs text-destructive" aria-live="polite">
                {error}
              </p>
            )}

            <p id="lead-email-note" className="mt-3 text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
