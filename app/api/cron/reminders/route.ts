import { NextRequest, NextResponse } from 'next/server';
import { processOverdueInvoices } from '@/lib/reminder-system';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key-here';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔄 Starte automatisches Mahnsystem...');
    const results = await processOverdueInvoices();

    return NextResponse.json({
      success: true,
      message: 'Mahnsystem erfolgreich ausgeführt',
      results
    });

  } catch (error) {
    console.error('❌ Fehler im Cron-Job:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unbekannter Fehler' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
