const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Mahnung Check ===\n');

const kunde = db.prepare('SELECT id, invoice_number, vorname, familienname, erstellt_am, payment_status FROM anfragen WHERE id = 22').get();
console.log('Kunde:', kunde);

const tage = Math.floor((Date.now() - new Date(kunde.erstellt_am).getTime()) / (1000 * 60 * 60 * 24));
console.log(`Tage überfällig: ${tage}`);

const mahnungen = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = 22').all();
console.log(`\nMahnungen gefunden: ${mahnungen.length}`);

if (mahnungen.length > 0) {
  mahnungen.forEach(m => {
    console.log(`\n  Mahnung ${m.mahnung_stufe}:`);
    console.log(`    Nummer: ${m.mahnung_number}`);
    console.log(`    Versendet: ${m.versendet ? 'Ja' : 'Nein'}`);
    console.log(`    Erstellt: ${m.erstellt_am}`);
  });
} else {
  console.log('  Keine Mahnungen gefunden!');
}

db.close();
console.log('\n==================\n');
