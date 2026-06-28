import { Metadata } from "next";
import AssessmentReady from "@/components/assessment/AssessmentReady";

export const metadata: Metadata = {
  title: "Your assessment is ready",
  description: "Download the AI Readiness Assessment.",
  // Thank-you page — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function AssessmentReadyPage() {
  return <AssessmentReady />;
}
