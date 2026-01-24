import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReadinessQuiz from '@/components/demos/ReadinessQuiz';

export const metadata = {
    title: 'Maritime AI Readiness Assessment | Live Demo',
    description: '10-question diagnostic to evaluate your technical infrastructure across Data, Process, and Strategy pillars.',
};

export default function ReadinessAssessmentPage() {
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
            </div>

            <ReadinessQuiz />
        </div>
    );
}
