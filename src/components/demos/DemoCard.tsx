'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DemoCardProps {
    children: ReactNode;
    title: string;
    description?: string;
    className?: string;
}

export default function DemoCard({ children, title, description, className = '' }: DemoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl ${className}`}
        >
            {/* Glass Header */}
            <div className="relative z-10 p-6 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            {/* Content Area */}
            <div className="relative z-0 p-6">
                {children}
            </div>

            {/* Decorative Gradients */}
            <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </motion.div>
    );
}
