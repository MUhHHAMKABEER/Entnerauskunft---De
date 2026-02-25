import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const anfrageId = parseInt(resolvedParams.id);

    const mahnungen = db.prepare(`
      SELECT * FROM mahnungen 
      WHERE anfrage_id = ? 
      ORDER BY mahnung_stufe DESC, erstellt_am DESC
    `).all(anfrageId);

    return NextResponse.json({
      success: true,
      mahnungen
    });

  } catch (error) {
    console.error('Fehler beim Laden der Mahnungen:', error);
    return NextResponse.json(
      { success: false, error: 'Fehler beim Laden der Mahnungen' },
      { status: 500 }
    );
  }
}
