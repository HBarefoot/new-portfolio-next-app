import Link from 'next/link';
import { ArrowRight, Anchor, Cpu, TrendingUp, Image as ImageIcon, Shield, Calculator, ClipboardCheck, ScanLine, Workflow } from 'lucide-react';

const demos = [
    {
        title: 'Automation Logic Mapper',
        description: 'Interactive architecture planner. Visualize how n8n connects your CRM, Finance, and AI tools into a single brain.',
        icon: Workflow,
        href: '/demos/logic-mapper',
        tags: ['n8n', 'System Design', 'Interactive']
    },
    {
        title: 'AI-Powered PDF Extraction',
        description: 'Drag-and-drop maritime OCR. Instantly converts PDF invoices to structured JSON using GPT-4o Vision.',
        icon: ScanLine,
        href: '/demos/ocr-extraction',
        tags: ['n8n Webhook', 'GPT-4o', 'Computer Vision']
    },
    {
        title: 'Maritime AI Readiness Assessment',
        description: '10-question diagnostic engine. Evaluates technical infrastructure across Data, Process, and Strategy.',
        icon: ClipboardCheck,
        href: '/demos/readiness-assessment',
        tags: ['Interactive Quiz', 'Scoring Logic', 'Lead Gen']
    },
    {
        title: 'ROHC Calculator',
        description: 'Interactive logic engine for CEOs. Calculate revenue-per-employee vs. AI benchmarks.',
        icon: Calculator,
        href: '/demos/rohc-calculator',
        tags: ['Next.js 14', 'TypeScript', 'Algorithmic Logic']
    },
    {
        title: 'Maritime Pricing Engine',
        description: 'Complex pricing logic with port fees, vessel depreciation, and international variables.',
        icon: Anchor,
        href: '/demos/yacht-pricing',
        tags: ['Business Logic', 'FinTech', 'Maritime']
    },
    {
        title: 'Automated Content Newsroom',
        description: 'AI-driven workflow visualization transforming raw WikiJS data into polished multi-lingual posts.',
        icon: Cpu,
        href: '/demos/content-newsroom',
        tags: ['AI Automation', 'n8n', 'Workflow']
    },
    {
        title: 'ROI & Metrics Simulator',
        description: 'Interactive financial modeling dashboard for C-suite decision making.',
        icon: TrendingUp,
        href: '/demos/roi-simulator',
        tags: ['Data Viz', 'Executive Tools', 'Calculator']
    },
    {
        title: 'High-Fidelity Visual Gallery',
        description: 'Performance-optimized media handling with before/after comparisons for luxury assets.',
        icon: ImageIcon,
        href: '/demos/visual-gallery',
        tags: ['Media Optimization', 'UX/UI', 'Performance']
    },
    {
        title: 'Enterprise Client Portal',
        description: 'Secure owner dashboard with timeline tracking and technical logs.',
        icon: Shield,
        href: '/demos/client-portal',
        tags: ['SaaS', 'Dashboard', 'Secure']
    }
];

export default function DemosPage() {
    return (
        <div className="min-h-screen bg-background container mx-auto px-4 lg:px-6 pt-24 pb-16">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                    Live Proof of Concepts
                </h1>
                <p className="text-xl text-muted-foreground">
                    Interactive environments simulating real-world B2B applications in maritime and enterprise sectors.
                    <br className="hidden md:block" />
                    <span className="text-sm font-semibold text-primary/80 mt-4 block uppercase tracking-wider">
                        100% Uptime • Zero CMS Dependency • Sub-2s Performance
                    </span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {demos.map((demo) => {
                    const Icon = demo.icon;
                    return (
                        <Link
                            key={demo.href}
                            href={demo.href}
                            className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1 block"
                        >
                            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-green-500/10 transition-colors">
                                <Icon className="w-7 h-7 text-green-600 dark:text-green-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                                {demo.title}
                            </h2>

                            <p className="text-muted-foreground mb-6 line-clamp-3">
                                {demo.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {demo.tags.map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                Launch Demo
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
