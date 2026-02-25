import { NextResponse } from 'next/server';
import { verifyEmailConfig } from '@/lib/email';

export async function GET() {
  try {
    const isConnected = await verifyEmailConfig();
    
    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'E-Mail-Server erfolgreich verbunden'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'E-Mail-Server Verbindung fehlgeschlagen'
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Fehler bei E-Mail-Verifizierung',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
