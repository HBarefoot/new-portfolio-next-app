"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, CloudLightning, Lock } from "lucide-react";

import AuditForm from "@/components/audit/AuditForm";
import ScoreGauge from "@/components/audit/ScoreGauge";
import ImpactCard from "@/components/audit/ImpactCard";
import LeadMagnetModal from "@/components/audit/LeadMagnetModal";

export default function AuditPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleAudit = async (url: string) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // Use backend API
            const apiUrl = process.env.NEXT_PUBLIC_PERFORMANCE_API_URL || "http://localhost:8000";
            const response = await fetch(`${apiUrl}/api/audit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch audit data");
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pb-20">
            {/* Hero Section */}
            <section className="relative px-4 pt-20 pb-16 text-center overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                            Is Your Website Losing You Money?
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                            Get a free, instant performance audit. See exactly how your site speed impacts your bottom line.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <AuditForm onAudit={handleAudit} isLoading={loading} />
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg max-w-md mx-auto"
                        >
                            {error}
                        </motion.div>
                    )}
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>
            </section>

            {/* Results Section */}
            {data && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto px-4"
                >
                    {data.is_mock && (
                        <div className="mb-6 p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-center text-sm rounded">
                            Note: Running in simulation mode (API Quota Exceeded)
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                        {/* Business Impact (Left Column) */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-500" />
                                    Business Impact
                                </h2>
                                <ImpactCard score={data.scores.performance} />

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-2">Core Web Vitals</h3>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-600 dark:text-gray-400">First Contentful Paint</span>
                                        <span className="font-mono font-bold text-gray-900 dark:text-white">{data.metrics.fcp}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Time until the first text or image is painted.
                                    </p>
                                </div>
                            </div>

                        </motion.div>

                        {/* Technical Scores (Right Column) */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-zinc-800"
                        >
                            <h2 className="text-xl font-semibold mb-8 flex items-center gap-2">
                                <CloudLightning className="w-5 h-5 text-yellow-500" />
                                Lighthouse Scores
                            </h2>
                            <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                                <ScoreGauge score={data.scores.performance} label="Performance" />
                                <ScoreGauge score={data.scores.accessibility} label="Accessibility" />
                                <ScoreGauge score={data.scores.best_practices} label="Best Practices" />
                                <ScoreGauge score={data.scores.seo} label="SEO" />
                            </div>
                        </motion.div>

                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Want to Fix These Issues?</h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                Get a detailed, step-by-step developer guide on how to improve your scores and increase your conversion rate.
                            </p>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Lock className="w-4 h-4" /> Get Detailed Fixes
                            </button>
                            <p className="mt-4 text-sm text-blue-200/80">
                                100% Free • No Credit Card Required
                            </p>
                        </div>
                        {/* Bg Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
                    </motion.div>

                </motion.div>
            )}

            {/* Modal */}
            <LeadMagnetModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                auditUrl={data?.url}
                auditData={data}
            />
        </div>
    );
}
