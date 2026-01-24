'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, Rocket, Mail, Send, Loader2 } from 'lucide-react';
import DemoCard from './DemoCard';
import { submitAudit } from '@/actions/submit-audit';

// Constants
const INDUSTRY_AVERAGE = 200000; // $200k
const AI_ORCHESTRATED = 800000; // $800k

// Interfaces
interface RohcResult {
    score: number;
    insight: {
        icon: React.ReactNode;
        label: string;
        color: string;
    };
}

// Helper to format currency
function formatCurrency(value: number): string {
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}k`;
    }
    return `$${value.toFixed(0)}`;
}

// Helper to parse currency input
function parseCurrencyInput(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

// Helper to format input as currency
function formatInputCurrency(value: number): string {
    if (!value) return '';
    return value.toLocaleString('en-US');
}

export default function RohcCalculator() {
    // Input state
    const [revenueInput, setRevenueInput] = useState<string>('');
    const [headcountInput, setHeadcountInput] = useState<string>('');

    // Lead capture state
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [email, setEmail] = useState('');
    const [isPending, startTransition] = useTransition();
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Derived values
    const revenue = parseCurrencyInput(revenueInput);
    const headcount = parseInt(headcountInput, 10) || 0;

    // Calculations
    const result = useMemo<RohcResult | null>(() => {
        if (!revenue || !headcount || headcount === 0) return null;

        const score = revenue / headcount;

        let insight: RohcResult['insight'];
        if (score < 150_000) {
            insight = {
                icon: <AlertTriangle className="w-5 h-5" />,
                label: 'High Drag. Automation Urgency: Critical.',
                color: 'text-amber-500',
            };
        } else if (score <= 400_000) {
            insight = {
                icon: <CheckCircle className="w-5 h-5" />,
                label: 'Standard Efficiency. Room for Optimization.',
                color: 'text-emerald-500', // Keeping emerald distinct from brand accent for "OK" status
            };
        } else {
            insight = {
                icon: <Rocket className="w-5 h-5" />,
                label: 'High Performance. Ready for Scale.',
                color: 'text-accent', // Brand accent for top performance
            };
        }

        return { score, insight };
    }, [revenue, headcount]);

    // Bar widths (normalized to AI Orchestrated max, capped at 100%)
    const getBarWidth = (value: number) => Math.min((value / AI_ORCHESTRATED) * 100, 100);

    // Handle revenue input
    const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        const num = parseInt(raw, 10) || 0;
        setRevenueInput(formatInputCurrency(num));
    };

    // Handle headcount input
    const handleHeadcountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setHeadcountInput(raw);
    };

    // Handle email submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !result) return;

        startTransition(async () => {
            try {
                const response = await submitAudit({
                    email,
                    leadSource: 'rohc_calculator',
                    auditData: {
                        revenue,
                        headcount,
                        rohc_score: result.score,
                        insight: result.insight.label,
                    },
                });

                if (response.success) {
                    setSubmitStatus('success');
                } else {
                    setSubmitStatus('error');
                }
            } catch {
                setSubmitStatus('error');
            }
        });
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start relative">
            {/* Background Texture for cohesion */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Input Panel */}
            <DemoCard
                title="Business Inputs"
                description="Enter your annual revenue and total headcount to calculate your ROHC."
                className="backdrop-blur-sm bg-card/50 border-border/50"
            >
                <div className="space-y-8">
                    {/* Revenue Input */}
                    <div className="space-y-3">
                        <label className="block font-semibold text-foreground text-sm uppercase tracking-wide">
                            Annual Revenue
                        </label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium group-focus-within:text-primary transition-colors">
                                $
                            </span>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={revenueInput}
                                onChange={handleRevenueChange}
                                placeholder="5,000,000"
                                className="w-full pl-8 pr-4 py-4 rounded-xl border border-border bg-secondary/20 text-foreground font-mono text-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total annual revenue in USD.
                        </p>
                    </div>

                    {/* Headcount Input */}
                    <div className="space-y-3">
                        <label className="block font-semibold text-foreground text-sm uppercase tracking-wide">
                            Total Headcount
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={headcountInput}
                                onChange={handleHeadcountChange}
                                placeholder="25"
                                className="w-full px-4 py-4 rounded-xl border border-border bg-secondary/20 text-foreground font-mono text-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/30"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Full-time equivalent employees.
                        </p>
                    </div>
                </div>
            </DemoCard>

            {/* Results Panel */}
            <div className="flex flex-col gap-6">
                {/* Main Score Card */}
                <DemoCard
                    title="Your ROHC Score"
                    className="bg-gradient-to-br from-card/80 to-secondary/20 border-border/50 backdrop-blur-sm relative overflow-hidden"
                >
                    {/* Glow effect */}
                    {result && (
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    )}

                    <div className="text-center py-6 relative z-10">
                        <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
                            Revenue Per Employee
                        </div>
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key={result.score}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="text-5xl md:text-6xl font-black text-foreground tracking-tight"
                                >
                                    {formatCurrency(result.score)}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-5xl md:text-6xl font-black text-muted-foreground/20"
                                >
                                    $—
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Insight Badge */}
                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 font-medium text-sm backdrop-blur-md ${result.insight.color}`}
                                >
                                    {result.insight.icon}
                                    <span>{result.insight.label}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </DemoCard>

                {/* Benchmark Comparison */}
                <DemoCard title="Benchmark Comparison" className="backdrop-blur-sm bg-card/50 border-border/50">
                    <div className="space-y-6">
                        {/* Your Score Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs uppercase tracking-wide font-semibold">
                                <span className="text-foreground">Your Score</span>
                                <span className="font-mono text-primary">
                                    {result ? formatCurrency(result.score) : '—'}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_10px_rgba(var(--accent),0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: result ? `${getBarWidth(result.score)}%` : '0%' }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Industry Average Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs uppercase tracking-wide font-semibold">
                                <span className="text-muted-foreground">Industry Average</span>
                                <span className="font-mono text-muted-foreground">
                                    {formatCurrency(INDUSTRY_AVERAGE)}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-muted-foreground/30 rounded-full"
                                    style={{ width: `${getBarWidth(INDUSTRY_AVERAGE)}%` }}
                                />
                            </div>
                        </div>

                        {/* AI Orchestrated Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs uppercase tracking-wide font-semibold">
                                <span className="text-emerald-500 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    AI Orchestrated (Goal)
                                </span>
                                <span className="font-mono text-emerald-500">
                                    {formatCurrency(AI_ORCHESTRATED)}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        {/* Gap Indicator */}
                        {result && result.score < AI_ORCHESTRATED && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm"
                            >
                                <p className="text-sm text-amber-500">
                                    <strong>Gap to AI-Orchestrated Benchmark:</strong>{' '}
                                    <span className="font-mono">{formatCurrency(AI_ORCHESTRATED - result.score)}</span> per employee
                                </p>
                            </motion.div>
                        )}
                    </div>
                </DemoCard>

                {/* Lead Capture CTA */}
                <motion.div
                    className="p-1 rounded-xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/5"
                    whileHover={{ scale: 1.005 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 border border-primary/10 h-full">
                        <AnimatePresence mode="wait">
                            {submitStatus === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-4"
                                >
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                                        <CheckCircle className="w-8 h-8 text-accent" />
                                    </div>
                                    <h4 className="font-bold text-lg text-foreground">Report Requested!</h4>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Check your inbox for your personalized ROHC optimization report.
                                    </p>
                                </motion.div>
                            ) : !showEmailCapture ? (
                                <motion.div
                                    key="cta"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h4 className="font-bold text-lg mb-2 text-foreground">
                                        Want to Close the Gap?
                                    </h4>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                        Get a personalized ROHC Optimization Report identifying your
                                        highest-leverage automation opportunities.
                                    </p>
                                    <button
                                        onClick={() => setShowEmailCapture(true)}
                                        disabled={!result}
                                        className="w-full py-3 px-6 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Get My ROHC Optimization Report
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <label className="block">
                                        <span className="text-xs font-bold uppercase text-foreground">
                                            Your Work Email
                                        </span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="ceo@company.com"
                                            required
                                            className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-secondary/20 text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                        />
                                    </label>
                                    {submitStatus === 'error' && (
                                        <p className="text-sm text-red-500 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isPending || !email}
                                        className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                                    >
                                        {isPending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                        {isPending ? 'Sending...' : 'Send My Report'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
