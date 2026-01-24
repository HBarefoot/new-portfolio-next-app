'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    X,
    Download,
    Mail,
    Send,
    Loader2,
    CheckCircle,
    Zap,
} from 'lucide-react';
import {
    STACK_TOOLS,
    CATEGORY_COLORS,
    CATEGORY_LABELS,
    getCategories,
    getToolsByCategory,
    getLogicInsight,
    type StackTool,
} from '@/data/stack-options';
import { submitAudit } from '@/actions/submit-audit';

export default function LogicMapper() {
    // State
    const [selectedTools, setSelectedTools] = useState<StackTool[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showGate, setShowGate] = useState(false);
    const [email, setEmail] = useState('');
    const [isPending, startTransition] = useTransition();
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    // Filtered tools based on search
    const filteredTools = useMemo(() => {
        if (!searchQuery.trim()) return STACK_TOOLS;
        const query = searchQuery.toLowerCase();
        return STACK_TOOLS.filter(
            (tool) =>
                tool.name.toLowerCase().includes(query) ||
                tool.category.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // Logic insight based on selected tools
    const logicInsight = useMemo(() => {
        return getLogicInsight(selectedTools.map((t) => t.id));
    }, [selectedTools]);

    // Add tool to selection
    const addTool = (tool: StackTool) => {
        if (!selectedTools.find((t) => t.id === tool.id)) {
            setSelectedTools([...selectedTools, tool]);
        }
    };

    // Remove tool from selection
    const removeTool = (toolId: string) => {
        setSelectedTools(selectedTools.filter((t) => t.id !== toolId));
    };

    // Clear all
    const clearAll = () => {
        setSelectedTools([]);
    };

    // Email submission
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        startTransition(async () => {
            try {
                const response = await submitAudit({
                    email,
                    leadSource: 'Stack Mapper',
                    auditData: {
                        selected_tools: selectedTools.map((t) => ({
                            id: t.id,
                            name: t.name,
                            category: t.category,
                        })),
                        asset_requested: 'n8n_template',
                    },
                });
                if (response.success) {
                    setEmailSubmitted(true);
                    setTimeout(() => {
                        setShowGate(false);
                        setEmailSubmitted(false);
                    }, 2000);
                }
            } catch {
                setEmailSubmitted(true);
            }
        });
    };

    // Calculate node positions around the center
    const getNodePosition = (index: number, total: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const radius = 160; // Increased radius to prevent overlap
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };

    return (
        <div className="grid lg:grid-cols-[320px,1fr] gap-6">
            {/* ============ SIDEBAR ============ */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 h-fit lg:max-h-[600px] overflow-y-auto shadow-sm">
                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tools..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-secondary/20 text-foreground text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/70"
                    />
                </div>

                {/* Tool categories */}
                <div className="space-y-6">
                    {getCategories().map((category) => {
                        const tools = searchQuery
                            ? filteredTools.filter((t) => t.category === category)
                            : getToolsByCategory(category);

                        if (tools.length === 0) return null;

                        return (
                            <div key={category}>
                                <h4
                                    className="text-[10px] font-bold uppercase tracking-widest mb-3 pl-1"
                                    style={{ color: CATEGORY_COLORS[category] }}
                                >
                                    {CATEGORY_LABELS[category]}
                                </h4>
                                <div className="space-y-2">
                                    {tools.map((tool) => {
                                        const isSelected = selectedTools.some((t) => t.id === tool.id);
                                        return (
                                            <button
                                                key={tool.id}
                                                onClick={() => (isSelected ? removeTool(tool.id) : addTool(tool))}
                                                className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all border ${isSelected
                                                    ? 'bg-primary/5 border-primary/20 shadow-[0_0_15px_-3px_rgba(var(--primary),0.2)]'
                                                    : 'hover:bg-secondary/40 border-transparent hover:border-border/50'
                                                    }`}
                                            >
                                                <div
                                                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                                                    style={{ backgroundColor: tool.color }}
                                                >
                                                    {tool.iconPath ? (
                                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                                                            <path d={tool.iconPath} />
                                                        </svg>
                                                    ) : (
                                                        tool.name.charAt(0)
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                        {tool.name}
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 animate-in zoom-in spin-in-45 duration-300" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ============ CANVAS ============ */}
            <div className="space-y-6">
                {/* Canvas */}
                <div className="relative rounded-xl border border-border bg-card min-h-[500px] overflow-hidden shadow-inner">
                    {/* Background grid - works in both light and dark mode */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Subtle vignette - only in dark mode */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/40 pointer-events-none dark:block hidden" />

                    {/* SVG Canvas - only render full canvas when tools selected */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="-200 -200 400 400">
                        {/* Gradient definitions (always needed) */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.5" />
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <radialGradient id="centerGradient">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>

                        {/* All canvas elements only render when tools are selected */}
                        {selectedTools.length > 0 && (
                            <>
                                {/* Central n8n Node */}
                                <g className="filter drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                                    {/* Pulse Effect */}
                                    <motion.circle
                                        r={45}
                                        stroke="url(#activeGradient)"
                                        strokeWidth={1}
                                        fill="none"
                                        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />

                                    {/* Main Circle */}
                                    <circle r={40} className="fill-card stroke-border" strokeWidth={1.5} />

                                    {/* Inner Gradient */}
                                    <circle r={38} fill="url(#centerGradient)" opacity={0.8} />

                                    <text
                                        y={-5}
                                        textAnchor="middle"
                                        className="fill-foreground font-bold text-sm tracking-wide"
                                        style={{ fontFamily: 'var(--font-geist-sans)' }}
                                    >
                                        n8n
                                    </text>
                                    <text
                                        y={12}
                                        textAnchor="middle"
                                        className="fill-muted-foreground text-[9px] uppercase tracking-widest"
                                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                                    >
                                        Core
                                    </text>
                                </g>

                                {/* Connection lines */}
                                {selectedTools.map((tool, index) => {
                                    const pos = getNodePosition(index, selectedTools.length);
                                    return (
                                        <g key={`line-${tool.id}`}>
                                            {/* Static line */}
                                            <line
                                                x1={0}
                                                y1={0}
                                                x2={pos.x}
                                                y2={pos.y}
                                                stroke="url(#lineGradient)"
                                                strokeWidth={1.5}
                                                strokeDasharray="4 4"
                                                opacity={0.4}
                                            />
                                            {/* Animated data packet */}
                                            <motion.circle
                                                r={3}
                                                className="fill-primary"
                                                initial={{ x: 0, y: 0, opacity: 0 }}
                                                animate={{
                                                    x: [0, pos.x],
                                                    y: [0, pos.y],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                    delay: index * 0.2
                                                }}
                                            />
                                        </g>
                                    );
                                })}

                                {/* Satellite tool nodes */}
                                {selectedTools.map((tool, index) => {
                                    const pos = getNodePosition(index, selectedTools.length);
                                    return (
                                        <motion.g
                                            key={tool.id}
                                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                            animate={{
                                                scale: 1,
                                                opacity: 1,
                                                x: pos.x,
                                                y: pos.y
                                            }}
                                            exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                            className="cursor-pointer group"
                                            onClick={() => removeTool(tool.id)}
                                        >
                                            {/* Hover Ring */}
                                            <circle
                                                r={32}
                                                fill="transparent"
                                                stroke={tool.color}
                                                strokeWidth={2}
                                                strokeOpacity={0}
                                                className="group-hover:stroke-opacity-50 transition-all duration-300"
                                            />

                                            {/* Tool Circle - visible background */}
                                            <circle
                                                r={28}
                                                className="fill-card"
                                                stroke={tool.color}
                                                strokeWidth={3}
                                                strokeOpacity={0.8}
                                            />

                                            {/* Tool Icon Background */}
                                            <circle
                                                r={28}
                                                style={{ fill: tool.color }}
                                                opacity={0.1}
                                            />

                                            {/* Tool Initial / Icon */}
                                            {tool.iconPath ? (
                                                <g transform="translate(-12, -12)">
                                                    <path d={tool.iconPath} fill={tool.color} />
                                                </g>
                                            ) : (
                                                <text
                                                    y={6}
                                                    textAnchor="middle"
                                                    className="fill-foreground font-bold text-sm"
                                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                                >
                                                    {tool.name.slice(0, 1)}
                                                </text>
                                            )}

                                            {/* Label below */}
                                            <text
                                                y={44}
                                                textAnchor="middle"
                                                className="fill-foreground text-[11px] font-medium"
                                                style={{ fontFamily: 'var(--font-geist-sans)' }}
                                            >
                                                {tool.name.length > 10 ? tool.name.slice(0, 8) + '...' : tool.name}
                                            </text>

                                            {/* Delete Badge (reveals on hover) */}
                                            <g
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                transform="translate(20, -20)"
                                            >
                                                <circle r={10} className="fill-destructive" />
                                                <text y={4} textAnchor="middle" className="fill-destructive-foreground text-xs font-bold">×</text>
                                            </g>
                                        </motion.g>
                                    );
                                })}
                            </>
                        )}
                    </svg>

                    {/* Empty state */}
                    {selectedTools.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="text-center max-w-sm">
                                <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-4 border border-border/50">
                                    <Zap className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Build Your Stack</h3>
                                <p className="text-sm text-muted-foreground">
                                    Select tools from the sidebar to visualize how n8n orchestrates your entire business logic.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Clear button */}
                    {selectedTools.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-destructive/20 hover:text-destructive text-muted-foreground text-xs font-medium transition-all backdrop-blur-sm border border-border/50 hover:border-destructive/30"
                        >
                            Clear Board
                        </button>
                    )}
                </div>

                {/* Logic Insight */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={logicInsight}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-xl border border-border/50 bg-secondary/10 p-5 backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide">Logic Detected</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{logicInsight}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <button
                    onClick={() => setShowGate(true)}
                    disabled={selectedTools.length === 0}
                    className="w-full py-4 px-6 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/5"
                >
                    <Download className="w-4 h-4" />
                    Download Custom n8n JSON Template
                </button>
                <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    Production-Ready Architecture • n8n Workflow File
                </p>
            </div>

            {/* Same Email Gate Modal - kept mostly as is but ensuring colors match */}
            <AnimatePresence>
                {showGate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowGate(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-card rounded-xl shadow-2xl border border-border overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-border bg-secondary/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {emailSubmitted ? 'Template Sent!' : 'Unlock Workflow'}
                                    </h3>
                                    <button
                                        onClick={() => setShowGate(false)}
                                        className="p-1 hover:bg-secondary rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {emailSubmitted ? (
                                    <div className="text-center py-6">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-primary" />
                                        </div>
                                        <h4 className="text-foreground font-medium mb-2">Check your inbox</h4>
                                        <p className="text-muted-foreground text-sm">
                                            We've sent the n8n JSON template to <strong>{email}</strong>.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Selected tools summary */}
                                        <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Included Integrations:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTools.map((tool) => (
                                                    <span
                                                        key={tool.id}
                                                        className="px-2 py-1 rounded-md text-[10px] font-bold border"
                                                        style={{
                                                            borderColor: `${tool.color}40`,
                                                            color: tool.color,
                                                            backgroundColor: `${tool.color}10`
                                                        }}
                                                    >
                                                        {tool.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-foreground mb-2">
                                                    Where should we send it?
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="name@company.com"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isPending || !email}
                                                className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {isPending ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Send className="w-4 h-4" />
                                                )}
                                                {isPending ? 'Processing...' : 'Send Template'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
