import { NextRequest, NextResponse } from 'next/server';

interface RohcSubmission {
    email: string;
    revenue: number;
    headcount: number;
    rohcScore: number;
    insight: string;
    timestamp: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RohcSubmission = await request.json();

        // Validate required fields
        if (!body.email || !body.revenue || !body.headcount) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get request metadata
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const referrer = request.headers.get('referer') || request.headers.get('referrer') || '';

        // Log the submission (for development)
        console.log('[ROHC Submission]', {
            email: body.email,
            revenue: body.revenue,
            headcount: body.headcount,
            rohcScore: body.rohcScore,
            insight: body.insight,
            timestamp: body.timestamp,
            ipAddress,
            userAgent,
            referrer,
        });

        // TODO: Forward to n8n webhook or save to Strapi
        // Example n8n integration:
        // const n8nWebhookUrl = process.env.N8N_ROHC_WEBHOOK_URL;
        // if (n8nWebhookUrl) {
        //     await fetch(n8nWebhookUrl, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ ...body, ipAddress, userAgent, referrer }),
        //     });
        // }

        return NextResponse.json({
            success: true,
            message: 'Submission received. Your report will be sent shortly.',
        }, { status: 200 });

    } catch (error) {
        console.error('ROHC submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
