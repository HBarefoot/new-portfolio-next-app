'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FileText, ArrowRight, Database, Cpu, Globe, CheckCircle2, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import demoData from '@/data/demos.json';
import DemoCard from './DemoCard';

export default function ContentNewsroom() {
    const { workflowSteps, sampleContent } = demoData.automation;

    const [isProcessing, setIsProcessing] = useState(false);
    const [activeStepId, setActiveStepId] = useState<string | null>(null);
    const [contentLanguage, setContentLanguage] = useState<'en' | 'es'>('en');

    const handleTranslate = () => {
        setIsProcessing(true);
        setContentLanguage('en'); // Reset to start

        // Simulate workflow steps
        const steps = ['w1', 'w2', 'w3', 'w4'];
        let stepIndex = 0;

        const interval = setInterval(() => {
            if (stepIndex >= steps.length) {
                clearInterval(interval);
                setIsProcessing(false);
                setActiveStepId(null);
                setContentLanguage('es'); // Switch content at the end
                return;
            }

            setActiveStepId(steps[stepIndex]);
            stepIndex++;
        }, 1000); // 1 second per step
    };

    const currentContent = contentLanguage === 'en' ? sampleContent.rendered : sampleContent.translated;
    // Fix: Source should always remain as the original raw input, regardless of translation state
    const currentRaw = sampleContent.raw;

    // Mapping string icons to Lucide components
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'webhook': return <Globe className="w-5 h-5" />;
            case 'file-code': return <FileText className="w-5 h-5" />;
            case 'cpu': return <Cpu className="w-5 h-5" />;
            case 'database': return <Database className="w-5 h-5" />;
            default: return <FileText className="w-5 h-5" />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Workflow Visualization Bar */}
            <DemoCard title="n8n Automation Pipeline" description="Visualizing the real-time journey from WikiJS documentation to localized Strapi CMS content.">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-2 overflow-x-auto">
                    {workflowSteps.map((step, index) => {
                        const isActive = activeStepId === step.id;
                        const isCompleted = !isActive && !isProcessing && contentLanguage === 'es';

                        return (
                            <div key={step.id} className="flex items-center flex-1 min-w-[200px]">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{
                                        scale: isActive ? 1.05 : 1,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`flex items-center gap-3 p-3 rounded-xl border bg-white dark:bg-gray-800 w-full transition-all duration-300 ${isActive
                                        ? 'border-primary shadow-lg shadow-primary/20 ring-1 ring-primary'
                                        : isCompleted
                                            ? 'border-primary/50 opacity-80'
                                            : 'border-gray-200 dark:border-gray-700 shadow-sm'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : isCompleted ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                        {isActive ? <Loader2 className="w-5 h-5 animate-spin" /> : isCompleted ? <CheckCircle2 className="w-5 h-5" /> : getIcon(step.icon)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">{step.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{isActive ? 'Processing...' : step.type}</div>
                                    </div>
                                </motion.div>

                                {index < workflowSteps.length - 1 && (
                                    <ArrowRight className={`mx-4 w-5 h-5 ${isActive ? 'text-primary animate-pulse' : 'text-gray-300'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </DemoCard>

            <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
                {/* Left Pane: Raw Input */}
                <div className="flex flex-col h-full bg-gray-950 rounded-2xl border-2 border-gray-800 shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                        <span className="text-sm font-mono text-gray-400 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            source-markdown.md
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400">Read-Only</span>
                    </div>
                    <div className="flex-1 p-6 font-mono text-sm text-green-400 overflow-y-auto whitespace-pre-wrap">
                        {currentRaw}
                    </div>
                </div>

                {/* Right Pane: Live Preview with Scanner */}
                <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden group">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Live Preview
                        </span>
                        {contentLanguage === 'es' ? (
                            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary font-bold">
                                ES Spanish (Optimized)
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                                EN English (Original)
                            </span>
                        )}
                    </div>

                    <div className="relative flex-1 p-8 overflow-y-auto max-w-none">
                        {/* The Scanner Animation Overlay */}
                        {isProcessing && (
                            <motion.div
                                initial={{ top: 0 }}
                                animate={{ top: '100%' }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-10 shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                            />
                        )}

                        {/* Content Display */}
                        <div
                            className="relative z-0 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:dark:text-white [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:dark:text-gray-100 [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-bold [&_strong]:text-gray-900 [&_strong]:dark:text-white [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:text-gray-700 [&_li]:dark:text-gray-300 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50 [&_blockquote]:dark:bg-blue-900/20 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:dark:text-gray-300 [&_blockquote]:rounded-r"
                            dangerouslySetInnerHTML={{ __html: currentContent }}
                        />
                    </div>

                    {/* Action Button */}
                    <div className="absolute bottom-6 right-6">
                        <button
                            onClick={handleTranslate}
                            disabled={isProcessing}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all ${isProcessing
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : 'bg-primary text-primary-foreground hover:scale-105'
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Running AI Workflow...
                                </>
                            ) : contentLanguage === 'es' ? (
                                <>
                                    <RefreshCw className="w-5 h-5" />
                                    Reset Demo
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Translate with AI Agent
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
