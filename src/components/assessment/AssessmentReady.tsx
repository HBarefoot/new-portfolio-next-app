"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { updateAuditSubmission } from "@/actions/update-audit";

const PDF_HREF = "/assets/ai-readiness-assessment.pdf";

// Maps to our ICP — see implementation brief §6.
const ROLES = [
  "HR / People",
  "L&D / Training",
  "IT / Engineering",
  "Operations",
  "Executive / Owner",
  "Other",
];

export default function AssessmentReady() {
  const [hydrated, setHydrated] = useState(false);
  const [recordId, setRecordId] = useState<number | null>(null);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    // The record id is passed via sessionStorage (never the URL). Absent on
    // direct navigation — in which case we hide the company/role block.
    try {
      const raw = sessionStorage.getItem("bf_assessment_id");
      const id = raw ? Number(raw) : NaN;
      if (Number.isFinite(id) && id > 0) setRecordId(id);
    } catch {
      // sessionStorage unavailable — treat as direct navigation.
    }
    setHydrated(true);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!recordId) return;

    // Optional and skippable — empty save just confirms without a write.
    if (!company.trim() && !role) {
      setSaved(true);
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      const res = await updateAuditSubmission(recordId, {
        company: company.trim() || undefined,
        role: role || undefined,
      });
      if (res.success) {
        setSaved(true);
      } else {
        setSaveError("Couldn't save that — you can skip it.");
      }
    } catch {
      setSaveError("Couldn't save that — you can skip it.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-6 py-20 pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <FileText className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Your assessment is ready.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            Download it below — it takes about ten minutes. Score the fifteen
            statements, total them, and the guide shows you which dimension to
            focus on first.
          </p>

          {/* Download — front and center, one obvious click */}
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="group h-11">
              <a href={PDF_HREF} download>
                <Download className="mr-2 h-4 w-4" />
                Download the assessment (PDF)
              </a>
            </Button>
          </div>

          {/* Founder line + soft secondary CTA */}
          <p className="mx-auto mt-8 max-w-lg text-pretty text-sm text-muted-foreground">
            I read every submission personally. If you&apos;d like a second pair
            of eyes on your results, book a call below. — Henry
          </p>

          <div className="mt-4 flex justify-center">
            <Button asChild variant="outline" size="lg" className="group h-11">
              <Link href="/strategy">
                Book a 30-minute AI strategy call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Optional, skippable company/role capture — only when we have a
              record to attach it to. */}
          {hydrated && recordId && !saved && (
            <form
              onSubmit={handleSave}
              className="mx-auto mt-14 max-w-md rounded-2xl border border-border/60 bg-secondary/20 p-6 text-left"
            >
              <p className="text-base font-medium text-foreground">
                Want your follow-up tailored to your situation?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Optional — it just tells me who I&apos;m talking to.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="company"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Company
                  </label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="h-11 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 w-full rounded-md border border-border bg-background px-4 text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                  >
                    <option value="">Select…</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {saveError && (
                <p className="mt-3 text-xs text-destructive" aria-live="polite">
                  {saveError}
                </p>
              )}

              <div className="mt-5">
                <Button type="submit" className="h-11" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          )}

          {hydrated && recordId && saved && (
            <div
              className="mx-auto mt-14 flex max-w-md items-center justify-center gap-2 text-sm text-muted-foreground"
              aria-live="polite"
            >
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              Thanks — got it.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
