import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    // Query-Parameter
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // SQL-Query bauen
    let query = 'SELECT * FROM anfragen WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'alle') {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY erstellt_am DESC';

    // Alle Anfragen abrufen
    const anfragen = db.prepare(query).all(...params) as any[];

    // CSV generieren
    const headers = [
      'ID', 'Rechnungsnr.', 'Kundennr.', 'Bestellnr.',
      'E-Mail', 'Anrede', 'Vorname', 'Familienname', 'Geburtsname',
      'Geburtsdatum', 'Geburtsort',
      'Straße', 'Hausnr.', 'PLZ', 'Ort', 'Land',
      'Versicherungsnr.', 'Rentenversicherungsträger',
      'Staatsangehörigkeit', 'Familienstand', 'Kinder', 'Telefon',
      'Antragstyp', 'Gewünschter Rentenbeginn',
      'Status', 'Notizen', 'IP-Adresse', 'Erstellt am'
    ];

    const csvRows = [headers.join(';')];

    anfragen.forEach(a => {
      const row = [
        a.id,
        a.invoice_number || '',
        a.customer_number || '',
        a.order_number || '',
        a.email || '',
        a.anrede || '',
        a.vorname || '',
        a.familienname || '',
        a.geburtsname || '',
        a.geburtsdatum || '',
        a.geburtsort || '',
        a.strasse || '',
        a.hausnummer || '',
        a.plz || '',
        a.ort || '',
        a.land || '',
        a.versicherungsnummer || '',
        a.rentenversicherungstraeger || '',
        a.staatsangehoerigkeit || '',
        a.familienstand || '',
        a.kinder_anzahl || '',
        a.telefon || '',
        a.antragstyp || '',
        a.gewuenschter_rentenbeginn || '',
        a.status || '',
        (a.notizen || '').replace(/;/g, ',').replace(/\n/g, ' '),
        a.ip_adresse || '',
        a.erstellt_am || ''
      ];
      csvRows.push(row.map(v => `"${v}"`).join(';'));
    });

    const csv = csvRows.join('\n');

    // CSV als Download zurückgeben
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="anfragen_export_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('❌ Fehler beim Export:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler beim Export' },
      { status: 500 }
    );
  }
}
