import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getAnalyticsStats, getLiveSessions } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') as 'heute' | '7tage' | '30tage' | 'alle' || 'heute';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Statistiken abrufen
    const stats = getAnalyticsStats(timeframe);
    
    // Live Sessions
    const liveSessions = getLiveSessions(limit);

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        liveSessions
      }
    });

  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}
