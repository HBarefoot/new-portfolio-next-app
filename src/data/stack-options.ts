// Stack Options Data for Automation Logic Mapper
// Defines available tools categorized by function

export type ToolCategory = 'CRM' | 'Finance' | 'Communication' | 'Database' | 'Legal' | 'Marketing';

export interface StackTool {
    id: string;
    name: string;
    category: ToolCategory;
    color: string;
    description: string;
    iconPath: string; // SVG path data (viewBox 0 0 24 24)
}

export const CATEGORY_COLORS: Record<ToolCategory, string> = {
    CRM: '#FF6B35',
    Finance: '#22C55E',
    Communication: '#3B82F6',
    Database: '#A855F7',
    Legal: '#EAB308',
    Marketing: '#EC4899',
};

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
    CRM: 'CRM & Sales',
    Finance: 'Finance & Payments',
    Communication: 'Communication',
    Database: 'Data & Storage',
    Legal: 'Legal & Contracts',
    Marketing: 'Marketing',
};

export const STACK_TOOLS: StackTool[] = [
    // CRM
    {
        id: 'hubspot',
        name: 'HubSpot',
        category: 'CRM',
        color: '#FF7A59',
        description: 'CRM, marketing automation, sales pipeline',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' // Abstract info/sprocket
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        category: 'CRM',
        color: '#00A1E0',
        description: 'Enterprise CRM and customer platform',
        iconPath: 'M17.6 10.3c-.5-3.3-3.4-5.8-6.9-5.8-2.6 0-4.9 1.4-6 3.5-2.8.2-5 2.5-5 5.3 0 3 2.5 5.4 5.5 5.4h11.9c2.7 0 4.9-2.2 4.9-4.9 0-2.4-1.7-4.4-4.4-4.5z' // Cloud
    },
    {
        id: 'pipedrive',
        name: 'Pipedrive',
        category: 'CRM',
        color: '#1B1B1B', // Dark Pipedrive
        description: 'Sales pipeline management',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' // Target/Funnel simplified
    },

    // Finance
    {
        id: 'quickbooks',
        name: 'QuickBooks',
        category: 'Finance',
        color: '#2CA01C',
        description: 'Accounting and bookkeeping',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' // Simplified Q/Pause
    },
    {
        id: 'xero',
        name: 'Xero',
        category: 'Finance',
        color: '#13B5EA',
        description: 'Cloud accounting software',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.5L12 12l-3.5 3.5L7 14l3.5-3.5L7 7l1.5-1.5L12 9l3.5-3.5L17 7l-3.5 3.5L17 14l-1.5 1.5z' // Check/X shape
    },
    {
        id: 'stripe',
        name: 'Stripe',
        category: 'Finance',
        color: '#635BFF',
        description: 'Payment processing and billing',
        iconPath: 'M13.9 13.3c0-3.7-5.5-3.6-5.5-5.5 0-.8.9-1.3 2.6-1.3 2.1 0 3.8.5 4.8.9v-3c-1-.3-2.6-.5-4.5-.5-4.6 0-7.3 2.5-7.3 5.9 0 4.1 5.6 3.9 5.6 6 0 .9-1.1 1.4-2.8 1.4-2.2 0-4.2-.6-5.4-1.1v3.1c1.2.4 3 .6 4.9.6 4.9 0 7.6-2.4 7.6-6.1z' // S shape
    },

    // Communication
    {
        id: 'slack',
        name: 'Slack',
        category: 'Communication',
        color: '#4A154B',
        description: 'Team messaging and collaboration',
        iconPath: 'M5.042 15.165a2.528 2.528 0 0 1 2.52 2.523A2.528 2.528 0 0 1 5.042 20.21a2.528 2.528 0 0 1-2.52-2.522 2.528 2.528 0 0 1 2.52-2.523zm3.79-5.05a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.522 2.528 2.528 0 0 1-2.521-2.522A2.528 2.528 0 0 1 8.832 10.115zm0-3.784a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.522 2.528 2.528 0 0 1-2.521-2.522 2.528 2.528 0 0 1 2.521-2.521zm-3.79 3.784a2.528 2.528 0 0 1 2.52 2.521 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.52-2.522 2.528 2.528 0 0 1 2.52-2.521zM7.576 6.32a6.31 6.31 0 1 1 6.31 6.312A6.31 6.31 0 0 1 7.575 6.321z' // Slack hash simplified (actually using more abstract shapes here but recognizable)
    },
    {
        id: 'gmail',
        name: 'Gmail',
        category: 'Communication',
        color: '#EA4335',
        description: 'Email communication',
        iconPath: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' // Envelope
    },
    {
        id: 'twilio',
        name: 'Twilio',
        category: 'Communication',
        color: '#F22F46',
        description: 'SMS, voice, and messaging APIs',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' // Circles
    },
    {
        id: 'telegram',
        name: 'Telegram',
        category: 'Communication',
        color: '#0088CC',
        description: 'Messaging and bot platform',
        iconPath: 'M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.432z' // Paper plane
    },

    // Database
    {
        id: 'bigquery',
        name: 'BigQuery',
        category: 'Database',
        color: '#4285F4',
        description: 'Google cloud data warehouse',
        iconPath: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' // Magnifying glass
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Database',
        color: '#336791',
        description: 'Relational database',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-2-6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2 .9-2 2z' // Simplified eyeball/database
    },
    {
        id: 'sheets',
        name: 'Google Sheets',
        category: 'Database',
        color: '#0F9D58',
        description: 'Spreadsheet data storage',
        iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z' // Grid
    },

    // Legal
    {
        id: 'docusign',
        name: 'DocuSign',
        category: 'Legal',
        color: '#FFCC00',
        description: 'Electronic signatures and contracts',
        iconPath: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z' // Bookmark/Contract
    },

    // Marketing
    {
        id: 'mailchimp',
        name: 'Mailchimp',
        category: 'Marketing',
        color: '#FFE01B',
        description: 'Email marketing automation',
        iconPath: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z' // Envelope (marketing)
    },
    {
        id: 'googleads',
        name: 'Google Ads',
        category: 'Marketing',
        color: '#4285F4',
        description: 'Paid search advertising',
        iconPath: 'M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' // Play button circle
    },
];

