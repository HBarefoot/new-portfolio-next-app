'use client';

import { useState, useCallback, useTransition, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
    FileText,
    Loader2,
    CheckCircle,
    AlertTriangle,
    Code,
    Table,
    Mail,
    Send,
    X,
    ScanLine,
    FileSearch,
    FileCheck,
    Container,
    Ship
} from 'lucide-react';
import { submitAudit } from '@/actions/submit-audit';
import { cn } from '@/lib/utils';

// Types
interface LineItem {
    description: string;
    quantity: number | string;
    unit_price: number | string;
    total: number | string;
}

interface OcrResult {
    invoice_number: string;
    date: string;
    vendor?: string;
    total_amount?: string;
    line_items: LineItem[];
    error_message?: string;
}

type ProcessingStage = 'uploading' | 'analyzing' | 'extracting';
type DocumentType = 'Invoice' | 'Bill of Lading' | 'Manifest' | 'Auto-Detect';

// Demo data for fallback
const DEMO_OCR_RESULT: OcrResult = {
    invoice_number: 'INV-2025-0847',
    date: '2025-01-15',
    vendor: 'Mediterranean Shipping Co.',
    total_amount: '$24,850.00',
    line_items: [
        { description: 'Container Transport (40ft HC)', quantity: 2, unit_price: '$8,500.00', total: '$17,000.00' },
        { description: 'Port Handling Fee - Valencia', quantity: 2, unit_price: '$1,200.00', total: '$2,400.00' },
        { description: 'Customs Documentation', quantity: 1, unit_price: '$450.00', total: '$450.00' },
        { description: 'Marine Insurance', quantity: 1, unit_price: '$2,800.00', total: '$2,800.00' },
        { description: 'THC Destination', quantity: 2, unit_price: '$1,100.00', total: '$2,200.00' },
    ],
};

const PROCESSING_MESSAGES: Record<ProcessingStage, string> = {
    uploading: 'Securing connection to enclave...',
    analyzing: 'Maritime Vision Engine scanning...',
    extracting: 'Structuring logistics data...',
};

