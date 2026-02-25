import { NextRequest, NextResponse } from 'next/server';
import { processOverdueInvoices } from '@/lib/reminder-system';
import { getSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    console.log('🔄 Manueller Start des Mahnsystems durch Admin...');
    const results = await processOverdueInvoices();

    return NextResponse.json({
      success: true,
      message: 'Mahnsystem erfolgreich ausgeführt',
      results
    });

  } catch (error) {
    console.error('❌ Fehler beim Verarbeiten der Mahnungen:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unbekannter Fehler' },
      { status: 500 }
    );
  }
}
