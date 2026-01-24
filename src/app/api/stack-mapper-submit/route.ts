import { NextRequest, NextResponse } from 'next/server';

interface SelectedTool {
    id: string;
    name: string;
    category: string;
}

interface StackMapperSubmission {
    email: string;
    selected_tools: SelectedTool[];
    lead_source: string;
    asset_requested: string;
    timestamp: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: StackMapperSubmission = await request.json();

        if (!body.email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Get request metadata
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        console.log('[Stack Mapper Lead Submission]', {
            email: body.email,
            selected_tools: body.selected_tools,
            lead_source: body.lead_source,
            asset_requested: body.asset_requested,
            timestamp: body.timestamp,
            ipAddress,
            userAgent,
        });

        // TODO: Forward to n8n or save to CRM
        // const n8nWebhookUrl = process.env.N8N_STACK_MAPPER_WEBHOOK;

        return NextResponse.json({
            success: true,
            message: 'Lead captured successfully',
        });

    } catch (error) {
        console.error('Stack mapper submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
