// Maritime AI Readiness Assessment - Question Data

export enum Pillar {
    DATA_MATURITY = 'data_maturity',
    PROCESS_AUTOMATION = 'process_automation',
    STRATEGIC_ALIGNMENT = 'strategic_alignment',
}

export interface QuestionOption {
    label: string;
    value: string;
    weight: number; // 0-10 points
}

export interface Question {
    id: string;
    pillar: Pillar;
    text: string;
    options: QuestionOption[];
}

export const PILLAR_LABELS: Record<Pillar, string> = {
    [Pillar.DATA_MATURITY]: 'Data Maturity',
    [Pillar.PROCESS_AUTOMATION]: 'Process Automation',
    [Pillar.STRATEGIC_ALIGNMENT]: 'Strategic Alignment',
};

export const PILLAR_MAX_SCORES: Record<Pillar, number> = {
    [Pillar.DATA_MATURITY]: 40, // 4 questions x 10 max
    [Pillar.PROCESS_AUTOMATION]: 30, // 3 questions x 10 max
    [Pillar.STRATEGIC_ALIGNMENT]: 30, // 3 questions x 10 max
};

export const questions: Question[] = [
    // ============ DATA MATURITY (4 questions) ============
    {
        id: 'data-1',
        pillar: Pillar.DATA_MATURITY,
        text: 'Where is your sailing schedule data currently stored?',
        options: [
            { label: 'PDFs and email attachments', value: 'pdf', weight: 0 },
            { label: 'Shared spreadsheets (Excel/Google Sheets)', value: 'spreadsheet', weight: 4 },
            { label: 'Internal database with manual updates', value: 'database', weight: 7 },
            { label: 'API-connected SQL database with real-time sync', value: 'api', weight: 10 },
        ],
    },
    {
        id: 'data-2',
        pillar: Pillar.DATA_MATURITY,
        text: 'How do you track vessel positions and ETAs?',
        options: [
            { label: 'Manual calls to captains or agents', value: 'manual', weight: 0 },
            { label: 'Third-party website lookups', value: 'website', weight: 3 },
            { label: 'AIS integration with periodic imports', value: 'ais-import', weight: 6 },
            { label: 'Real-time AIS API with automated alerts', value: 'ais-api', weight: 10 },
        ],
    },
    {
        id: 'data-3',
        pillar: Pillar.DATA_MATURITY,
        text: 'How is your rate tariff data managed?',
        options: [
            { label: 'Paper rate cards or static PDFs', value: 'paper', weight: 0 },
            { label: 'Excel files updated quarterly', value: 'excel', weight: 3 },
            { label: 'Central database updated by team', value: 'database', weight: 6 },
            { label: 'Dynamic pricing engine with real-time adjustments', value: 'dynamic', weight: 10 },
        ],
    },
    {
        id: 'data-4',
        pillar: Pillar.DATA_MATURITY,
        text: 'What is the state of your customer/lead database?',
        options: [
            { label: 'Contacts scattered across email and personal files', value: 'scattered', weight: 0 },
            { label: 'Shared spreadsheet with basic info', value: 'spreadsheet', weight: 3 },
            { label: 'CRM system with manual data entry', value: 'crm-manual', weight: 6 },
            { label: 'CRM integrated with website, marketing, and sales tools', value: 'crm-integrated', weight: 10 },
        ],
    },

    // ============ PROCESS AUTOMATION (3 questions) ============
    {
        id: 'process-1',
        pillar: Pillar.PROCESS_AUTOMATION,
        text: 'How do you currently generate shipping quotes for clients?',
        options: [
            { label: 'Manual calculation in Excel, emailed as PDF', value: 'excel', weight: 0 },
            { label: 'Template-based system with some automation', value: 'template', weight: 4 },
            { label: 'Database lookup with staff-generated quotes', value: 'database', weight: 7 },
            { label: 'Instant AI-powered quotes via web portal', value: 'ai-instant', weight: 10 },
        ],
    },
    {
        id: 'process-2',
        pillar: Pillar.PROCESS_AUTOMATION,
        text: 'How are booking confirmations and documentation handled?',
        options: [
            { label: 'Manually typed and emailed one by one', value: 'manual', weight: 0 },
            { label: 'Copy-paste from templates', value: 'template', weight: 3 },
            { label: 'Semi-automated with document generation tools', value: 'semi-auto', weight: 6 },
            { label: 'Fully automated workflow triggered by booking', value: 'full-auto', weight: 10 },
        ],
    },
    {
        id: 'process-3',
        pillar: Pillar.PROCESS_AUTOMATION,
        text: 'How do you handle client status updates and notifications?',
        options: [
            { label: 'Clients call or email us for updates', value: 'reactive', weight: 0 },
            { label: 'Staff manually sends updates when remembered', value: 'manual', weight: 3 },
            { label: 'Scheduled batch emails or reports', value: 'batch', weight: 6 },
            { label: 'Real-time automated notifications via email/SMS/portal', value: 'realtime', weight: 10 },
        ],
    },

    // ============ STRATEGIC ALIGNMENT (3 questions) ============
    {
        id: 'strategy-1',
        pillar: Pillar.STRATEGIC_ALIGNMENT,
        text: 'What is your average lead response time?',
        options: [
            { label: 'Days (when staff has time)', value: 'days', weight: 0 },
            { label: 'Within 24 hours', value: '24h', weight: 4 },
            { label: 'Within a few hours', value: 'hours', weight: 7 },
            { label: 'Under 15 minutes (automated or dedicated team)', value: 'instant', weight: 10 },
        ],
    },
    {
        id: 'strategy-2',
        pillar: Pillar.STRATEGIC_ALIGNMENT,
        text: 'Does your organization have a dedicated digital transformation roadmap?',
        options: [
            { label: 'No, we focus on day-to-day operations', value: 'none', weight: 0 },
            { label: 'We have discussed it but nothing formal', value: 'informal', weight: 3 },
            { label: 'There is a plan but limited budget/resources', value: 'limited', weight: 6 },
            { label: 'Yes, with dedicated budget and executive sponsorship', value: 'formal', weight: 10 },
        ],
    },
    {
        id: 'strategy-3',
        pillar: Pillar.STRATEGIC_ALIGNMENT,
        text: 'How do you measure and track operational KPIs?',
        options: [
            { label: "We don't have formal KPI tracking", value: 'none', weight: 0 },
            { label: 'Ad-hoc reports when leadership asks', value: 'adhoc', weight: 3 },
            { label: 'Monthly reports compiled manually', value: 'monthly', weight: 6 },
            { label: 'Real-time dashboards with automated data feeds', value: 'realtime', weight: 10 },
        ],
    },
];

export const MAX_TOTAL_SCORE = 100;
