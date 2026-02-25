import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    // Session prüfen
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
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // SQL-Query bauen
    let query = 'SELECT * FROM anfragen WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'alle') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (email LIKE ? OR vorname LIKE ? OR familienname LIKE ? OR versicherungsnummer LIKE ? OR invoice_number LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY erstellt_am DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Anfragen abrufen
    const anfragen = db.prepare(query).all(...params);

    // Gesamtanzahl für Pagination
    let countQuery = 'SELECT COUNT(*) as total FROM anfragen WHERE 1=1';
    const countParams: any[] = [];

    if (status && status !== 'alle') {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    if (search) {
      countQuery += ' AND (email LIKE ? OR vorname LIKE ? OR familienname LIKE ? OR versicherungsnummer LIKE ? OR invoice_number LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const { total } = db.prepare(countQuery).get(...countParams) as { total: number };

    return NextResponse.json({
      success: true,
      data: anfragen,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Anfragen:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}
