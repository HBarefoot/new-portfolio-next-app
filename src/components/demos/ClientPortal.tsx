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
                    <div className="p-2 bg-green-500/10 rounded-full text-green-400">
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
                        <div className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></div>
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
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-wider mb-4">Overall Completion</h3>
                        <div className="relative pt-2 px-2">
                            <div className="flex items-end justify-between mb-2">
                                <span className="text-4xl font-bold text-foreground">{progress}%</span>
                                <span className="text-sm font-medium text-primary mb-1">On Schedule</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-wider mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-muted border border-border hover:border-primary hover:shadow-md transition-all text-sm font-semibold text-foreground flex items-center justify-between group">
                                Display Daily Logs
                                <ArrowIcon />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-muted border border-border hover:border-primary hover:shadow-md transition-all text-sm font-semibold text-foreground flex items-center justify-between group">
                                Download Gantt Chart
                                <ArrowIcon />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl bg-secondary border border-primary hover:border-primary/80 hover:shadow-md transition-all text-sm font-bold text-foreground flex items-center justify-between group">
                                Contact Project Manager
                                <ArrowIcon className="text-primary" />
                            </button>
                        </div>
                    </div>

                    {/* Recent Docs */}
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-wider mb-4">Recent Documents</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted">
                                <FileText className="w-8 h-8 text-destructive" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold truncate text-foreground">Hull_Inspection_v2.pdf</div>
                                    <div className="text-xs text-muted-foreground">2.4 MB • Today</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted">
                                <FileText className="w-8 h-8 text-primary" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold truncate text-foreground">Engine_Specs_Final.docx</div>
                                    <div className="text-xs text-muted-foreground">1.1 MB • Yesterday</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ArrowIcon({ className = "text-muted-foreground group-hover:text-foreground" }: { className?: string }) {
    return (
        <svg className={`w-4 h-4 transition-colors ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    )
}
