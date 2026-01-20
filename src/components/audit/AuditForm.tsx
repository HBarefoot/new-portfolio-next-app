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
                    <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your Website URL"
                        className="w-full pl-12 pr-36 py-4 bg-card border border-border rounded-full shadow-lg text-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground text-foreground"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !url}
                        className="absolute right-2 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
                    <div className="absolute -bottom-2 left-6 right-6 h-1 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "95%" }}
                            transition={{ duration: 15, ease: "linear" }}
                            className="h-full bg-primary"
                        />
                    </div>
                )}
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
                Results in ~15 seconds • Mobile-first analysis • Powered by Google Lighthouse
            </p>
        </div>
    );
}
