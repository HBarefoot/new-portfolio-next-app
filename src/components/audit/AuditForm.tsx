"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface AuditFormProps {
    onAudit: (url: string) => void;
    isLoading: boolean;
}

export default function AuditForm({ onAudit, isLoading }: AuditFormProps) {
    const [url, setUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        onAudit(url);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your Website URL"
                        className="w-full pl-12 pr-36 py-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full shadow-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !url}
                        className="absolute right-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Auditing...
                            </>
                        ) : (
                            "Run Audit"
                        )}
                    </button>
                </div>

                {/* Progress Bar */}
                {isLoading && (
                    <div className="absolute -bottom-2 left-6 right-6 h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "95%" }}
                            transition={{ duration: 15, ease: "linear" }}
                            className="h-full bg-blue-500"
                        />
                    </div>
                )}
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Results in ~15 seconds • Mobile-first analysis • Powered by Google Lighthouse
            </p>
        </div>
    );
}
