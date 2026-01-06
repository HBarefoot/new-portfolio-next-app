import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Chat API: Received request', body);
    
    // Get the webhook secret from environment variables
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('Chat API: N8N_WEBHOOK_SECRET is not configured');
      throw new Error('Webhook authentication is not configured');
    }
    
    // Forward the request to n8n webhook with authentication
    const response = await fetch('https://n8n.srv1197436.hstgr.cloud/webhook/customer-service-rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${webhookSecret}`,
        'X-Webhook-Secret': webhookSecret,
      },
      body: JSON.stringify(body),
    });

    console.log('Chat API: n8n response status', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chat API: n8n error', errorText);
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chat API: n8n response data', data);
    
    // Return the response with CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Webhook-Secret',
      },
    }
  );
}
