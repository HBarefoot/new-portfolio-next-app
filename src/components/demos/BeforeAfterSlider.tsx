'use client';

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { ArrowLeftRight, MoveHorizontal } from 'lucide-react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
    beforeLabel?: string;
    afterLabel?: string;
    beforeImage: string;
    afterImage: string;
    className?: string;
}

export default function BeforeAfterSlider({
    beforeLabel = "Concept Blueprint",
    afterLabel = "Finished Interior",
    beforeImage,
    afterImage,
    className = ""
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0-100
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    };

    const onMouseMove = (e: MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    };

    const onMouseUp = () => setIsDragging(false);

    // Global mouse up handler to catch releases outside the component
    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none shadow-2xl ${className}`}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseUp={onMouseUp}
        >
            {/* After Image (Background - Visible on Right) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src={afterImage}
                    alt={afterLabel}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                />

                <div className="absolute bottom-6 right-6 bg-secondary/90 backdrop-blur-md px-4 py-2 rounded-lg text-secondary-foreground font-semibold border border-white/10 shadow-lg z-10">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Foreground - Visible on Left - Clipped) */}
            <div
                className="absolute inset-0 bg-white flex items-center justify-center border-r-2 border-white"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={beforeImage}
                    alt={beforeLabel}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />

                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg text-primary font-semibold border border-primary/20 shadow-lg z-10">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full shadow-xl flex items-center justify-center text-primary">
                    <MoveHorizontal className="w-5 h-5" />
                </div>
            </div>

            {/* Instructional Overlay (Only visible initially) */}
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white text-sm font-medium transition-opacity duration-500 pointer-events-none ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                Drag slider to compare
            </div>
        </div>
    );
}
