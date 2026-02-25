const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('=== PRÜFUNG: KÜRZLICH VERSENDETE MAHNUNGEN ===\n');

const recentSends = db.prepare(`
  SELECT m.mahnung_number, m.mahnung_stufe, m.versendet, m.versendet_am,
         a.vorname, a.familienname, a.email, a.invoice_number
  FROM mahnungen m
  JOIN anfragen a ON m.anfrage_id = a.id
  WHERE m.versendet = 1 AND m.versendet_am > datetime('now', '-1 hour')
  ORDER BY m.versendet_am DESC
`).all();

if (recentSends.length === 0) {
  console.log('KEINE Mahnungen in der letzten Stunde versendet!');
} else {
  console.log('ACHTUNG: Folgende Mahnungen wurden in der letzten Stunde versendet:');
  recentSends.forEach(m => {
    console.log(`  ${m.mahnung_number} | ${m.vorname} ${m.familienname} (${m.email})`);
    console.log(`  Versendet am: ${m.versendet_am}`);
  });
}

console.log('\nAlle Mahnungen von info@rentnerauskunft.de:');
const testKunde = db.prepare(`
  SELECT m.mahnung_number, m.mahnung_stufe, m.versendet, m.versendet_am, m.erstellt_am
  FROM mahnungen m
  JOIN anfragen a ON m.anfrage_id = a.id
  WHERE a.email = ?
  ORDER BY m.mahnung_stufe
`).all('info@rentnerauskunft.de');

testKunde.forEach(m => {
  const stufe = m.mahnung_stufe === 1 ? 'Zahlungserinnerung' : m.mahnung_stufe === 2 ? '1. Mahnung' : 'Letzte Mahnung';
  console.log(`  ${stufe}: Erstellt ${m.erstellt_am} | Versendet: ${m.versendet ? m.versendet_am : 'NEIN'}`);
});

db.close();
