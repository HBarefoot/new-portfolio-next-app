import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import OcrDemo from '@/components/demos/OcrDemo';

export const metadata = {
    title: 'AI-Powered PDF Extraction | Live Demo',
    description: 'Drag-and-drop maritime OCR demonstration. Instantly converts PDF invoices to structured JSON using Gemini 2.0 Flash.',
};

export default function OcrExtractionPage() {
    return (
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
            <div className="mb-8">
                <Link
                    href="/demos"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Demos
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    See AI-OCR in Action
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                    Watch manual data entry disappear. Drop a maritime invoice or bill of lading
                    and see Gemini 2.0 Flash extract structured data in seconds.
                </p>
            </div>

            <OcrDemo />
        </div>
    );
}
