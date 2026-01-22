'use client';

import { Zap, Maximize2, Smartphone } from 'lucide-react';
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
                    <div className="p-4 bg-muted rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Time to Interactive</div>
                        <div className="text-xl font-bold text-primary font-mono">0.05s</div>
                    </div>
                    <div className="p-4 bg-muted rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">FPS During Drag</div>
                        <div className="text-xl font-bold text-primary font-mono">60 FPS</div>
                    </div>
                    <div className="p-4 bg-muted rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Layout Shift (CLS)</div>
                        <div className="text-xl font-bold text-primary font-mono">0.000</div>
                    </div>
                    <div className="p-4 bg-muted rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Format Optimization</div>
                        <div className="text-xl font-bold text-primary font-mono">WebP</div>
                    </div>
                </div>
            </DemoCard>

            {/* Feature Grids */}
            <div className="grid md:grid-cols-3 gap-8">
                <DemoCard title="Media Optimization" className="h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                            <Zap className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Automatic WebP/AVIF conversion reduced average gallery payload by <strong>68%</strong> compared to standard JPEGs, ensuring instant loading even on 4G maritime networks.
                        </p>
                    </div>
                </DemoCard>

                <DemoCard title="Responsive Scaling" className="h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Fluid aspect ratios prevent layout shifts (CLS). Images adapt to device capability, serving 2x density assets only to Retina screens.
                        </p>
                    </div>
                </DemoCard>

                <DemoCard title="Lightbox API" className="h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                            <Maximize2 className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Custom accessible hook implementations for full-screen viewing, adhering to WCAG 2.1 navigation standards for keypad users.
                        </p>
                    </div>
                </DemoCard>
            </div>
        </div>
    );
}
