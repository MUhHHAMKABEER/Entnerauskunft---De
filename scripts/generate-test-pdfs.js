const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');

console.log('\n=== Generiere Test-PDFs ===\n');

// Erstelle Verzeichnisse
const invoicesDir = path.join(process.cwd(), 'data', 'invoices');
const mahnungenDir = path.join(process.cwd(), 'data', 'mahnungen');

if (!fs.existsSync(invoicesDir)) {
  fs.mkdirSync(invoicesDir, { recursive: true });
  console.log('✅ Verzeichnis erstellt:', invoicesDir);
}

if (!fs.existsSync(mahnungenDir)) {
  fs.mkdirSync(mahnungenDir, { recursive: true });
  console.log('✅ Verzeichnis erstellt:', mahnungenDir);
}

// Erstelle Dummy-PDF für Rechnung
const invoicePath = path.join(invoicesDir, 'Rechnung_20251999.pdf');
const dummyPdfContent = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources <<\n/Font <<\n/F1 4 0 R\n>>\n>>\n/MediaBox [0 0 612 792]\n/Contents 5 0 R\n>>\nendobj\n4 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n5 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Test Rechnung) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000262 00000 n\n0000000341 00000 n\ntrailer\n<<\n/Size 6\n/Root 1 0 R\n>>\nstartxref\n435\n%%EOF';

fs.writeFileSync(invoicePath, dummyPdfContent);
console.log('✅ Test-Rechnung erstellt:', invoicePath);

// Update Rechnung in DB
db.prepare('UPDATE anfragen SET invoice_path = ?, invoice_filename = ? WHERE id = 22').run(
  invoicePath,
  'Rechnung_20251999.pdf'
);
console.log('✅ Rechnung in DB aktualisiert');

// Erstelle Dummy-PDFs für Mahnungen
const mahnungen = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = 22').all();
console.log(`\n📄 Erstelle ${mahnungen.length} Mahnungs-PDFs...`);

mahnungen.forEach(mahnung => {
  const mahnungPath = path.join(mahnungenDir, `${mahnung.mahnung_number}.pdf`);
  const mahnungPdfContent = `%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/Resources <<\n/Font <<\n/F1 4 0 R\n>>\n>>\n/MediaBox [0 0 612 792]\n/Contents 5 0 R\n>>\nendobj\n4 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n5 0 obj\n<<\n/Length 60\n>>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(${mahnung.mahnung_stufe}. Mahnung - Test) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000262 00000 n\n0000000341 00000 n\ntrailer\n<<\n/Size 6\n/Root 1 0 R\n>>\nstartxref\n451\n%%EOF`;
  
  fs.writeFileSync(mahnungPath, mahnungPdfContent);
  
  db.prepare('UPDATE mahnungen SET mahnung_path = ?, mahnung_filename = ? WHERE id = ?').run(
    mahnungPath,
    `${mahnung.mahnung_number}.pdf`,
    mahnung.id
  );
  
  console.log(`  ✅ ${mahnung.mahnung_stufe}. Mahnung: ${mahnung.mahnung_number}.pdf`);
});

console.log('\n✅ Alle PDFs erstellt und in DB aktualisiert!');
console.log('\n🔗 Öffne: http://localhost:3000/admin/anfragen/22');
console.log('   Jetzt sollten alle Download-Buttons funktionieren!\n');

db.close();
