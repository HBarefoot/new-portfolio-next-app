'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, CheckCircle, TrendingUp, Users, Calendar } from 'lucide-react';
import DemoCard from './DemoCard';

// Animated Counter Component
function Counter({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
    return (
        <span className="inline-block">
            {prefix}
            {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
        </span>
    );
}

export default function ROISimulator() {
    // Input States
    const [dataEntryHours, setDataEntryHours] = useState(25); // Hours per week
    const [hourlyRate, setHourlyRate] = useState(45); // $ per hour
    const [errorRate, setErrorRate] = useState(12); // % Error rate currently
    const [teamSize, setTeamSize] = useState(3); // People

    // Calculations
    const calculatedMetrics = useMemo(() => {
        // Monthly manual cost
        const weeklyCost = dataEntryHours * hourlyRate * teamSize;
        const monthlyCost = weeklyCost * 4.33; // Average weeks per month

        // Automation Savings (assuming 90% reduction)
        const automatedHours = dataEntryHours * 0.1;
        const automatedCost = automatedHours * hourlyRate * teamSize; // Reduced hours

        const monthlySavings = monthlyCost - automatedCost;
        const annualSavings = monthlySavings * 12;

        const hoursRecovered = (dataEntryHours - automatedHours) * 4.33 * teamSize;

        // Accuracy gain (assuming new error rate is < 1%)
        const accuracyGain = errorRate - 0.5;

        return {
            monthlySavings,
            annualSavings,
            hoursRecovered,
            accuracyGain
        };
    }, [dataEntryHours, hourlyRate, errorRate, teamSize]);

    // Framer Motion Springs for smooth value transitions
    // We can't easily animate the numbers directly inside standard React render cycle without a dedicated hook or component
    // For simplicity in this demo, we'll let React handle un-animated updates or use simple CSS transitions for bars
    // But the requirement asked for animations. 
    // A simple way is to use a key on the result to trigger a small pop effect.

    return (
        <div className="grid lg:grid-cols-2 gap-8">

            {/* Inputs Panel */}
            <DemoCard title="Operational Inputs" description="Adjust variables to match your current manual workload." className="h-full">
                <div className="space-y-8">

                    {/* Input: Hours */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="font-semibold text-foreground">
                                Manual Hours / Week (per person)
                            </label>
                            <span className="font-mono text-primary font-bold bg-primary/10 px-2 py-1 rounded">
                                {dataEntryHours} hrs
                            </span>
                        </div>
                        <input
                            type="range" min="1" max="60" value={dataEntryHours}
                            onChange={(e) => setDataEntryHours(parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <p className="text-xs text-muted-foreground">Time spent on repetitive data entry tasks.</p>
                    </div>

                    {/* Input: Team Size */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="font-semibold text-foreground">
                                Team Size involved
                            </label>
                            <span className="font-mono text-primary font-bold bg-primary/10 px-2 py-1 rounded">
                                {teamSize} people
                            </span>
                        </div>
                        <input
                            type="range" min="1" max="20" value={teamSize}
                            onChange={(e) => setTeamSize(parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    {/* Input: Hourly Cost */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="font-semibold text-foreground">
                                Avg. Hourly Cost (Fully Loaded)
                            </label>
                            <span className="font-mono text-primary font-bold bg-primary/10 px-2 py-1 rounded">
                                ${hourlyRate}/hr
                            </span>
                        </div>
                        <input
                            type="range" min="15" max="200" step="5" value={hourlyRate}
                            onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border w-full" />

                    {/* Input: Error Rate */}
                    <div className="space-y-3 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex justify-between">
                            <label className="font-semibold text-muted-foreground">
                                Current Error Rate
                            </label>
                            <span className="font-mono text-muted-foreground font-bold bg-muted px-2 py-1 rounded">
                                {errorRate}%
                            </span>
                        </div>
                        <input
                            type="range" min="0" max="30" value={errorRate}
                            onChange={(e) => setErrorRate(parseInt(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-muted-foreground"
                        />
                    </div>

                </div>
            </DemoCard>

            {/* Output Panel */}
            <div className="flex flex-col gap-6">

                {/* Main Big Metric Card */}
                <DemoCard title="Projected Annual Impact" className="bg-gradient-to-br from-card to-secondary/20">
                    <div className="text-center py-6">
                        <div className="text-sm text-muted-foreground uppercase tracking-wide font-semibold mb-2">Total Estimated Savings</div>
                        <motion.div
                            key={calculatedMetrics.annualSavings}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl md:text-6xl font-black text-foreground"
                        >
                            ${Math.floor(calculatedMetrics.annualSavings).toLocaleString()}
                        </motion.div>
                        <p className="mt-2 text-primary font-medium flex items-center justify-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            +${Math.floor(calculatedMetrics.monthlySavings).toLocaleString()} / month
                        </p>
                    </div>
                </DemoCard>

                {/* Secondary Metrics Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Hours Recovered */}
                    <motion.div
                        className="bg-card rounded-2xl p-6 shadow-lg border border-border relative overflow-hidden group"
                        whileHover={{ y: -5 }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock className="w-12 h-12" />
                        </div>
                        <h3 className="text-muted-foreground font-medium text-sm mb-2">Productivity Recaptured</h3>
                        <div className="text-3xl font-bold text-foreground">
                            {Math.round(calculatedMetrics.hoursRecovered).toLocaleString()}
                            <span className="text-lg text-muted-foreground ml-1">hrs/mo</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(calculatedMetrics.hoursRecovered / (160 * teamSize) * 100, 100)}%` }} // % of total monthly hours per person
                            />
                        </div>
                    </motion.div>

                    {/* Accuracy */}
                    <motion.div
                        className="bg-card rounded-2xl p-6 shadow-lg border border-border relative overflow-hidden group"
                        whileHover={{ y: -5 }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h3 className="text-muted-foreground font-medium text-sm mb-2">Accuracy Boost</h3>
                        <div className="text-3xl font-bold text-foreground">
                            +{calculatedMetrics.accuracyGain.toFixed(1)}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Error reduction from {errorRate}% to 0.5%</p>
                    </motion.div>
                </div>

                {/* ROI Context */}
                <div className="bg-gray-900 dark:bg-gray-800 text-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/10 dark:bg-gray-900/10 rounded-xl">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Executive Summary</h4>
                            <p className="opacity-80 text-sm leading-relaxed">
                                By automating {dataEntryHours} weekly hours across {teamSize} staff, you unlock the equivalent of
                                <strong className="text-primary mx-1">
                                    {((calculatedMetrics.hoursRecovered / 160)).toFixed(1)} full-time employees
                                </strong>
                                for high-value strategic work.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
