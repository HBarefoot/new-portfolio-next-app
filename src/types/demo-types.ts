export interface PricingConfig {
    basePrice: number;
    ageDepreciationRate: number; // per year
    fuelSurcharge: number;
    refitPremium: number;
    currency: string;
}

export interface Port {
    id: string;
    name: string;
    country: string;
    baseFee: number;
    surgeMultiplier: number; // For high season
}

export interface Yacht {
    id: string;
    name: string;
    year: number;
    length: number; // in meters
    type: 'Motor' | 'Sailing' | 'Catamaran';
    baseValue: number;
    location: string;
}

export interface WorkflowStep {
    id: string;
    name: string;
    type: 'trigger' | 'action' | 'condition';
    status: 'pending' | 'active' | 'completed' | 'error';
    icon: string;
}

export interface RoiMetric {
    id: string;
    label: string;
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: number;
    description: string;
}

export interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    category: 'technical' | 'milestone' | 'client';
    details?: {
        label: string;
        value: string;
    }[];
}

export interface DemoData {
    pricing: {
        config: PricingConfig;
        ports: Port[];
        yachts: Yacht[];
    };
    automation: {
        workflowSteps: WorkflowStep[];
        sampleContent: {
            raw: string;
            rendered: string;
            translated: string;
        };
    };
    roi: {
        defaultMetrics: RoiMetric[];
    };
    timeline: {
        events: TimelineEvent[];
    };
}
