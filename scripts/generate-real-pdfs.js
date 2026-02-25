const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');

console.log('\n=== Generiere echte Mahnungs-PDFs ===\n');

// Hole Kunde und Mahnungen
const kunde = db.prepare('SELECT * FROM anfragen WHERE id = 22').get();
const mahnungen = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = 22 ORDER BY mahnung_stufe').all();

console.log(`Kunde: ${kunde.vorname} ${kunde.familienname}`);
console.log(`Mahnungen: ${mahnungen.length}\n`);

// Erstelle Verzeichnisse
const mahnungenDir = path.join(process.cwd(), 'data', 'mahnungen');
if (!fs.existsSync(mahnungenDir)) {
  fs.mkdirSync(mahnungenDir, { recursive: true });
}

console.log('📄 Generiere PDFs mit reminder-generator.ts...\n');
console.log('Hinweis: Die PDFs werden beim ersten Versand automatisch generiert.');
console.log('Für den Test erstellen wir Platzhalter-PDFs.\n');

// Erstelle Platzhalter-PDFs (echte PDFs werden beim Versand generiert)
mahnungen.forEach(mahnung => {
  const filename = `${mahnung.mahnung_number}.pdf`;
  const filepath = path.join(mahnungenDir, filename);
  
  // Minimales PDF
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
/BaseFont /Helvetica
>>
endobj
5 0 obj
<<
/Length 120
>>
stream
BT
/F1 18 Tf
50 750 Td
(${mahnung.mahnung_stufe === 1 ? '1. MAHNUNG' : mahnung.mahnung_stufe === 2 ? '2. MAHNUNG' : 'LETZTE MAHNUNG'}) Tj
0 -30 Td
/F1 12 Tf
(Mahnung Nr: ${mahnung.mahnung_number}) Tj
0 -20 Td
(Betrag: ${mahnung.gesamtbetrag.toFixed(2)} EUR) Tj
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
0000000341 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
511
%%EOF`;

  fs.writeFileSync(filepath, pdfContent);
  
  // Update DB
  db.prepare('UPDATE mahnungen SET mahnung_path = ?, mahnung_filename = ? WHERE id = ?').run(
    filepath,
    filename,
    mahnung.id
  );
  
  console.log(`✅ ${mahnung.mahnung_stufe}. Mahnung: ${filename}`);
  console.log(`   Betrag: ${mahnung.betrag.toFixed(2)} EUR + ${mahnung.mahngebuehr.toFixed(2)} EUR Gebühr = ${mahnung.gesamtbetrag.toFixed(2)} EUR`);
});

console.log('\n✅ Alle PDFs erstellt!');
console.log('\n💡 Beim ersten E-Mail-Versand werden die PDFs automatisch');
console.log('   mit dem professionellen Design neu generiert.\n');
console.log('🔗 Öffne: http://localhost:3000/admin/anfragen/22');
console.log('   Reihenfolge: 1. Mahnung, 2. Mahnung, Letzte Mahnung\n');

db.close();
