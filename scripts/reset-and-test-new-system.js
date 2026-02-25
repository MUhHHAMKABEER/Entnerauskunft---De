const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Neues Mahnsystem - Reset & Test ===\n');

// Lösche alle Mahnungen für Kunde 23
db.prepare('DELETE FROM mahnungen WHERE anfrage_id = 23').run();
console.log('✅ Alte Mahnungen gelöscht');

console.log('\n📋 Neue Gebührenstruktur:');
console.log('   1. Zahlungserinnerung (Tag 7):');
console.log('      - Rechnungsbetrag: 29,90 EUR');
console.log('      - Verzugskosten § 286 BGB: 2,50 EUR');
console.log('      - Gesamtbetrag: 32,40 EUR');
console.log('');
console.log('   2. 1. Mahnung (Tag 14):');
console.log('      - Rechnungsbetrag: 29,90 EUR');
console.log('      - Verzugskosten § 286 BGB: 2,50 EUR');
console.log('      - Mahngebühren: 2,00 EUR');
console.log('      - Gesamtbetrag: 34,40 EUR');
console.log('');
console.log('   3. Letzte Mahnung (Tag 21):');
console.log('      - Rechnungsbetrag: 29,90 EUR');
console.log('      - Verzugskosten § 286 BGB: 2,50 EUR');
console.log('      - Mahngebühren (1. + 2.): 4,00 EUR');
console.log('      - Gesamtbetrag: 36,40 EUR');

console.log('\n📧 Email-Betreffzeilen:');
console.log('   1. "Zahlungserinnerung – Rechnung Nr. 20252001 | Offener Betrag 32,40 €"');
console.log('   2. "1. Mahnung – Rechnung Nr. 20252001 | Offener Betrag 34,40 €"');
console.log('   3. "Letzte Mahnung vor Inkasso und gerichtlichen Maßnahmen – Rechnung Nr. 20252001"');

const kunde = db.prepare('SELECT * FROM anfragen WHERE id = 23').get();
const tage = Math.floor((Date.now() - new Date(kunde.erstellt_am).getTime()) / (1000 * 60 * 60 * 24));

console.log('\n👤 Kunde #23:');
console.log('   Name: ' + kunde.vorname + ' ' + kunde.familienname);
console.log('   Email: ' + kunde.email);
console.log('   Tage überfällig: ' + tage);
console.log('   Erwartete Mahnungen: ' + (tage >= 21 ? '3 (Alle)' : tage >= 14 ? '2 (Zahlungserinnerung + 1. Mahnung)' : '1 (Zahlungserinnerung)'));

console.log('\n🔗 Nächste Schritte:');
console.log('   1. Öffne: http://localhost:3000/admin/anfragen/23');
console.log('   2. Seite lädt automatisch und erstellt Mahnungen');
console.log('   3. Prüfe die Button-Beschriftungen:');
console.log('      - "Zahlungserinnerung per Email"');
console.log('      - "1. Mahnung per Email"');
console.log('      - "Letzte Mahnung per Email" (falls 21+ Tage)');
console.log('   4. Klicke auf einen Button zum Testen');
console.log('   5. Button wird grau, Hover zeigt Versanddatum');
console.log('   6. Prüfe Email bei: becherundpartner@tutamail.com\n');

db.close();
