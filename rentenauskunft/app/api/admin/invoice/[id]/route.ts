import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Session prüfen
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    // Await params in Next.js 15
    const resolvedParams = await params;
    const anfrageId = parseInt(resolvedParams.id);
    
    // Hole Anfrage mit Rechnungs-Info
    const anfrage = db.prepare(`
      SELECT invoice_path, invoice_filename, invoice_number, vorname, familienname
      FROM anfragen 
      WHERE id = ?
    `).get(anfrageId) as any;

    if (!anfrage) {
      return NextResponse.json(
        { success: false, error: 'Anfrage nicht gefunden' },
        { status: 404 }
      );
    }

    if (!anfrage.invoice_path || !anfrage.invoice_filename) {
      return NextResponse.json(
        { success: false, error: 'Keine Rechnung vorhanden' },
        { status: 404 }
      );
    }

    // Prüfe ob Datei existiert
    if (!fs.existsSync(anfrage.invoice_path)) {
      return NextResponse.json(
        { success: false, error: 'Rechnung nicht gefunden' },
        { status: 404 }
      );
    }

    // Prüfe ob PDF oder HTML
    const isPdf = anfrage.invoice_path.endsWith('.pdf');
    
    if (isPdf) {
      // Lese PDF-Datei
      const pdfBuffer = fs.readFileSync(anfrage.invoice_path);
      
      // Erstelle sprechenden Dateinamen: Rechnung-Nr-20251187.pdf
      const downloadFilename = `Rechnung-Nr-${anfrage.invoice_number}.pdf`;
      
      // Sende PDF als Download
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${downloadFilename}"`,
          'Content-Length': pdfBuffer.length.toString(),
        },
      });
    } else {
      // Fallback: HTML
      const htmlContent = fs.readFileSync(anfrage.invoice_path, 'utf-8');
      const downloadFilename = `Rechnung-Nr-${anfrage.invoice_number}.html`;
      
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': `inline; filename="${downloadFilename}"`,
        },
      });
    }

  } catch (error) {
    console.error('❌ Fehler beim Laden der Rechnung:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}
