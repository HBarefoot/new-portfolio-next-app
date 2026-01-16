import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ROISimulator from '@/components/demos/ROISimulator';

export const metadata = {
    title: 'Executive ROI & Metrics Simulator | Live Demo',
    description: 'Interactive financial modeling tool for B2B decision makers to calculate automation impact.',
};

export default function ROIPage() {
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
                    ROI & Metrics Simulator
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                    Translating technical automation into measurable business value. This dashboard helps C-suite executives visualize the financial impact of replacing manual workflows with custom software solutions.
                </p>
            </div>

            <ROISimulator />
        </div>
    );
}
