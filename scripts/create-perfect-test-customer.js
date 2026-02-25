const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const path = require('path');

console.log('\n=== Erstelle perfekten Test-Kunden (8 Tage überfällig) ===\n');

// Lösche alte Test-Kunden
console.log('1. Lösche alte Test-Kunden...');
const oldCustomers = db.prepare('SELECT id FROM anfragen WHERE email = ?').all('test.kunde@example.com');
oldCustomers.forEach(c => {
  db.prepare('DELETE FROM mahnungen WHERE anfrage_id = ?').run(c.id);
  db.prepare('DELETE FROM anfragen WHERE id = ?').run(c.id);
});
console.log(`   ✅ ${oldCustomers.length} alte Test-Kunden gelöscht`);

// Erstelle neuen Test-Kunden mit -8 Tagen
console.log('\n2. Erstelle neuen Test-Kunden...');
const date8DaysAgo = new Date();
date8DaysAgo.setDate(date8DaysAgo.getDate() - 8);
const dateString = date8DaysAgo.toISOString();

const invoiceNumber = '20252001';
const customerNumber = '100001';
const orderNumber = 'ORD-TEST-100001-ABCDEF';

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
    '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Desktop', 'Chrome', 'Windows',
    ?, ?, '', ''
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

const kundeId = result.lastInsertRowid;

console.log('   ✅ Neuer Test-Kunde erstellt!');
console.log(`   ID: ${kundeId}`);
console.log(`   Name: Max Mustermann`);
console.log(`   Rechnungsnummer: ${invoiceNumber}`);
console.log(`   Erstellt: ${date8DaysAgo.toLocaleDateString('de-DE')} (vor 8 Tagen)`);
console.log(`   Betrag: 29,90 EUR`);

// Berechne nächste Mahnung
const nextReminderDate = new Date(date8DaysAgo);
nextReminderDate.setDate(nextReminderDate.getDate() + 14); // Tag 14 = 2. Mahnung

console.log(`\n📅 Mahnungs-Timeline:`);
console.log(`   Tag 7 (${new Date(date8DaysAgo.getTime() + 7*24*60*60*1000).toLocaleString('de-DE')}): 1. Mahnung fällig ✅`);
console.log(`   Tag 14 (${nextReminderDate.toLocaleString('de-DE')}): 2. Mahnung fällig`);
console.log(`   Tag 21 (${new Date(date8DaysAgo.getTime() + 21*24*60*60*1000).toLocaleString('de-DE')}): Letzte Mahnung fällig`);

console.log(`\n💡 Was du sehen solltest:`);
console.log(`   - Rechnung überfällig seit 8 Tagen`);
console.log(`   - Nur "1. Mahnung per Email" Button (da nur 7 Tage überschritten)`);
console.log(`   - Nur "1. Mahnung herunterladen" Button`);
console.log(`   - "Nächste Mahnung am ${nextReminderDate.toLocaleString('de-DE')}"`);

console.log(`\n🔗 Direkter Link:`);
console.log(`   http://localhost:3000/admin/anfragen/${kundeId}`);

console.log('\n⚠️  WICHTIG: Jetzt muss noch die echte Rechnung generiert werden!');
console.log('   Führe aus: node scripts/generate-real-invoice.js ' + kundeId);

db.close();
