"use client";

import { motion } from "framer-motion";

interface ScoreGaugeProps {
    score: number; // 0 to 1
    label: string;
}

export default function ScoreGauge({ score, label }: ScoreGaugeProps) {
    const percentage = Math.round(score * 100);

    let color = "text-red-500";
    let strokeColor = "#ef4444"; // red-500

    if (score >= 0.9) {
        color = "text-green-500";
        strokeColor = "#22c55e"; // green-500
    } else if (score >= 0.5) {
        color = "text-yellow-500";
        strokeColor = "#eab308"; // yellow-500
    }

    // SVG configuration
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - score * circumference;

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                </svg>
                <div className={`absolute text-2xl font-bold ${color}`}>
                    {percentage}
                </div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {label}
            </span>
        </div>
    );
}
