import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ClientPortal from '@/components/demos/ClientPortal';

export const metadata = {
    title: 'Enterprise Client Portal | Live Demo',
    description: 'Secure dashboard for maritime project management and owner communication.',
};

export default function ClientPortalPage() {
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
                    Enterprise Client Portal
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                    A secure, branded environment where high-net-worth clients can track complex build processes, access technical documentation, and communicate with project managers.
                </p>
            </div>

            <ClientPortal />
        </div>
    );
}
