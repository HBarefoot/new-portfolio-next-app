'use client';

import { Image as ImageIcon, Zap, Maximize2, Smartphone } from 'lucide-react';
import DemoCard from './DemoCard';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function VisualGallery() {
    return (
        <div className="space-y-8">

            {/* Main Interactive Demo */}
            <DemoCard title="Interactive Design Comparison" description="High-performance canvas manipulation engaging users longer than static galleries.">
                <BeforeAfterSlider
                    beforeImage="/images/demos/yacht-interior-blueprint.png"
                    afterImage="/images/demos/yacht-interior-finished.png"
                />

                {/* Performance Metrics Below */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Time to Interactive</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400 font-mono">0.05s</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">FPS During Drag</div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">60 FPS</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Layout Shift (CLS)</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400 font-mono">0.000</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Format Optimization</div>
                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">WebP</div>
                    </div>
                </div>
            </DemoCard>

            {/* Feature Grids */}
            <div className="grid md:grid-cols-3 gap-8">
                <DemoCard title="Media Optimization" className="h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-full">
                            <Zap className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Automatic WebP/AVIF conversion reduced average gallery payload by <strong>68%</strong> compared to standard JPEGs, ensuring instant loading even on 4G maritime networks.
                        </p>
                    </div>
                </DemoCard>

                <DemoCard title="Responsive Scaling" className="h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Fluid aspect ratios prevent layout shifts (CLS). Images adapt to device capability, serving 2x density assets only to Retina screens.
                        </p>
                    </div>
                </DemoCard>

                <DemoCard title="Lightbox API" className="h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full">
                            <Maximize2 className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Custom accessible hook implementations for full-screen viewing, adhering to WCAG 2.1 navigation standards for keypad users.
                        </p>
                    </div>
                </DemoCard>
            </div>
        </div>
    );
}
