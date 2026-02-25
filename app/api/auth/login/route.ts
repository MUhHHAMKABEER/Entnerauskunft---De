import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Benutzername und Passwort erforderlich' },
        { status: 400 }
      );
    }

    // Hole Admin aus Datenbank
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as {
      id: number;
      username: string;
      password_hash: string;
    } | undefined;

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }

    // Spezialfall: Erstes Login mit Placeholder-Hash
    if (admin.password_hash === '$2b$10$placeholder') {
      // Setze das richtige Passwort: fentropsohnistpilot123!
      if (password === 'fentropsohnistpilot123!') {
        const password = '123456789';
        const newHash = await bcrypt.hash(password, 10);
        db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
          .run(newHash, admin.id);
        
        // Session erstellen
        const session = await getSession();
        session.userId = admin.id;
        session.username = admin.username;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({
          success: true,
          message: 'Login erfolgreich',
          user: { username: admin.username }
        });
      } else {
        return NextResponse.json(
          { success: false, error: 'Ungültige Anmeldedaten' },
          { status: 401 }
        );
      }
    }

    // Normaler Login: Passwort prüfen
    const isValid = await bcrypt.compare(password, admin.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }

    // Session erstellen
    const session = await getSession();
    session.userId = admin.id;
    session.username = admin.username;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({
      success: true,
      message: 'Login erfolgreich',
      user: { username: admin.username }
    });

  } catch (error) {
    console.error('❌ Login-Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler beim Login' },
      { status: 500 }
    );
  }
}
