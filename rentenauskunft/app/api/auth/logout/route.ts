import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.json({
      success: true,
      message: 'Logout erfolgreich'
    });
  } catch (error) {
    console.error('❌ Logout-Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler beim Logout' },
      { status: 500 }
    );
  }
}
