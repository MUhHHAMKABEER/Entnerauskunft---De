import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'analytics.db');

// Erstelle data Verzeichnis falls nicht vorhanden
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const analyticsDb = new Database(dbPath);

// Erstelle Analytics-Tabelle
analyticsDb.exec(`
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_adresse TEXT NOT NULL,
    land TEXT,
    stadt TEXT,
    geraet TEXT,
    browser TEXT,
    seite TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    zeitpunkt DATETIME DEFAULT CURRENT_TIMESTAMP,
    session_dauer INTEGER DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_zeitpunkt ON page_views(zeitpunkt);
  CREATE INDEX IF NOT EXISTS idx_ip ON page_views(ip_adresse);
  CREATE INDEX IF NOT EXISTS idx_seite ON page_views(seite);
`);

export default analyticsDb;

// Helper: Tracking-Eintrag erstellen
export function trackPageView(data: {
  ip: string;
  land?: string;
  stadt?: string;
  geraet?: string;
  browser?: string;
  seite: string;
  referrer?: string;
  userAgent?: string;
}) {
  const stmt = analyticsDb.prepare(`
    INSERT INTO page_views (
      ip_adresse, land, stadt, geraet, browser, seite, referrer, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return stmt.run(
    data.ip,
    data.land || null,
    data.stadt || null,
    data.geraet || null,
    data.browser || null,
    data.seite,
    data.referrer || null,
    data.userAgent || null
  );
}

// Helper: Statistiken abrufen
export function getAnalyticsStats(timeframe: 'heute' | '7tage' | '30tage' | 'alle') {
  let dateFilter = '';
  
  switch (timeframe) {
    case 'heute':
      dateFilter = "AND DATE(zeitpunkt) = DATE('now')";
      break;
    case '7tage':
      dateFilter = "AND zeitpunkt >= DATE('now', '-7 days')";
      break;
    case '30tage':
      dateFilter = "AND zeitpunkt >= DATE('now', '-30 days')";
      break;
    default:
      dateFilter = '';
  }

  // Gesamtanzahl
  const { total } = analyticsDb.prepare(`
    SELECT COUNT(*) as total FROM page_views WHERE 1=1 ${dateFilter}
  `).get() as { total: number };

  // Top Seiten
  const topSeiten = analyticsDb.prepare(`
    SELECT seite, COUNT(*) as count 
    FROM page_views 
    WHERE 1=1 ${dateFilter}
    GROUP BY seite 
    ORDER BY count DESC 
    LIMIT 10
  `).all() as Array<{ seite: string; count: number }>;

  // Top Länder
  const topLaender = analyticsDb.prepare(`
    SELECT land, COUNT(*) as count 
    FROM page_views 
    WHERE land IS NOT NULL ${dateFilter}
    GROUP BY land 
    ORDER BY count DESC 
    LIMIT 10
  `).all() as Array<{ land: string; count: number }>;

  // Geräte
  const geraete = analyticsDb.prepare(`
    SELECT geraet, COUNT(*) as count 
    FROM page_views 
    WHERE geraet IS NOT NULL ${dateFilter}
    GROUP BY geraet 
    ORDER BY count DESC
  `).all() as Array<{ geraet: string; count: number }>;

  return {
    total,
    topSeiten,
    topLaender,
    geraete
  };
}

// Helper: Live Sessions abrufen
export function getLiveSessions(limit: number = 100) {
  return analyticsDb.prepare(`
    SELECT * FROM page_views 
    ORDER BY zeitpunkt DESC 
    LIMIT ?
  `).all(limit);
}
