import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import YachtPricingEngine from '@/components/demos/YachtPricingEngine';

export const metadata = {
    title: 'Maritime Inventory & Pricing Engine | Live Demo',
    description: 'Interactive B2B pricing dashboard demonstrating complex business logic and port fees calculation.',
};

export default function YachtPricingPage() {
    return (
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="mb-12">
                <Link
                    href="/demos"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Demos
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Maritime Inventory & Pricing Engine
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    A logic-driven "Pricing Engine" that auto-calculates transport costs based on real-world maritime variables including depreciation, port fees, and seasonal demand.
                </p>
            </div>

            <YachtPricingEngine />
        </div>
    );
}
