const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('=== VERIFIZIERUNG DER MAHNUNGEN ===\n');

const stats = db.prepare(`
  SELECT 
    mahnung_stufe,
    COUNT(*) as anzahl,
    SUM(CASE WHEN versendet = 1 THEN 1 ELSE 0 END) as versendet,
    SUM(CASE WHEN versendet = 0 THEN 1 ELSE 0 END) as nicht_versendet
  FROM mahnungen
  GROUP BY mahnung_stufe
  ORDER BY mahnung_stufe
`).all();

console.log('Mahnungen nach Stufe:');
stats.forEach(s => {
  const stufe = s.mahnung_stufe === 1 ? 'Zahlungserinnerung' : s.mahnung_stufe === 2 ? '1. Mahnung' : 'Letzte Mahnung';
  console.log(`  ${stufe}: ${s.anzahl} gesamt (${s.versendet} versendet, ${s.nicht_versendet} nicht versendet)`);
});

console.log('\nBeispiel-Mahnungen (letzte 5):');
const beispiele = db.prepare(`
  SELECT m.mahnung_number, m.mahnung_stufe, m.gesamtbetrag, m.versendet, 
         m.erstellt_am, a.invoice_number, a.vorname, a.familienname
  FROM mahnungen m
  JOIN anfragen a ON m.anfrage_id = a.id
  ORDER BY m.id DESC
  LIMIT 5
`).all();

beispiele.forEach(m => {
  const stufe = m.mahnung_stufe === 1 ? 'Zahlungserinnerung' : m.mahnung_stufe === 2 ? '1. Mahnung' : 'Letzte Mahnung';
  const versendet = m.versendet ? 'JA' : 'NEIN';
  console.log(`  ${m.mahnung_number} | ${stufe} | ${m.gesamtbetrag.toFixed(2)} EUR | Versendet: ${versendet}`);
  console.log(`    Kunde: ${m.vorname} ${m.familienname} (${m.invoice_number})`);
  console.log(`    Erstellt: ${new Date(m.erstellt_am).toLocaleDateString('de-DE')}`);
});

console.log('\nWICHTIG:');
console.log('- Alle nicht versendeten Mahnungen koennen ueber Admin-Buttons manuell versendet werden');
console.log('- Keine automatische Versendung aktiv');
console.log('- PDFs werden beim ersten Oeffnen der Detailseite generiert');

db.close();
