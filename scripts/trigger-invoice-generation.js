const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');

const kundeId = process.argv[2] || 23;

console.log('\n=== Generiere Rechnung für Kunde #' + kundeId + ' ===\n');

const kunde = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(kundeId);
if (!kunde) {
  console.log('❌ Kunde nicht gefunden!');
  process.exit(1);
}

console.log(`Kunde: ${kunde.vorname} ${kunde.familienname}`);
console.log(`Rechnungsnummer: ${kunde.invoice_number}\n`);

console.log('💡 Die Rechnung wird automatisch generiert, wenn:');
console.log('   1. Du die Seite öffnest: http://localhost:3000/admin/anfragen/' + kundeId);
console.log('   2. Auf "Rechnung herunterladen" klickst');
console.log('\nDie Rechnung wird dann im professionellen Design erstellt mit:');
console.log('   - 25,13 EUR (Netto)');
console.log('   - 4,77 EUR (19% MwSt.)');
console.log('   - 29,90 EUR (Brutto)\n');

// Erstelle Dummy-Rechnung für sofortigen Download
const invoicesDir = path.join(process.cwd(), 'data', 'invoices');
if (!fs.existsSync(invoicesDir)) {
  fs.mkdirSync(invoicesDir, { recursive: true });
}

const filename = `Rechnung_${kunde.invoice_number}.pdf`;
const filepath = path.join(invoicesDir, filename);

// Minimales PDF als Platzhalter
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
/Length 200
>>
stream
BT
/F1 24 Tf
50 750 Td
(RECHNUNG) Tj
0 -40 Td
/F1 14 Tf
(Rechnungsnummer: ${kunde.invoice_number}) Tj
0 -30 Td
(Kunde: ${kunde.vorname} ${kunde.familienname}) Tj
0 -30 Td
(Kundennummer: ${kunde.customer_number}) Tj
0 -50 Td
/F1 18 Tf
(Gesamtbetrag: 29,90 EUR) Tj
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
601
%%EOF`;

fs.writeFileSync(filepath, pdfContent);

db.prepare('UPDATE anfragen SET invoice_path = ?, invoice_filename = ? WHERE id = ?').run(
  filepath,
  filename,
  kundeId
);

console.log('✅ Platzhalter-Rechnung erstellt');
console.log('   Pfad: ' + filepath);
console.log('\n🔗 Öffne jetzt: http://localhost:3000/admin/anfragen/' + kundeId);
console.log('   Die Seite lädt automatisch die 1. Mahnung!\n');

db.close();
