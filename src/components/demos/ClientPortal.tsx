'use client';

import { Shield, Lock, Bell, UserCircle, FileText } from 'lucide-react';
import demoData from '@/data/demos.json';
import DemoCard from './DemoCard';
import TimelineEvent from './TimelineEvent';

export default function ClientPortal() {
    const { events } = demoData.timeline;

    // Calculate Progress
    const completedEvents = events.filter(e => e.status === 'completed').length;
    const progress = Math.round((completedEvents / events.length) * 100);

    return (
        <div className="space-y-6">

            {/* Mock Header for Portal Context */}
            <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg border border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-bold text-sm">SECURE CLIENT PORTAL</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Encrypted Connection (AES-256)
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-semibold">Demo User</div>
                            <div className="text-[10px] text-gray-400 dark:text-gray-300">Project Owner</div>
                        </div>
                        <UserCircle className="w-8 h-8 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content: Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <DemoCard title="Production Timeline" description="Real-time build status and technical milestones." className="h-full">
                        <div className="mt-4">
                            {events.map((event, index) => (
                                <TimelineEvent key={event.id} event={event as any} isLast={index === events.length - 1} />
                            ))}
                        </div>
                    </DemoCard>
                </div>

                {/* Sidebar: Project Info */}
                <div className="space-y-6">
                    {/* Progress Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                        <h3 className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider mb-4">Overall Completion</h3>
                        <div className="relative pt-2 px-2">
                            <div className="flex items-end justify-between mb-2">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">{progress}%</span>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">On Schedule</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                        <h3 className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between group">
                                Display Daily Logs
                                <ArrowIcon />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between group">
                                Download Gantt Chart
                                <ArrowIcon />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center justify-between group">
                                Contact Project Manager
                                <ArrowIcon className="text-blue-600 dark:text-blue-400" />
                            </button>
                        </div>
                    </div>

                    {/* Recent Docs */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                        <h3 className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider mb-4">Recent Documents</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                <FileText className="w-8 h-8 text-red-500" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold truncate dark:text-gray-200">Hull_Inspection_v2.pdf</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">2.4 MB • Today</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                <FileText className="w-8 h-8 text-blue-500" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold truncate dark:text-gray-200">Engine_Specs_Final.docx</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">1.1 MB • Yesterday</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ArrowIcon({ className = "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" }: { className?: string }) {
    return (
        <svg className={`w-4 h-4 transition-colors ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    )
}
