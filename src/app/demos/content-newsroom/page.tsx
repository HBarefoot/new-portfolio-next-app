import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ContentNewsroom from '@/components/demos/ContentNewsroom';

export const metadata = {
    title: 'AI Content Automation Newsroom | Live Demo',
    description: 'Visualizer for n8n automated content pipelines transforming raw documentation into localized CMS posts.',
};

export default function ContentNewsroomPage() {
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
                    Automated Content Newsroom
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                    Observe an autonomous "AI Agent" pipeline in real-time. This demo simulates my actual n8n workflow that monitors WikiJS documentation, translates it via LLM, and publishes to Strapi.
                </p>
            </div>

            <ContentNewsroom />
        </div>
    );
}
