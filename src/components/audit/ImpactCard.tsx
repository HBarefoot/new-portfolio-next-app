"use client";

import { AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";

interface ImpactCardProps {
    score: number; // Performance score 0-1
}

export default function ImpactCard({ score }: ImpactCardProps) {
    if (score >= 0.9) {
        return (
            <div className="bg-secondary/30 border border-border rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-green-500/10 rounded-full text-green-600 dark:text-green-400">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Excellent Performance
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                        Your site is faster than 90% of the web. This boosts your SEO rankings and keeps visitors engaged.
                    </p>
                </div>
            </div>
        );
    }

    if (score >= 0.5) {
        return (
            <div className="bg-secondary/30 border border-border rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-500">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Room for Improvement
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                        Your site has average speed. Optimizing images and code could reduce bounce rates by up to 20%.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-secondary/30 border border-border rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-red-500/10 rounded-full text-red-600 dark:text-red-400">
                <TrendingDown className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-foreground">
                    Critical Performance Issues
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Your site is slower than 60% of competitors. This typically leads to a <strong>15% drop in conversions</strong> and lower Google rankings.
                </p>
            </div>
        </div>
    );
}
