"use client";

import { AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";

interface ImpactCardProps {
    score: number; // Performance score 0-1
}

export default function ImpactCard({ score }: ImpactCardProps) {
    if (score >= 0.9) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                        Excellent Performance
                    </h3>
                    <p className="mt-2 text-green-800 dark:text-green-200">
                        Your site is faster than 90% of the web. This boosts your SEO rankings and keeps visitors engaged.
                    </p>
                </div>
            </div>
        );
    }

    if (score >= 0.5) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-800 rounded-full text-yellow-600 dark:text-yellow-300">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
                        Room for Improvement
                    </h3>
                    <p className="mt-2 text-yellow-800 dark:text-yellow-200">
                        Your site has average speed. Optimizing images and code could reduce bounce rates by up to 20%.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full text-red-600 dark:text-red-300">
                <TrendingDown className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                    Critical Performance Issues
                </h3>
                <p className="mt-2 text-red-800 dark:text-red-200">
                    Your site is slower than 60% of competitors. This typically leads to a <strong>15% drop in conversions</strong> and lower Google rankings.
                </p>
            </div>
        </div>
    );
}
