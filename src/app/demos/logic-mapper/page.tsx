import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LogicMapper from '@/components/demos/LogicMapper';

export const metadata = {
    title: 'Automation Logic Mapper | Live Demo',
    description: 'Interactive architecture planner. Visualize how n8n connects your CRM, Finance, and AI tools into a single brain.',
};

export default function LogicMapperPage() {
    return (
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
            <div className="mb-8">
                <Link
                    href="/demos"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Demos
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Map Your Orchestration
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                    Stop using Zapier zaps. Start building an Event-Driven Architecture.
                    See how your tools talk to each other through n8n.
                </p>
            </div>

            <LogicMapper />
        </div>
    );
}