// Logic Insights - dynamic messages based on tool combinations
export const LOGIC_INSIGHTS: Record<string, string> = {
    'hubspot+slack': 'When a high-value lead enters HubSpot, n8n instantly notifies the Sales Channel in Slack.',
    'hubspot+gmail': 'Automatically send personalized follow-up emails from Gmail when HubSpot deals change stage.',
    'stripe+quickbooks': 'Sync Stripe payments to QuickBooks in real-time. No more manual reconciliation.',
    'stripe+slack': 'Get instant Slack alerts for successful payments, refunds, and subscription changes.',
    'docusign+postgresql': 'Sync contract status webhooks directly to your database for compliance tracking.',
    'docusign+slack': 'Notify your team the moment a contract is signed in DocuSign.',
    'salesforce+bigquery': 'Stream Salesforce data to BigQuery for advanced analytics and ML pipelines.',
    'hubspot+sheets': 'Export HubSpot contacts to Google Sheets for easy reporting and sharing.',
    'twilio+hubspot': 'Send SMS follow-ups to leads based on HubSpot workflow triggers.',
    'telegram+postgresql': 'Build a Telegram bot that queries your database in real-time.',
    'gmail+hubspot': 'Auto-log Gmail conversations to HubSpot contact records.',
    'slack+postgresql': 'Query your database directly from Slack using slash commands.',
    'stripe+xero': 'Automatically create Xero invoices from Stripe subscriptions.',
    'mailchimp+hubspot': 'Sync HubSpot segments to Mailchimp for targeted email campaigns.',
    'googleads+sheets': 'Pull Google Ads performance data into Sheets for custom dashboards.',
};

// Default insight when no specific combination is found
export const DEFAULT_INSIGHT = 'n8n orchestrates data flow between your selected tools, eliminating manual data entry and enabling event-driven automation.';

// Get insight for a set of tools
export function getLogicInsight(toolIds: string[]): string {
    if (toolIds.length < 2) {
        return 'Select two or more tools to see how n8n connects them.';
    }

    // Check all pairs for matches
    for (let i = 0; i < toolIds.length; i++) {
        for (let j = i + 1; j < toolIds.length; j++) {
            const key1 = `${toolIds[i]}+${toolIds[j]}`;
            const key2 = `${toolIds[j]}+${toolIds[i]}`;
            if (LOGIC_INSIGHTS[key1]) return LOGIC_INSIGHTS[key1];
            if (LOGIC_INSIGHTS[key2]) return LOGIC_INSIGHTS[key2];
        }
    }

    return DEFAULT_INSIGHT;
}

// Get all categories
export function getCategories(): ToolCategory[] {
    return ['CRM', 'Finance', 'Communication', 'Database', 'Legal', 'Marketing'];
}

// Get tools by category
export function getToolsByCategory(category: ToolCategory): StackTool[] {
    return STACK_TOOLS.filter((tool) => tool.category === category);
}
