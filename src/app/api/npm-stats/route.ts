import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://api.npmjs.org/downloads/point/last-month/@hbarefoot/engram',
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from npm' },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      monthlyDownloads: data.downloads || 0,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch npm stats' },
      { status: 500 }
    );
  }
}
