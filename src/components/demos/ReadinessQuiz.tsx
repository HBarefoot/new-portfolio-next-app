'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertTriangle,
    Zap,
    Mail,
    Send,
    Loader2,
    RotateCcw,
} from 'lucide-react';
import {
    questions,
    Pillar,
    PILLAR_LABELS,
    PILLAR_MAX_SCORES,
    MAX_TOTAL_SCORE,
    type Question,
} from '@/data/readiness-questions';
import { submitAudit } from '@/actions/submit-audit';

// Phase enum
type Phase = 'start' | 'questions' | 'gate' | 'results';

// Answer map
type AnswerMap = Record<string, { answer: string; weight: number; pillar: Pillar }>;

// Verdict thresholds
function getVerdict(score: number): { label: string; color: string; icon: React.ReactNode } {
    if (score <= 40) {
        return {
            label: 'Legacy Infrastructure. High Risk.',
            color: 'text-red-500',
            icon: <AlertTriangle className="w-6 h-6" />,
        };
    }
    if (score <= 75) {
        return {
            label: 'Digital Adopter. Ready for Orchestration.',
            color: 'text-amber-500',
            icon: <Zap className="w-6 h-6" />,
        };
    }
    return {
        label: 'AI Native. Optimization Phase.',
        color: 'text-emerald-500',
        icon: <CheckCircle className="w-6 h-6" />,
    };
}

// Circular progress component
function ScoreCircle({ score, maxScore }: { score: number; maxScore: number }) {
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-4xl font-black text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {score}
                </motion.span>
                <span className="text-sm text-muted-foreground">/ {maxScore}</span>
            </div>
        </div>
    );
}

// Pillar progress bar
function PillarBar({ label, score, maxScore }: { label: string; score: number; maxScore: number }) {
    const percentage = Math.round((score / maxScore) * 100);

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">{label}</span>
                <span className="font-mono text-muted-foreground">
                    {score}/{maxScore} ({percentage}%)
                </span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}