export default function OcrDemo() {
    // State
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [processingStage, setProcessingStage] = useState<ProcessingStage | null>(null);
    const [result, setResult] = useState<OcrResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showJson, setShowJson] = useState(false);
    const [showGate, setShowGate] = useState(false);
    const [email, setEmail] = useState('');
    const [isPending, startTransition] = useTransition();
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [documentType, setDocumentType] = useState<DocumentType>('Auto-Detect');

    // Check localStorage on mount
    useEffect(() => {
        // Optional: restore state or check usage limits
    }, []);

    // Process the file
    const processFile = async (f: File) => {
        // Stage 1: Uploading
        setProcessingStage('uploading');
        await new Promise((r) => setTimeout(r, 800));

        // Stage 2: Analyzing
        setProcessingStage('analyzing');
        await new Promise((r) => setTimeout(r, 1500));

        // Stage 3: Extracting
        setProcessingStage('extracting');

        try {
            const formData = new FormData();
            formData.append('file', f);
            formData.append('documentType', documentType);

            const response = await fetch('/api/ocr-process', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Processing failed');
            }

            const data = await response.json();
            const resultData = data.result || DEMO_OCR_RESULT;

            if (resultData.error_message) {
                setError(resultData.error_message);
            }

            setResult(resultData);

            // Track successful extraction
            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'generate_lead',
                    lead_source: 'ocr_demo',
                    document_type: documentType,
                });
            }

        } catch {
            // Fallback to demo data
            await new Promise((r) => setTimeout(r, 1000));
            setResult(DEMO_OCR_RESULT);
        } finally {
            setProcessingStage(null);
        }
    };

    // React Dropzone
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const f = acceptedFiles[0];
        if (!f) return;

        if (f.size > 5 * 1024 * 1024) {
            setError('File must be under 5MB.');
            return;
        }

        setFile(f);
        setError(null);
        setResult(null);

        // Create preview
        if (f.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setFilePreview(e.target?.result as string);
            reader.readAsDataURL(f);
        } else {
            setFilePreview(null);
        }

        processFile(f);
    }, [documentType]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        multiple: false
    });

    // Email submission
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        startTransition(async () => {
            try {
                const response = await submitAudit({
                    email,
                    leadSource: 'OCR Demo',
                    auditData: {
                        file_name: file?.name,
                        context: 'Requested OCR Pipeline Blueprint',
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
                setTimeout(() => {
                    setShowGate(false);
                    setEmailSubmitted(false);
                }, 2000);
            }
        });
    };

    const handleReset = () => {
        setFile(null);
        setFilePreview(null);
        setResult(null);
        setError(null);
        setShowJson(false);
        setDocumentType('Auto-Detect');
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto font-sans">
            {/* Theme override container for "Ultra-dark maritime tech" */}
            <div className="bg-[#0a0a0a] text-zinc-100 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden relative">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Header Section */}
                {!file && (
                    <div className="relative p-8 border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/20">
                                    <Ship className="w-6 h-6 text-[#00e5ff]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                        Maritime Vision Engine
                                    </h2>
                                    <p className="text-sm text-zinc-400">AI-Powered Logistics Documentation Analysis</p>
                                </div>
                            </div>

                            {/* Document Type Selector */}
                            <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
                                {(['Auto-Detect', 'Invoice', 'Bill of Lading', 'Manifest'] as DocumentType[]).map((type) => (
                                    <button
                                        key={type}
                                        onClick={(e) => { e.stopPropagation(); setDocumentType(type); }}
                                        className={cn(
                                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                            documentType === type
                                                ? "bg-[#00e5ff]/10 text-[#00e5ff] shadow-[0_0_10px_-4px_#00e5ff]"
                                                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {/* ============ IDLE / DROP ZONE ============ */}
                    {!file && !processingStage && !result && (
                        <motion.div
                            key="dropzone"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative z-10 p-8 min-h-[400px] flex items-center justify-center"
                        >
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "w-full max-w-2xl border-2 border-dashed rounded-2xl p-12 transition-all duration-500 cursor-pointer group relative overflow-hidden",
                                    isDragActive
                                        ? "border-[#00e5ff] bg-[#00e5ff]/5 scale-[1.02]"
                                        : "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-900/40"
                                )}
                            >
                                <input {...getInputProps()} />

                                {/* Animated Scan Line causing glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5ff]/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                                <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-20">
                                    <div className={cn(
                                        "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                                        isDragActive ? "bg-[#00e5ff]/20 shadow-[0_0_30px_-5px_#00e5ff]" : "bg-zinc-900 shadow-xl border border-zinc-800"
                                    )}>
                                        <FileSearch className={cn(
                                            "w-10 h-10 transition-colors duration-300",
                                            isDragActive ? "text-[#00e5ff]" : "text-zinc-500 group-hover:text-[#00e5ff]"
                                        )} />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                                            Drop Maritime Documents Here
                                        </h3>
                                        <p className="text-zinc-500">
                                            Support for PDF, JPG, PNG up to 5MB
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                                            <FileText className="w-3 h-3" /> Invoices
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                                            <Container className="w-3 h-3" /> Bills of Lading
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="absolute bottom-6 left-0 right-0 text-center text-red-400 text-sm flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                                        <AlertTriangle className="w-4 h-4" /> {error}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ============ PROCESSING ============ */}
                    {processingStage && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative z-10 flex flex-col items-center justify-center min-h-[500px] p-8"
                        >
                            {/* Scanning Animation */}
                            <div className="relative w-64 h-80 bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden shadow-2xl mb-8">
                                <ScanLine className="absolute inset-0 m-auto w-16 h-16 text-[#00e5ff]/20" />
                                {/* Glowing Line */}
                                <motion.div
                                    className="absolute left-0 right-0 h-1 bg-[#00e5ff] shadow-[0_0_20px_2px_#00e5ff]"
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Matrix/Code Rain Effect Overlay (Simulated) */}
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
                            </div>

                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center gap-3 text-[#00e5ff]">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="text-lg font-medium tracking-wide">
                                        {PROCESSING_MESSAGES[processingStage]}
                                    </span>
                                </div>
                                <div className="flex gap-1.5 justify-center">
                                    {['uploading', 'analyzing', 'extracting'].map((stage, i) => (
                                        <div
                                            key={stage}
                                            className={cn(
                                                "w-12 h-1 rounded-full transition-colors duration-500",
                                                processingStage === stage
                                                    ? "bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"
                                                    : ['uploading', 'analyzing', 'extracting'].indexOf(processingStage!) > i
                                                        ? "bg-[#00e5ff]/50"
                                                        : "bg-zinc-800"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ============ RESULTS ============ */}
                    {result && !processingStage && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10 flex flex-col h-full min-h-[600px] divide-y divide-zinc-800/50"
                        >
                            {/* Toolbar */}
                            <div className="p-4 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-sm sticky top-0 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white text-sm">{file?.name || 'Document Analysis'}</h3>
                                        <p className="text-xs text-zinc-500">{documentType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowJson(!showJson)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 border",
                                            showJson
                                                ? "bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30"
                                                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                                        )}
                                    >
                                        {showJson ? <Table className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                                        {showJson ? 'Table View' : 'Raw JSON'}
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 grid lg:grid-cols-2 overflow-hidden relative">
                                {result?.error_message && (
                                    <div className="absolute top-4 left-4 right-4 z-30 bg-amber-500/10 border border-amber-500/20 text-amber-500 p-3 rounded-lg flex items-center gap-3 backdrop-blur-md">
                                        <AlertTriangle className="w-5 h-5 shrink-0" />
                                        <span className="text-sm font-medium">Demo Mode active: {result.error_message}. Showing system example data.</span>
                                    </div>
                                )}
                                {/* Left: Preview */}
                                <div className="relative p-6 bg-zinc-900/10 flex items-center justify-center border-r border-zinc-800/50 min-h-[400px]">
                                    {filePreview ? (
                                        <img
                                            src={filePreview}
                                            alt="Document"
                                            className="max-w-full max-h-[500px] rounded-lg shadow-2xl border border-zinc-800"
                                        />
                                    ) : (
                                        <div className="text-center p-12 rounded-xl border border-zinc-800 bg-zinc-900/50">
                                            <FileText className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
                                            <p className="text-zinc-500">Preview not available</p>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Data */}
                                <div className="relative bg-[#0a0a0a] flex flex-col max-h-[600px]">
                                    <div className="flex-1 overflow-auto p-0 custom-scrollbar">
                                        <AnimatePresence mode="wait">
                                            {showJson ? (
                                                <motion.pre
                                                    key="json"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="p-6 text-xs font-mono text-zinc-400 leading-relaxed"
                                                >
                                                    {JSON.stringify(result, null, 2)}
                                                </motion.pre>
                                            ) : (
                                                <motion.div
                                                    key="table"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="divide-y divide-zinc-800"
                                                >
                                                    {/* Key Metrics */}
                                                    <div className="grid grid-cols-2 gap-px bg-zinc-800">
                                                        <div className="bg-[#0a0a0a] p-4">
                                                            <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Invoice Info</span>
                                                            <div className="font-mono text-white">{result.invoice_number}</div>
                                                            <div className="text-xs text-zinc-500 mt-0.5">{result.date}</div>
                                                        </div>
                                                        <div className="bg-[#0a0a0a] p-4">
                                                            <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Vendor</span>
                                                            <div className="font-medium text-white">{result.vendor || 'N/A'}</div>
                                                        </div>
                                                    </div>

                                                    {/* Line Items */}
                                                    <div className="p-4">
                                                        <table className="w-full text-sm">
                                                            <thead className="text-xs uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
                                                                <tr>
                                                                    <th className="text-left py-2 font-medium">Item</th>
                                                                    <th className="text-right py-2 font-medium">Qty</th>
                                                                    <th className="text-right py-2 font-medium">Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-zinc-800/50">
                                                                {result.line_items.map((item, i) => (
                                                                    <tr key={i} className="group hover:bg-zinc-900/30 transition-colors">
                                                                        <td className="py-3 pr-2 text-zinc-300">
                                                                            <div className="font-medium text-white">{item.description}</div>
                                                                            <div className="text-xs text-zinc-600 font-mono mt-0.5">@ {item.unit_price}</div>
                                                                        </td>
                                                                        <td className="py-3 px-2 text-right font-mono text-zinc-400">{item.quantity}</td>
                                                                        <td className="py-3 pl-2 text-right font-mono text-white font-medium">{item.total}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* Total */}
                                                    <div className="p-6 bg-zinc-900/20 border-t border-zinc-800 flex justify-end items-center gap-4">
                                                        <span className="text-sm text-zinc-500 uppercase tracking-widest">Total Amount</span>
                                                        <span className="text-2xl font-mono font-bold text-[#00e5ff] shadow-[0_0_15px_-5px_#00e5ff]">
                                                            {result.total_amount}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="p-4 border-t border-zinc-800 bg-[#0a0a0a]">
                                        <button
                                            onClick={() => setShowGate(true)}
                                            className="w-full py-3 px-4 rounded-xl bg-[#00e5ff] hover:bg-[#00c2d9] text-black font-bold uppercase tracking-wide text-sm transition-all shadow-[0_0_20px_-5px_#00e5ff] hover:shadow-[0_0_30px_-5px_#00e5ff] flex items-center justify-center gap-2"
                                        >
                                            <FileCheck className="w-5 h-5" />
                                            Get the Blueprint
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ============ EMAIL GATE MODAL ============ */}
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
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-[#0a0a0a] rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:0_0,0_0] animate-shine pointer-events-none opacity-10" />

                            <div className="relative p-6 border-b border-zinc-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white">
                                    {emailSubmitted ? 'Blueprint Sent' : 'Download Architecture'}
                                </h3>
                                <button onClick={() => setShowGate(false)} className="text-zinc-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8 relative">
                                {emailSubmitted ? (
                                    <div className="text-center py-6">
                                        <div className="w-16 h-16 rounded-full bg-[#00e5ff]/10 mx-auto flex items-center justify-center mb-6 border border-[#00e5ff]/20">
                                            <CheckCircle className="w-8 h-8 text-[#00e5ff]" />
                                        </div>
                                        <p className="text-zinc-300">
                                            The <span className="text-[#00e5ff]">AI-OCR Pipeline Blueprint</span> has been sent to your inbox.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6 flex gap-4 items-start">
                                            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                                                <Code className="w-6 h-6 text-[#00e5ff]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white mb-1">Full Technical Breakdown</h4>
                                                <p className="text-sm text-zinc-400 leading-relaxed">
                                                    Get the n8n logic, prompt engineering templates, and Gemini API configuration used in this demo.
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                                    Business Email
                                                </label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#00e5ff] transition-colors" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="name@company.com"
                                                        required
                                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-[#00e5ff]/50 focus:border-[#00e5ff] transition-all outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isPending || !email}
                                                className="w-full py-3.5 px-6 rounded-xl bg-[#00e5ff] hover:bg-[#00c2d9] disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold tracking-wide transition-all flex items-center justify-center gap-2 group"
                                            >
                                                {isPending ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                )}
                                                {isPending ? 'Processing...' : 'Send Me The Blueprint'}
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
