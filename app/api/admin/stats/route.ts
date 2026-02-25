import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    // Gesamtanzahl Anfragen
    const { total } = db.prepare('SELECT COUNT(*) as total FROM anfragen').get() as { total: number };

    // Anfragen heute
    const { heute } = db.prepare(`
      SELECT COUNT(*) as heute FROM anfragen 
      WHERE DATE(erstellt_am) = DATE('now')
    `).get() as { heute: number };

    // Anfragen nach Status
    const statusStats = db.prepare(`
      SELECT status, COUNT(*) as count 
      FROM anfragen 
      GROUP BY status
    `).all() as Array<{ status: string; count: number }>;

    // Anfragen letzte 7 Tage
    const letzteWoche = db.prepare(`
      SELECT DATE(erstellt_am) as datum, COUNT(*) as count 
      FROM anfragen 
      WHERE erstellt_am >= DATE('now', '-7 days')
      GROUP BY DATE(erstellt_am)
      ORDER BY datum DESC
    `).all() as Array<{ datum: string; count: number }>;

    // Neueste Anfragen
    const neueste = db.prepare(`
      SELECT id, vorname, familienname, email, status, erstellt_am 
      FROM anfragen 
      ORDER BY erstellt_am DESC 
      LIMIT 5
    `).all();

    return NextResponse.json({
      success: true,
      data: {
        total,
        heute,
        statusStats,
        letzteWoche,
        neueste
      }
    });

  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Statistiken:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}
