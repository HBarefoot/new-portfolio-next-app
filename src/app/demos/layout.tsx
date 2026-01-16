import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Live Demos | Henry Barefoot',
    description: 'Interactive Proof of Concept demos showcasing maritime business logic, AI automation, and enterprise utility.',
};

export default function DemosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="py-20 lg:py-28">
                {children}
            </div>
        </div>
    );
}
