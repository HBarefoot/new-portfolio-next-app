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
                            <label className="block text-sm font-semibold text-foreground mb-2">
                                Select Vessel
                            </label>
                            <div className="grid gap-3">
                                {yachts.map((yacht) => (
                                    <button
                                        key={yacht.id}
                                        onClick={() => setSelectedYachtId(yacht.id)}
                                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${selectedYachtId === yacht.id
                                            ? 'border-primary bg-secondary ring-1 ring-primary'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${selectedYachtId === yacht.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                                <Ship className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground">{yacht.name}</div>
                                                <div className="text-xs text-muted-foreground">{yacht.length}m • {yacht.type} • {yacht.year}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Port Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">
                                Destination Port
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <select
                                    value={selectedPortId}
                                    onChange={(e) => setSelectedPortId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none cursor-pointer"
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
                                    ? 'border-primary bg-secondary'
                                    : 'border-border'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <RefreshCcw className={`w-5 h-5 ${includeRefit ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className={`font-medium ${includeRefit ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        Include Refit
                                    </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${includeRefit ? 'bg-primary border-primary' : 'border-input'}`}>
                                    {includeRefit && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                            </button>

                            <button
                                onClick={() => setIsHighSeason(!isHighSeason)}
                                className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all ${isHighSeason
                                    ? 'border-primary bg-secondary'
                                    : 'border-border'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Calendar className={`w-5 h-5 ${isHighSeason ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className={`font-medium ${isHighSeason ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        High Season
                                    </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isHighSeason ? 'bg-primary border-primary' : 'border-input'}`}>
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
                        <div className="space-y-3 pb-6 border-b border-border">
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Ship className="w-4 h-4" /> Base Transport ({activeYacht?.length}m)
                                </span>
                                <span>${calculation.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Anchor className="w-4 h-4" /> Port Fees {isHighSeason && <span className="text-xs text-primary font-bold">(High Season)</span>}
                                </span>
                                <span>${calculation.portFees.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
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
                                        className="flex justify-between items-center text-primary font-medium"
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
                                <span className="text-lg font-bold text-foreground">Estimated Total</span>
                                <motion.span
                                    key={calculation.total}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-4xl font-bold text-foreground"
                                >
                                    ${calculation.total.toLocaleString()}
                                </motion.span>
                            </div>
                            <p className="text-xs text-right text-muted-foreground mt-1">
                                *Indicative commercial estimate only
                            </p>
                        </div>

                        {/* Action */}
                        <button className="w-full mt-4 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Generate Official Quote
                        </button>
                    </div>
                </DemoCard>

                {/* Logic Explanation Box */}
                <div className="p-4 rounded-xl bg-muted border border-border text-xs text-muted-foreground font-mono">
                    <p className="font-bold mb-1">// Algorithm Logic</p>
                    <p>{`Total = (BaseRate * ${activeYacht?.length}m) + (AgeDiff * RiskPremium) + (${isHighSeason ? 'Surge' : 'Base'}PortFee) + Attributes`}</p>
                </div>
            </div>
        </div>
    );
}
