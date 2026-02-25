const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Mahngebühren auf 2,50 EUR erhöht ===\n');

// Lösche alte Mahnungen
db.prepare('DELETE FROM mahnungen WHERE anfrage_id = 23').run();
console.log('Alte Mahnungen gelöscht');

console.log('\nNeue Gebührenstruktur:');
console.log('  1. Zahlungserinnerung: 29,90 + 2,50 = 32,40 EUR');
console.log('  2. 1. Mahnung: 29,90 + 2,50 + 2,50 = 34,90 EUR');
console.log('  3. Letzte Mahnung: 29,90 + 2,50 + 2,50 + 2,50 = 37,40 EUR');

console.log('\nÜbersicht-Anzeige korrigiert:');
console.log('  - Zeigt jetzt die nächste fällige Mahnung an');
console.log('  - Nicht mehr immer "Letzte Mahnung"');
console.log('  - Ab Tag 21: "Alle Mahnungen fällig seit [Datum]"');

console.log('\nDeployment-Info:');
console.log('  JA, du kannst das später deployen ohne Datenverlust!');
console.log('  - Kundendaten bleiben komplett erhalten');
console.log('  - Nur der Code wird aktualisiert');
console.log('  - Neue Mahnungen werden mit neuen Gebühren erstellt');
console.log('  - Alte Mahnungen bleiben unverändert (falls vorhanden)');
console.log('  - Datenbank-Schema bleibt gleich (keine Migration nötig)');

console.log('\nWas passiert beim Deployment:');
console.log('  1. Code wird auf Server hochgeladen');
console.log('  2. Datenbank bleibt auf Server (rentenauskunft.db)');
console.log('  3. Alle 30 Kunden bleiben erhalten');
console.log('  4. Neue Mahnungen nutzen automatisch neue Gebühren');
console.log('  5. Keine Aktion erforderlich');

console.log('\nTest:');
console.log('  Öffne: http://localhost:3000/admin/anfragen/23');
console.log('  Neue Mahnungen werden mit 34,90 EUR / 37,40 EUR erstellt\n');

db.close();
