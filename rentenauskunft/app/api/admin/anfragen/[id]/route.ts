import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

// GET: Einzelne Anfrage abrufen
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const anfrage = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(id);

    if (!anfrage) {
      return NextResponse.json(
        { success: false, error: 'Anfrage nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: anfrage
    });

  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Anfrage:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}

// PATCH: Anfrage aktualisieren (Status, Notizen)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const data = await request.json();

    // Update-Query bauen
    const updates: string[] = [];
    const values: any[] = [];

    if (data.status) {
      updates.push('status = ?');
      values.push(data.status);
    }

    if (data.notizen !== undefined) {
      updates.push('notizen = ?');
      values.push(data.notizen);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Keine Änderungen angegeben' },
        { status: 400 }
      );
    }

    updates.push('aktualisiert_am = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `UPDATE anfragen SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(query).run(...values);

    return NextResponse.json({
      success: true,
      message: 'Anfrage aktualisiert'
    });

  } catch (error) {
    console.error('❌ Fehler beim Aktualisieren der Anfrage:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}

// DELETE: Anfrage löschen
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { id } = await params;
    db.prepare('DELETE FROM anfragen WHERE id = ?').run(id);

    return NextResponse.json({
      success: true,
      message: 'Anfrage gelöscht'
    });

  } catch (error) {
    console.error('❌ Fehler beim Löschen der Anfrage:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}
