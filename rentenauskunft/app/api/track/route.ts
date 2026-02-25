import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@/lib/analytics';

// Geo-IP Lookup mit ipwho.org (FREE, kein API-Key, kommerziell erlaubt)
async function getGeoData(ip: string) {
  try {
    const url = `https://ipwho.is/${ip}`;
    const res = await fetch(url, { 
      signal: AbortSignal.timeout(3000) // 3 Sekunden Timeout
    });
    const data = await res.json();
    
    if (data.success) {
      return {
        land: data.country_code || 'Unknown',
        stadt: data.city || 'Unknown',
        region: data.region || '',
        timezone: data.timezone?.id || ''
      };
    }
  } catch (err) {
    console.error('Geo-Lookup Fehler:', err);
  }
  
  return { land: 'Unknown', stadt: 'Unknown', region: '', timezone: '' };
}

// User-Agent Parser (detailliert)
function parseUserAgent(ua: string) {
  // Browser-Erkennung
  let browser = 'Unknown';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Opera/') || ua.includes('OPR/')) browser = 'Opera';
  
  // Geräte-Erkennung
  let geraet = 'Desktop';
  if (/Mobile|Android/i.test(ua)) geraet = 'Mobile';
  else if (/iPad|Tablet/i.test(ua)) geraet = 'Tablet';
  
  // OS-Erkennung
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  return { browser, geraet, os };
}

export async function POST(request: NextRequest) {
  try {
    const { seite, referrer } = await request.json();

    // IP-Adresse erfassen
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // User-Agent parsen
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const { browser, geraet, os } = parseUserAgent(userAgent);
    
    // Geo-IP Lookup (async, aber wir warten drauf)
    const geo = await getGeoData(ip);

    // Tracking-Daten speichern
    trackPageView({
      ip,
      land: geo.land,
      stadt: geo.stadt,
      geraet,
      browser,
      seite,
      referrer,
      userAgent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Tracking-Fehler:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
