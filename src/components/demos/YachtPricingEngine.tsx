'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Calculator, DollarSign, MapPin, Ship, Calendar, RefreshCcw } from 'lucide-react';
import demoData from '@/data/demos.json';
import DemoCard from './DemoCard';

export default function YachtPricingEngine() {
    const { yachts, ports, config } = demoData.pricing;

    const [selectedYachtId, setSelectedYachtId] = useState(yachts[0].id);
    const [selectedPortId, setSelectedPortId] = useState(ports[0].id);
    const [includeRefit, setIncludeRefit] = useState(false);
    const [isHighSeason, setIsHighSeason] = useState(false);

    const calculation = useMemo(() => {
        const yacht = yachts.find(y => y.id === selectedYachtId) || yachts[0];
        const port = ports.find(p => p.id === selectedPortId) || ports[0];

        // Logic: Base Transport Cost derived from Vessel Value (simplified for demo) and Length
        // Real logic would be more like: Base Rate * Length + Port Fees
        const baseTransportRate = 1200; // Base rate per meter
        const transportCost = baseTransportRate * yacht.length;

        // Age factor (mock depreciation impact on insurance/handling)
        const currentYear = new Date().getFullYear();
        const age = currentYear - yacht.year;
        const ageSurcharge = age * 1500; // Older boats cost more to insure/handle

        // Port fees
        const portBase = port.baseFee;
        const seasonMultiplier = isHighSeason ? port.surgeMultiplier : 1;
        const finalPortFee = portBase * seasonMultiplier;

        // Refit handling
        const refitCost = includeRefit ? config.refitPremium : 0;

        const total = transportCost + ageSurcharge + finalPortFee + config.fuelSurcharge + refitCost;

        return {
            subtotal: transportCost,
            ageSurcharge,
            portFees: finalPortFee,
            fuel: config.fuelSurcharge,
            refit: refitCost,
            total
        };
    }, [selectedYachtId, selectedPortId, includeRefit, isHighSeason, yachts, ports, config]);

    const activeYacht = yachts.find(y => y.id === selectedYachtId);

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Configuration Panel */}
            <div className="space-y-6">
                <DemoCard title="Vessel & Route Configuration" description="Configure transport variables to calculate real-time quotes.">
                    <div className="space-y-6">
                        {/* Yacht Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Select Vessel
                            </label>
                            <div className="grid gap-3">
                                {yachts.map((yacht) => (
                                    <button
                                        key={yacht.id}
                                        onClick={() => setSelectedYachtId(yacht.id)}
                                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${selectedYachtId === yacht.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${selectedYachtId === yacht.id ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                                                <Ship className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-white">{yacht.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{yacht.length}m • {yacht.type} • {yacht.year}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Port Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Destination Port
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={selectedPortId}
                                    onChange={(e) => setSelectedPortId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
                                >
                                    {ports.map((port) => (
                                        <option key={port.id} value={port.id}>
                                            {port.name}, {port.country} (Base Fee: ${port.baseFee})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setIncludeRefit(!includeRefit)}
                                className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all ${includeRefit
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                    : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <RefreshCcw className={`w-5 h-5 ${includeRefit ? 'text-purple-600' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${includeRefit ? 'text-purple-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                        Include Refit
                                    </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${includeRefit ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}>
                                    {includeRefit && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                            </button>

                            <button
                                onClick={() => setIsHighSeason(!isHighSeason)}
                                className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all ${isHighSeason
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                    : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Calendar className={`w-5 h-5 ${isHighSeason ? 'text-orange-600' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${isHighSeason ? 'text-orange-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                        High Season
                                    </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isHighSeason ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                                    {isHighSeason && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                            </button>
                        </div>
                    </div>
                </DemoCard>
            </div>

            {/* Output Panel */}
            <div className="space-y-6">
                <DemoCard title="Cost Breakdown" description="Real-time algorithmic pricing analysis based on inventory and market data.">
                    <div className="space-y-4">
                        {/* Line Items */}
                        <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-2">
                                    <Ship className="w-4 h-4" /> Base Transport ({activeYacht?.length}m)
                                </span>
                                <span>${calculation.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-2">
                                    <Anchor className="w-4 h-4" /> Port Fees {isHighSeason && <span className="text-xs text-orange-500 font-bold">(High Season)</span>}
                                </span>
                                <span>${calculation.portFees.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Fuel Surcharge
                                </span>
                                <span>${calculation.fuel.toLocaleString()}</span>
                            </div>

                            <AnimatePresence>
                                {includeRefit && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex justify-between items-center text-purple-600 dark:text-purple-400 font-medium"
                                    >
                                        <span className="flex items-center gap-2">
                                            <RefreshCcw className="w-4 h-4" /> Refit Logistics
                                        </span>
                                        <span>${calculation.refit.toLocaleString()}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Total */}
                        <div className="pt-2">
                            <div className="flex justify-between items-baseline">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">Estimated Total</span>
                                <motion.span
                                    key={calculation.total}
                                    initial={{ scale: 0.8, color: '#3b82f6' }}
                                    animate={{ scale: 1, color: 'inherit' }}
                                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                                >
                                    ${calculation.total.toLocaleString()}
                                </motion.span>
                            </div>
                            <p className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1">
                                *Indicative commercial estimate only
                            </p>
                        </div>

                        {/* Action */}
                        <button className="w-full mt-4 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Generate Official Quote
                        </button>
                    </div>
                </DemoCard>

                {/* Logic Explanation Box */}
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 text-xs text-blue-800 dark:text-blue-300 font-mono">
                    <p className="font-bold mb-1">// Algorithm Logic</p>
                    <p>{`Total = (BaseRate * ${activeYacht?.length}m) + (AgeDiff * RiskPremium) + (${isHighSeason ? 'Surge' : 'Base'}PortFee) + Attributes`}</p>
                </div>
            </div>
        </div>
    );
}
