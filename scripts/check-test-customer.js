const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Test-Kunde Prüfung ===\n');

const kunde = db.prepare('SELECT * FROM anfragen WHERE invoice_number = ?').get('20251999');

if (kunde) {
  console.log('✅ Test-Kunde gefunden!\n');
  console.log('Details:');
  console.log(`   ID: ${kunde.id}`);
  console.log(`   Name: ${kunde.vorname} ${kunde.familienname}`);
  console.log(`   E-Mail: ${kunde.email}`);
  console.log(`   Rechnungsnummer: ${kunde.invoice_number}`);
  console.log(`   Erstellt am: ${new Date(kunde.erstellt_am).toLocaleString('de-DE')}`);
  console.log(`   Zahlungsstatus: ${kunde.payment_status}`);
  
  const tage = Math.floor((Date.now() - new Date(kunde.erstellt_am).getTime()) / (1000 * 60 * 60 * 24));
  console.log(`   Tage überfällig: ${tage} Tage`);
  
  console.log('\n📋 Direkter Link:');
  console.log(`   http://localhost:3000/admin/anfragen/${kunde.id}`);
  
  const mahnungen = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = ?').all(kunde.id);
  console.log(`\n📧 Mahnungen: ${mahnungen.length}`);
  if (mahnungen.length > 0) {
    mahnungen.forEach(m => {
      console.log(`   - ${m.mahnung_number} (Stufe ${m.mahnung_stufe}) - ${m.versendet ? 'Versendet' : 'Nicht versendet'}`);
    });
  }
} else {
  console.log('❌ Test-Kunde nicht gefunden!');
  console.log('\nErstelle neuen Test-Kunden...\n');
  
  const date22DaysAgo = new Date();
  date22DaysAgo.setDate(date22DaysAgo.getDate() - 22);
  
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
    date22DaysAgo.toISOString(), date22DaysAgo.toISOString()
  );
  
  console.log(`✅ Test-Kunde erstellt mit ID: ${result.lastInsertRowid}`);
  console.log(`📋 Link: http://localhost:3000/admin/anfragen/${result.lastInsertRowid}`);
}

console.log('\n=========================\n');
db.close();
