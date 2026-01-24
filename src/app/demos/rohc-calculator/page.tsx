import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RohcCalculator from '@/components/demos/RohcCalculator';

export const metadata = {
    title: 'ROHC Calculator | Live Demo',
    description: 'Interactive Return on Human Capital calculator. Benchmark your revenue-per-employee against industry and AI-orchestrated standards.',
};

export default function RohcPage() {
    return (
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="mb-12">
                <Link
                    href="/demos"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Demos
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Is your headcount a growth driver or a growth drag?
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                    Calculate your Return on Human Capital (ROHC) and see how you measure up against
                    industry benchmarks—and the AI-orchestrated frontier of &quot;decoupled growth.&quot;
                </p>
            </div>

            <RohcCalculator />
        </div>
    );
}
