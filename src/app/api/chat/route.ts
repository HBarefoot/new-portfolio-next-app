import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to your n8n webhook
    const n8nResponse = await fetch('https://n8n.henrybarefoot.com/webhook/bbc7802e-32f2-4aa5-b7e9-e13cda48c638/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!n8nResponse.ok) {
      console.log('N8N webhook response status:', n8nResponse.status);
      return NextResponse.json(
        { 
          response: "Thanks for your message! I've received it and Henry will get back to you soon.",
          success: false,
          status: n8nResponse.status
        }, 
        { status: 200 }
      );
    }

    const data = await n8nResponse.json();
    
    return NextResponse.json({
      response: data.response || data.message || data.text || "Thanks for your message! Henry will get back to you soon.",
      success: true
    });

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        response: "Thanks for your message! I've received it and Henry will get back to you soon.",
        success: false,
        error: 'Internal server error'
      }, 
      { status: 200 }
    );
  }
}
