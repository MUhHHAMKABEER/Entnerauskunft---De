const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Erstelle neuen Test-Kunden ===\n');

// Lösche alten Test-Kunden
console.log('1. Lösche alten Test-Kunden...');
const old = db.prepare('SELECT id FROM anfragen WHERE invoice_number = ?').get('20251999');
if (old) {
  db.prepare('DELETE FROM mahnungen WHERE anfrage_id = ?').run(old.id);
  db.prepare('DELETE FROM anfragen WHERE id = ?').run(old.id);
  console.log('   ✅ Alter Test-Kunde gelöscht');
} else {
  console.log('   ℹ️  Kein alter Test-Kunde gefunden');
}

// Erstelle neuen Test-Kunden mit -22 Tagen
console.log('\n2. Erstelle neuen Test-Kunden...');
const date22DaysAgo = new Date();
date22DaysAgo.setDate(date22DaysAgo.getDate() - 22);
const dateString = date22DaysAgo.toISOString();

const stmt = db.prepare(`
  INSERT INTO anfragen (
    invoice_number, customer_number, order_number,
    email, anrede, vorname, familienname,
    strasse, hausnummer, plz, ort, land,
    versicherungsnummer, rentenversicherungstraeger,
    antragstyp, antragstyp_label,
    status, payment_status,
    ip_adresse, user_agent, geraet, browser, betriebssystem,
    erstellt_am, aktualisiert_am,
    invoice_path, invoice_filename
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    'neu', 'unbezahlt',
    '127.0.0.1', 'Test User Agent', 'Desktop', 'Chrome', 'Windows',
    ?, ?, '/data/invoices/test.pdf', 'Rechnung_Test.pdf'
  )
`);

const result = stmt.run(
  '20251999', '99999', 'ORD-TEST-999999-ABCDEF',
  'test.kunde@example.com', 'Herr', 'Max', 'Mustermann',
  'Teststraße', '123', '12345', 'Teststadt', 'Deutschland',
  '12345678901', 'Deutsche Rentenversicherung Bund',
  'rentenauskunft', 'Rentenauskunft',
  dateString, dateString
);

console.log('   ✅ Neuer Test-Kunde erstellt!');
console.log('\n📋 Details:');
console.log(`   ID: ${result.lastInsertRowid}`);
console.log(`   Name: Max Mustermann`);
console.log(`   Rechnungsnummer: 20251999`);
console.log(`   E-Mail: test.kunde@example.com`);
console.log(`   Erstellt am: ${date22DaysAgo.toLocaleDateString('de-DE')}`);
console.log(`   Tage überfällig: 22 Tage`);
console.log(`   Zahlungsstatus: unbezahlt (per default)`);

console.log('\n🔗 Direkter Link:');
console.log(`   http://localhost:3000/admin/anfragen/${result.lastInsertRowid}`);

console.log('\n✨ Was passiert automatisch:');
console.log('   1. Beim Öffnen der Seite werden Mahnungen automatisch erstellt');
console.log('   2. Bei Rechnungsinformationen: Download-Buttons für alle Mahnungen');
console.log('   3. Bei Zahlungsstatus: Versand-Buttons für alle Mahnungen');
console.log('   4. Keine manuellen Buttons mehr nötig!');

console.log('\n=================================\n');
db.close();
