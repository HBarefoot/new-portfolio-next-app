import { NextRequest, NextResponse } from 'next/server';

interface ReadinessSubmission {
    email: string;
    total_score: number;
    pillar_scores: {
        data_maturity: number;
        process_automation: number;
        strategic_alignment: number;
    };
    answers: Array<{ question: string; answer: string }>;
    lead_source: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ReadinessSubmission = await request.json();

        // Validate required fields
        if (!body.email || body.total_score === undefined || !body.pillar_scores) {
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

        // Log the submission
        console.log('[Readiness Assessment Submission]', {
            email: body.email,
            total_score: body.total_score,
            pillar_scores: body.pillar_scores,
            answers: body.answers,
            lead_source: body.lead_source,
            ipAddress,
            userAgent,
            referrer,
            timestamp: new Date().toISOString(),
        });

        // TODO: Forward to n8n webhook or save to Strapi
        // Example n8n integration:
        // const n8nWebhookUrl = process.env.N8N_READINESS_WEBHOOK_URL;
        // if (n8nWebhookUrl) {
        //     await fetch(n8nWebhookUrl, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ ...body, ipAddress, userAgent, referrer }),
        //     });
        // }

        return NextResponse.json({
            success: true,
            message: 'Submission received. Your roadmap will be sent shortly.',
        }, { status: 200 });

    } catch (error) {
        console.error('Readiness submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
