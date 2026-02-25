import { NextRequest, NextResponse } from 'next/server';
import { manualSendReminder } from '@/lib/reminder-system';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mahnungId = body.mahnungId;

    if (!mahnungId) {
      return NextResponse.json(
        { success: false, error: 'Mahnungs-ID fehlt' },
        { status: 400 }
      );
    }

    await manualSendReminder(mahnungId);

    return NextResponse.json({
      success: true,
      message: 'Mahnung erfolgreich versendet'
    });

  } catch (error) {
    console.error('Fehler beim Versenden der Mahnung:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Fehler beim Versenden' },
      { status: 500 }
    );
  }
}
