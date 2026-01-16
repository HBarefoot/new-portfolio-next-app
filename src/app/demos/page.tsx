import Link from 'next/link';
import { ArrowRight, Anchor, Cpu, TrendingUp, Image as ImageIcon, Shield } from 'lucide-react';

const demos = [
    {
        title: 'Maritime Pricing Engine',
        description: 'Complex pricing logic with port fees, vessel depreciation, and international variables.',
        icon: Anchor,
        href: '/demos/yacht-pricing',
        color: 'text-blue-500',
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        tags: ['Business Logic', 'FinTech', 'Maritime']
    },
    {
        title: 'Automated Content Newsroom',
        description: 'AI-driven workflow visualization transforming raw WikiJS data into polished multi-lingual posts.',
        icon: Cpu,
        href: '/demos/content-newsroom',
        color: 'text-purple-500',
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        tags: ['AI Automation', 'n8n', 'Workflow']
    },
    {
        title: 'ROI & Metrics Simulator',
        description: 'Interactive financial modeling dashboard for C-suite decision making.',
        icon: TrendingUp,
        href: '/demos/roi-simulator',
        color: 'text-green-500',
        bg: 'bg-green-100 dark:bg-green-900/20',
        tags: ['Data Viz', 'Executive Tools', 'Calculator']
    },
    {
        title: 'High-Fidelity Visual Gallery',
        description: 'Performance-optimized media handling with before/after comparisons for luxury assets.',
        icon: ImageIcon,
        href: '/demos/visual-gallery',
        color: 'text-pink-500',
        bg: 'bg-pink-100 dark:bg-pink-900/20',
        tags: ['Media Optimization', 'UX/UI', 'Performance']
    },
    {
        title: 'Enterprise Client Portal',
        description: 'Secure owner dashboard with timeline tracking and technical logs.',
        icon: Shield,
        href: '/demos/client-portal',
        color: 'text-indigo-500',
        bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        tags: ['SaaS', 'Dashboard', 'Secure']
    }
];

export default function DemosPage() {
    return (
        <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Live Proof of Concepts
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Interactive environments simulating real-world B2B applications in maritime and enterprise sectors.
                    <br className="hidden md:block" />
                    <span className="text-sm font-semibold text-gray-500 mt-2 block uppercase tracking-wider">
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
                            className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 block"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${demo.bg}`}>
                                <Icon className={`w-7 h-7 ${demo.color}`} />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {demo.title}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                {demo.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {demo.tags.map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
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
