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

    // Save to Strapi first - this will trigger webhook to n8n → HubSpot
    const strapiResponse = await fetch(`${STRAPI_API_URL}/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_KEY && { 'Authorization': `Bearer ${STRAPI_API_KEY}` }),
      },
      body: JSON.stringify({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone || '',
          company: body.company || '',
          message: body.message,
          source: 'Website',
          submittedAt: new Date().toISOString(),
          status: 'New',
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
        { status: 500 }
      );
    }

    const data = await strapiResponse.json();

    return NextResponse.json({ 
      success: true,
      submissionId: data.data.id,
      message: 'Form submitted successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
