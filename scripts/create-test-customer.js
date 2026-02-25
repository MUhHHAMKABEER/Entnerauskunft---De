const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('🧪 Erstelle Test-Kunden mit 22 Tage alter Rechnung...\n');

const invoiceNumber = '20251999';
const customerNumber = '99999';
const orderNumber = 'ORD-TEST-999999-ABCDEF';

const date22DaysAgo = new Date();
date22DaysAgo.setDate(date22DaysAgo.getDate() - 22);
const dateString = date22DaysAgo.toISOString();

const existing = db.prepare('SELECT id FROM anfragen WHERE invoice_number = ?').get(invoiceNumber);

if (existing) {
  console.log('⚠️  Test-Kunde existiert bereits. Lösche alten Eintrag...');
  db.prepare('DELETE FROM mahnungen WHERE anfrage_id = ?').run(existing.id);
  db.prepare('DELETE FROM anfragen WHERE id = ?').run(existing.id);
}

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
    ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?,
    ?, ?,
    'neu', 'unbezahlt',
    '127.0.0.1', 'Test User Agent', 'Desktop', 'Chrome', 'Windows',
    ?, ?,
    '/data/invoices/test.pdf', 'Rechnung_Test.pdf'
  )
`);

const result = stmt.run(
  invoiceNumber, customerNumber, orderNumber,
  'test.kunde@example.com', 'Herr', 'Max', 'Mustermann',
  'Teststraße', '123', '12345', 'Teststadt', 'Deutschland',
  '12345678901', 'Deutsche Rentenversicherung Bund',
  'rentenauskunft', 'Rentenauskunft',
  dateString, dateString
);

db.close();

console.log('✅ Test-Kunde erfolgreich erstellt!\n');
console.log('📋 Details:');
console.log(`   ID: ${result.lastInsertRowid}`);
console.log(`   Rechnungsnummer: ${invoiceNumber}`);
console.log(`   Kundennummer: ${customerNumber}`);
console.log(`   Name: Max Mustermann`);
console.log(`   E-Mail: test.kunde@example.com`);
console.log(`   Rechnungsdatum: ${date22DaysAgo.toLocaleDateString('de-DE')}`);
console.log(`   Tage seit Rechnung: 22 Tage`);
console.log(`   Zahlungsstatus: unbezahlt`);
console.log('\n🎯 Der Kunde sollte alle 3 Mahnungen erhalten:');
console.log('   - 1. Mahnung (7 Tage) ✓');
console.log('   - 2. Mahnung (14 Tage) ✓');
console.log('   - 3. Mahnung (21 Tage) ✓');
console.log('\n💡 Nächste Schritte:');
console.log('   1. Gehe zu: http://localhost:3000/admin/login');
console.log('   2. Logge dich ein (Passwort: fentropsohnistpilot123!)');
console.log('   3. Klicke auf den roten "Mahnsystem starten" Button');
console.log(`   4. Oder gehe direkt zu: http://localhost:3000/admin/anfragen/${result.lastInsertRowid}\n`);
