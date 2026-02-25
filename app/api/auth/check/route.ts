import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json({
        isLoggedIn: false
      });
    }

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        username: session.username
      }
    });
  } catch (error) {
    console.error('❌ Session-Check-Fehler:', error);
    return NextResponse.json({
      isLoggedIn: false
    });
  }
}
