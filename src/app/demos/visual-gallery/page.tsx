import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import VisualGallery from '@/components/demos/VisualGallery';

export const metadata = {
    title: 'High-Fidelity Visual Gallery | Live Demo',
    description: 'Performance-optimized media gallery showcasing Next.js Image optimization and interactive comparison tools.',
};

export default function VisualGalleryPage() {
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
                    High-Fidelity Visual Gallery
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                    Demonstrating that "Heavy Media" doesn't have to mean "Slow Performance". This gallery maintains sub-2s load times while delivering high-resolution interactive assets.
                </p>
            </div>

            <VisualGallery />
        </div>
    );
}
