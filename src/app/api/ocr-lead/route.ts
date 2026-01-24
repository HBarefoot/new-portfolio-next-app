import { NextRequest, NextResponse } from 'next/server';

interface OcrLeadSubmission {
    email: string;
    lead_source: string;
    context?: string;
    timestamp: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: OcrLeadSubmission = await request.json();

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

        console.log('[OCR Lead Submission]', {
            email: body.email,
            lead_source: body.lead_source,
            context: body.context,
            timestamp: body.timestamp,
            ipAddress,
            userAgent,
        });

        // TODO: Forward to n8n or save to CRM
        // const n8nWebhookUrl = process.env.N8N_OCR_LEAD_WEBHOOK;

        return NextResponse.json({
            success: true,
            message: 'Lead captured successfully',
        });

    } catch (error) {
        console.error('OCR lead submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
