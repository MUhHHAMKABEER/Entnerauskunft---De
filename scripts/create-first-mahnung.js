const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');

const kundeId = 23;

console.log('\n=== Erstelle 1. Mahnung für Kunde #' + kundeId + ' ===\n');

const kunde = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(kundeId);
if (!kunde) {
  console.log('❌ Kunde nicht gefunden!');
  process.exit(1);
}

console.log(`Kunde: ${kunde.vorname} ${kunde.familienname}`);
console.log(`Tage überfällig: 8 (nur 1. Mahnung fällig)\n`);

// Lösche alte Mahnungen
db.prepare('DELETE FROM mahnungen WHERE anfrage_id = ?').run(kundeId);

// Erstelle nur 1. Mahnung (da nur 8 Tage überfällig)
const mahnungNumber = `M-${Date.now()}1`;
const betrag = 29.90;
const gebuehr = 5.00;
const gesamt = betrag + gebuehr;

const mahnungenDir = path.join(process.cwd(), 'data', 'mahnungen');
if (!fs.existsSync(mahnungenDir)) {
  fs.mkdirSync(mahnungenDir, { recursive: true });
}

const filename = `${mahnungNumber}.pdf`;
const filepath = path.join(mahnungenDir, filename);

// Platzhalter-PDF
const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
/Length 250
>>
stream
BT
/F1 20 Tf
50 750 Td
(1. MAHNUNG) Tj
0 -40 Td
/F1 12 Tf
(Mahnung Nr: ${mahnungNumber}) Tj
0 -25 Td
(Rechnung Nr: ${kunde.invoice_number}) Tj
0 -25 Td
(Kunde: ${kunde.vorname} ${kunde.familienname}) Tj
0 -40 Td
(Offener Rechnungsbetrag: ${betrag.toFixed(2)} EUR) Tj
0 -20 Td
(Mahngebuehr (1. Mahnung): ${gebuehr.toFixed(2)} EUR) Tj
0 -20 Td
/F1 14 Tf
(Gesamtbetrag: ${gesamt.toFixed(2)} EUR) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000262 00000 n
0000000351 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
651
%%EOF`;

fs.writeFileSync(filepath, pdfContent);

db.prepare(`
  INSERT INTO mahnungen (
    anfrage_id, mahnung_number, mahnung_stufe,
    betrag, mahngebuehr, gesamtbetrag,
    mahnung_path, mahnung_filename,
    versendet, erstellt_am
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
`).run(
  kundeId,
  mahnungNumber,
  1,
  betrag,
  gebuehr,
  gesamt,
  filepath,
  filename
);

console.log('✅ 1. Mahnung erstellt!');
console.log(`   Nummer: ${mahnungNumber}`);
console.log(`   Betrag: ${betrag.toFixed(2)} EUR`);
console.log(`   Mahngebühr: ${gebuehr.toFixed(2)} EUR`);
console.log(`   Gesamt: ${gesamt.toFixed(2)} EUR`);

// Berechne nächste Mahnung
const erstelltAm = new Date(kunde.erstellt_am);
const naechsteMahnung = new Date(erstelltAm);
naechsteMahnung.setDate(naechsteMahnung.getDate() + 14);

console.log(`\n📅 Nächste Mahnung:`);
console.log(`   2. Mahnung am ${naechsteMahnung.toLocaleString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})}`);

console.log(`\n💡 Was du jetzt sehen solltest:`);
console.log(`   - Rechnung überfällig seit 8 Tagen`);
console.log(`   - NUR "1. Mahnung per Email" Button`);
console.log(`   - NUR "1. Mahnung herunterladen" Button`);
console.log(`   - "Nächste Mahnung am ${naechsteMahnung.toLocaleString('de-DE')} (2. Mahnung)"`);

console.log(`\n🔗 Öffne: http://localhost:3000/admin/anfragen/${kundeId}`);
console.log(`   Drücke F5 um die Seite neu zu laden!\n`);

db.close();
