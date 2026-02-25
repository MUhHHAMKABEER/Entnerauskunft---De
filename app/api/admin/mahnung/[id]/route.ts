import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const mahnungId = parseInt(resolvedParams.id);

    const mahnung = db.prepare(`
      SELECT * FROM mahnungen WHERE id = ?
    `).get(mahnungId) as any;

    if (!mahnung || !mahnung.mahnung_path) {
      return NextResponse.json(
        { success: false, error: 'Mahnung nicht gefunden' },
        { status: 404 }
      );
    }

    if (!fs.existsSync(mahnung.mahnung_path)) {
      return NextResponse.json(
        { success: false, error: 'Mahnungs-Datei nicht gefunden' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(mahnung.mahnung_path);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${mahnung.mahnung_filename}"`,
      },
    });

  } catch (error) {
    console.error('Fehler beim Laden der Mahnung:', error);
    return NextResponse.json(
      { success: false, error: 'Fehler beim Laden der Mahnung' },
      { status: 500 }
    );
  }
}