export default function ReadinessQuiz() {
    // Phase state
    const [phase, setPhase] = useState<Phase>('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Email capture state
    const [email, setEmail] = useState('');
    const [isPending, startTransition] = useTransition();
    const [submitError, setSubmitError] = useState(false);

    // Current question
    const currentQuestion: Question | undefined = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Calculate scores
    const scores = useMemo(() => {
        const pillarScores: Record<Pillar, number> = {
            [Pillar.DATA_MATURITY]: 0,
            [Pillar.PROCESS_AUTOMATION]: 0,
            [Pillar.STRATEGIC_ALIGNMENT]: 0,
        };

        let total = 0;
        for (const ans of Object.values(answers)) {
            pillarScores[ans.pillar] += ans.weight;
            total += ans.weight;
        }

        return { total, pillarScores };
    }, [answers]);

    // Handlers
    const handleStart = () => {
        setPhase('questions');
    };

    const handleSelectOption = (value: string) => {
        setSelectedOption(value);
    };

    const handleNext = () => {
        if (!selectedOption || !currentQuestion) return;

        const selectedOpt = currentQuestion.options.find((o) => o.value === selectedOption);
        if (!selectedOpt) return;

        // Save answer
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: {
                answer: selectedOpt.label,
                weight: selectedOpt.weight,
                pillar: currentQuestion.pillar,
            },
        }));

        // Move to next or gate
        if (isLastQuestion) {
            setPhase('gate');
        } else {
            setCurrentQuestionIndex((i) => i + 1);
        }
        setSelectedOption(null);
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((i) => i - 1);
            setSelectedOption(null);
        }
    };

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setSubmitError(false);

        startTransition(async () => {
            try {
                const verdict = getVerdict(scores.total);
                const answersRecord: Record<string, string> = {};
                Object.entries(answers).forEach(([questionId, ans]) => {
                    const q = questions.find((qq) => qq.id === questionId);
                    answersRecord[q?.text || questionId] = ans.answer;
                });

                const response = await submitAudit({
                    email,
                    leadSource: 'Readiness Quiz',
                    auditData: {
                        total_score: scores.total,
                        pillar_scores: {
                            DATA_MATURITY: scores.pillarScores[Pillar.DATA_MATURITY],
                            PROCESS_AUTOMATION: scores.pillarScores[Pillar.PROCESS_AUTOMATION],
                            STRATEGIC_ALIGNMENT: scores.pillarScores[Pillar.STRATEGIC_ALIGNMENT],
                        },
                        answers: answersRecord,
                        verdict: verdict.label,
                    },
                });

                if (response.success) {
                    setPhase('results');
                } else {
                    setSubmitError(true);
                }
            } catch {
                setSubmitError(true);
            }
        });
    };

    const handleReset = () => {
        setPhase('start');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setSelectedOption(null);
        setEmail('');
        setSubmitError(false);
    };

    const verdict = getVerdict(scores.total);

    return (
        <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                {/* ============ START SCREEN ============ */}
                {phase === 'start' && (
                    <motion.div
                        key="start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Zap className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Are you ready for an AI-Orchestrated Backend?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                            Get your Readiness Score across <strong>Data</strong>,{' '}
                            <strong>Automation</strong>, and <strong>Strategy</strong>. Takes 2 minutes.
                        </p>
                        <button
                            onClick={handleStart}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-colors"
                        >
                            Start Assessment
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {/* ============ QUESTION FLOW ============ */}
                {phase === 'questions' && currentQuestion && (
                    <motion.div
                        key={`question-${currentQuestion.id}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="py-8"
                    >
                        {/* Progress bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <span className="uppercase text-xs font-semibold text-primary">
                                    {PILLAR_LABELS[currentQuestion.pillar]}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Question text */}
                        <h3 className="text-2xl font-bold text-foreground mb-8">
                            {currentQuestion.text}
                        </h3>

                        {/* Options */}
                        <div className="space-y-4 mb-8">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelectOption(option.value)}
                                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${selectedOption === option.value
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                                        }`}
                                >
                                    <span className="font-medium text-foreground">{option.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentQuestionIndex === 0}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!selectedOption}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLastQuestion ? 'See Results' : 'Next'}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ============ EMAIL GATE ============ */}
                {phase === 'gate' && (
                    <motion.div
                        key="gate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-12"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                Your analysis is ready!
                            </h3>
                            <p className="text-muted-foreground">
                                Enter your work email to unlock your Score and Roadmap.
                            </p>
                        </div>

                        <form onSubmit={handleSubmitEmail} className="max-w-md mx-auto space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Work Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {submitError && (
                                <p className="text-sm text-red-500">
                                    Something went wrong. Please try again.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isPending || !email}
                                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                                {isPending ? 'Unlocking...' : 'Unlock My Results'}
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* ============ RESULTS SCREEN ============ */}
                {phase === 'results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-8"
                    >
                        {/* Overall Score */}
                        <div className="text-center mb-10">
                            <h3 className="text-xl font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
                                Your Readiness Score
                            </h3>
                            <ScoreCircle score={scores.total} maxScore={MAX_TOTAL_SCORE} />
                        </div>

                        {/* Verdict */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className={`text-center mb-10 p-6 rounded-2xl bg-secondary ${verdict.color}`}
                        >
                            <div className="flex items-center justify-center gap-3">
                                {verdict.icon}
                                <span className="text-xl font-bold">{verdict.label}</span>
                            </div>
                        </motion.div>

                        {/* Pillar Breakdown */}
                        <div className="space-y-6 mb-10">
                            <h4 className="font-semibold text-foreground">Pillar Breakdown</h4>
                            <PillarBar
                                label={PILLAR_LABELS[Pillar.DATA_MATURITY]}
                                score={scores.pillarScores[Pillar.DATA_MATURITY]}
                                maxScore={PILLAR_MAX_SCORES[Pillar.DATA_MATURITY]}
                            />
                            <PillarBar
                                label={PILLAR_LABELS[Pillar.PROCESS_AUTOMATION]}
                                score={scores.pillarScores[Pillar.PROCESS_AUTOMATION]}
                                maxScore={PILLAR_MAX_SCORES[Pillar.PROCESS_AUTOMATION]}
                            />
                            <PillarBar
                                label={PILLAR_LABELS[Pillar.STRATEGIC_ALIGNMENT]}
                                score={scores.pillarScores[Pillar.STRATEGIC_ALIGNMENT]}
                                maxScore={PILLAR_MAX_SCORES[Pillar.STRATEGIC_ALIGNMENT]}
                            />
                        </div>

                        {/* CTA */}
                        <div className="bg-gray-900 dark:bg-gray-800 text-white p-6 rounded-2xl text-center">
                            <h4 className="font-bold text-lg mb-2">Want a Detailed Roadmap?</h4>
                            <p className="text-gray-400 text-sm mb-4">
                                We've sent your results to {email}. Our team will follow up with a personalized action plan.
                            </p>
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-700 text-gray-300 font-medium transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Take Assessment Again
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
