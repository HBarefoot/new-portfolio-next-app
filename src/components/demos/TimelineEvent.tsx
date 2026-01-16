'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, ChevronDown, FileText } from 'lucide-react';
import { TimelineEvent as TimelineEventType } from '@/types/demo-types';

interface TimelineEventProps {
    event: TimelineEventType;
    isLast?: boolean;
}

export default function TimelineEvent({ event, isLast = false }: TimelineEventProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-6 h-6 text-green-500" />;
            case 'in-progress': return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
            default: return <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" />;
        }
    };

    const statusColor = {
        completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        upcoming: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
    }[event.status];

    return (
        <div className="relative pl-8 pb-8">
            {/* Connector Line */}
            {!isLast && (
                <div className={`absolute left-[11px] top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 ${event.status === 'completed' ? 'bg-green-500/30' : ''}`} />
            )}

            {/* Icon Node */}
            <div className="absolute left-0 top-1 bg-white dark:bg-gray-950 z-10">
                {getStatusIcon(event.status)}
            </div>

            {/* Content Card */}
            <motion.div
                layout
                onClick={() => setIsExpanded(!isExpanded)}
                className={`bg-white dark:bg-gray-900 rounded-xl border transition-all cursor-pointer overflow-hidden ${isExpanded ? 'border-blue-500 shadow-lg ring-1 ring-blue-500' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
            >
                <div className="p-4 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${statusColor}`}>
                                {event.status}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                            {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {event.description}
                        </p>
                    </div>
                    <div className={`p-1 rounded-full bg-gray-50 dark:bg-gray-800 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Expandable Technical Log */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                        >
                            <div className="p-4 space-y-3">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FileText className="w-3 h-3" /> Technical Log
                                </div>

                                {event.details ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        {event.details.map((detail, idx) => (
                                            <div key={idx} className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                                <div className="text-xs text-gray-500 mb-1">{detail.label}</div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">{detail.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No additional technical data available for this milestone.</p>
                                )}

                                {event.status === 'completed' && (
                                    <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Verified by Project Manager
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
