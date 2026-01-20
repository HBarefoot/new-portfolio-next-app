import { NextRequest, NextResponse } from 'next/server';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.henrybarefoot.com/api';
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Get request metadata
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const referrer = request.headers.get('referer') || request.headers.get('referrer') || '';

        // Save to Strapi
        // This assumes the collection type is 'audit-submissions'
        const strapiResponse = await fetch(`${STRAPI_API_URL}/audit-submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Using Public role permissions for lead capture
            },
            body: JSON.stringify({
                data: {
                    name: body.name,
                    email: body.email,
                    websiteUrl: body.websiteUrl,
                    overallScore: body.overallScore,
                    auditData: body.auditData, // Full JSON report for n8n to process
                    submittedAt: new Date().toISOString(),
                    ipAddress,
                    userAgent,
                    referrer,
                },
            }),
        });

        if (!strapiResponse.ok) {
            const errorText = await strapiResponse.text();
            console.error('Strapi API error:', errorText);
            return NextResponse.json(
                { success: false, error: 'Failed to save submission' },
                { status: strapiResponse.status }
            );
        }

        const data = await strapiResponse.json();

        return NextResponse.json({
            success: true,
            submissionId: data.data.id,
            message: 'Audit lead submitted successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Audit lead submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
