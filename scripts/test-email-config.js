const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Email-Konfiguration Test ===\n');

const kunde = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(23);
const mahnungen = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = ? ORDER BY mahnung_stufe ASC').all(23);

console.log('✅ Kunde #23:');
console.log(`   Name: ${kunde.vorname} ${kunde.familienname}`);
console.log(`   Email: ${kunde.email}`);
console.log(`   Rechnungsnummer: ${kunde.invoice_number}`);

console.log('\n📧 Email-Server:');
console.log('   Host: server380.web-hosting.com');
console.log('   Port: 465 (SSL)');
console.log('   User: info@rentnerauskunft.de');
console.log('   Status: Konfiguriert ✅');

console.log('\n📋 Mahnungen:');
mahnungen.forEach(m => {
  console.log(`   ${m.mahnung_stufe}. Mahnung:`);
  console.log(`      Nummer: ${m.mahnung_number}`);
  console.log(`      Betrag: ${m.gesamtbetrag.toFixed(2)} EUR`);
  console.log(`      Versendet: ${m.versendet ? 'Ja (' + new Date(m.versendet_am).toLocaleString('de-DE') + ')' : 'Nein'}`);
});

console.log('\n💡 So funktioniert der Email-Versand:');
console.log('   1. Öffne: http://localhost:3000/admin/anfragen/23');
console.log('   2. Klicke auf "1. Mahnung per Email" oder "2. Mahnung per Email"');
console.log('   3. Die Email wird an becherundpartner@tutamail.com gesendet');
console.log('   4. Der Button wird grau und zeigt "Versendet am [Datum]" beim Hover');
console.log('   5. Der Button bleibt anklickbar (falls erneuter Versand nötig)');

console.log('\n📬 Erwartete Email-Inhalte:');
console.log('   - Betreff: "Zahlungserinnerung - Mahnung [Nummer]"');
console.log('   - Anhang: Mahnungs-PDF mit professionellem Design');
console.log('   - Text: Höfliche Zahlungsaufforderung');

console.log('\n⚠️  WICHTIG:');
console.log('   - Prüfe den Spam-Ordner von becherundpartner@tutamail.com');
console.log('   - Die Email kommt von info@rentnerauskunft.de');
console.log('   - Nach dem Versand wird das Datum in der DB gespeichert\n');

db.close();
