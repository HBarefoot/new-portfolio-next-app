"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Send } from "lucide-react";

interface LeadMagnetModalProps {
    isOpen: boolean;
    onClose: () => void;
    auditUrl: string;
    auditData: any;
}

export default function LeadMagnetModal({ isOpen, onClose, auditUrl, auditData }: LeadMagnetModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Clear previous state just in case
        setIsSuccess(false);

        try {
            const response = await fetch("/api/audit-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    websiteUrl: auditUrl,
                    overallScore: auditData?.scores?.performance || 0,
                    auditData: auditData
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: response.statusText }));
                throw new Error(errorData.error || errorData.message || "Failed to submit lead");
            }

            setIsSubmitting(false);
            setIsSuccess(true);

            // Close after delay
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setName("");
                setEmail("");
            }, 3000); // 3 seconds to read the success message

        } catch (error) {
            console.error("Error submitting lead:", error);
            setIsSubmitting(false);
            alert("Something went wrong with the submission. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            {!isSuccess ? (
                                <>
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-6 mx-auto text-primary">
                                        <Lock className="w-6 h-6" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-center text-foreground mb-2">
                                        Unlock Detailed Fixes
                                    </h2>
                                    <p className="text-center text-muted-foreground mb-8">
                                        Get a comprehensive PDF report with step-by-step instructions to fix these issues and boost your rankings.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                                                Work Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send My Report <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 mx-auto text-green-600 dark:text-green-400">
                                        <Send className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        Report Sent!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Check your inbox for the detailed breakdown.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
