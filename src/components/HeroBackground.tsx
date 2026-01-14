'use client';

import { motion } from 'framer-motion';

const HeroBackground = () => {
    // Pre-calculate coordinates for the animation
    const hubConnections = [
        { angle: 0, x: 270, y: 150 },
        { angle: 45, x: 234.85, y: 65.15 },
        { angle: 90, x: 150, y: 30 },
        { angle: 135, x: 65.15, y: 65.15 },
        { angle: 180, x: 30, y: 150 },
        { angle: 225, x: 65.15, y: 234.85 },
        { angle: 270, x: 150, y: 270 },
        { angle: 315, x: 234.85, y: 234.85 }
    ];

    const secondaryHubConnections = [
        { angle: 30, x: 202.99, y: 80 },
        { angle: 90, x: 125, y: 35 },
        { angle: 150, x: 47.01, y: 80 },
        { angle: 210, x: 47.01, y: 170 },
        { angle: 270, x: 125, y: 215 },
        { angle: 330, x: 202.99, y: 170 }
    ];

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Central Hub Network - Constrained positioning */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 3, delay: 1 }}
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 lg:left-1/6 lg:transform-none"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
            >
                <svg width="250" height="250" viewBox="0 0 250 250" className="w-48 h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 max-w-full max-h-full">
                    {/* Central Node */}
                    <motion.circle
                        cx="125"
                        cy="125"
                        r="12"
                        fill="#3b82f6"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="opacity-80"
                    />

                    {/* Radiating Connection Lines - Adjusted for smaller SVG */}
                    {hubConnections.map((connection, i) => (
                        <g key={`connection-${i}`}>
                            <motion.line
                                x1="125"
                                y1="125"
                                x2={125 + (connection.x - 150) * 0.8}
                                y2={125 + (connection.y - 150) * 0.8}
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    repeatDelay: 3
                                }}
                                className="opacity-70"
                            />

                            {/* Flowing Data Particles - Fixed initial position to prevent undefined cx/cy */}
                            <motion.circle
                                r="3"
                                fill="#8b5cf6"
                                initial={{
                                    cx: 125,
                                    cy: 125,
                                    opacity: 0
                                }}
                                animate={{
                                    cx: [125, 125 + (connection.x - 150) * 0.8],
                                    cy: [125, 125 + (connection.y - 150) * 0.8],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2.5,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* End Nodes */}
                            <motion.circle
                                cx={125 + (connection.x - 150) * 0.8}
                                cy={125 + (connection.y - 150) * 0.8}
                                r="6"
                                fill="#8b5cf6"
                                animate={{
                                    scale: [0.8, 1.3, 0.8],
                                    opacity: [0.5, 0.9, 0.5]
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.2,
                                    repeat: Infinity
                                }}
                            />
                        </g>
                    ))}
                </svg>
            </motion.div>

            {/* Secondary Hub Network - Constrained positioning */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 3, delay: 2 }}
                className="absolute bottom-1/4 right-4 lg:top-1/3 lg:right-8 z-10"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
            >
                <svg width="200" height="200" viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 max-w-full max-h-full">
                    {/* Central Node */}
                    <motion.rect
                        x="85"
                        y="85"
                        width="30"
                        height="30"
                        rx="6"
                        fill="#06b6d4"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="opacity-70"
                    />

                    {/* Radiating Lines - Adjusted for smaller viewport */}
                    {secondaryHubConnections.map((connection, i) => (
                        <g key={`secondary-${i}`}>
                            <motion.line
                                x1="100"
                                y1="100"
                                x2={100 + (connection.x - 125) * 0.7}
                                y2={100 + (connection.y - 125) * 0.7}
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeDasharray="4,3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    repeatDelay: 2
                                }}
                                className="opacity-60"
                            />

                            {/* Data Flow - Fixed initial position to prevent undefined cx/cy */}
                            <motion.circle
                                r="2"
                                fill="#f59e0b"
                                initial={{
                                    cx: 100,
                                    cy: 100,
                                    opacity: 0
                                }}
                                animate={{
                                    cx: [100, 100 + (connection.x - 125) * 0.7],
                                    cy: [100, 100 + (connection.y - 125) * 0.7],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 3.5,
                                    delay: i * 0.5,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />

                            {/* Target Nodes */}
                            <motion.polygon
                                points={`${100 + (connection.x - 125) * 0.7},${100 + (connection.y - 125) * 0.7 - 4} ${100 + (connection.x - 125) * 0.7 + 4},${100 + (connection.y - 125) * 0.7 + 4} ${100 + (connection.x - 125) * 0.7 - 4},${100 + (connection.y - 125) * 0.7 + 4}`}
                                fill="#f59e0b"
                                animate={{
                                    scale: [0.7, 1.4, 0.7],
                                    opacity: [0.4, 0.8, 0.4]
                                }}
                                transition={{
                                    duration: 4,
                                    delay: i * 0.3,
                                    repeat: Infinity
                                }}
                            />
                        </g>
                    ))}
                </svg>
            </motion.div>
        </div>
    );
};

export default HeroBackground;
