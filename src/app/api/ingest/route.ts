import { NextResponse } from 'next/server';
import { runOpportunityIngestion } from '@/lib/ingestion';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await runOpportunityIngestion({
      city: body.city,
      state: body.state,
      category: body.category,
      forceRefresh: body.forceRefresh
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Ingestion execution error',
      log: {
        id: `err-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sourceName: 'Ingestion Engine',
        status: 'ERROR',
        itemsDiscovered: 0,
        itemsVerified: 0,
        itemsRejected: 0,
        message: error.message
      }
    }, { status: 500 });
  }
}
