const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('=== ANALYSE BESTEHENDER KUNDEN ===\n');

const kunden = db.prepare(`
  SELECT id, invoice_number, customer_number, vorname, familienname, 
         email, erstellt_am, payment_date, payment_status
  FROM anfragen 
  ORDER BY erstellt_am ASC
`).all();

const heute = new Date();

console.log('Gesamt Kunden:', kunden.length);
console.log('');

let unbezahlt = 0;
let ueberfaellig7 = 0;
let ueberfaellig14 = 0;
let ueberfaellig21 = 0;

kunden.forEach(k => {
  const erstellt = new Date(k.erstellt_am);
  const tageAlt = Math.floor((heute - erstellt) / (1000 * 60 * 60 * 24));
  
  if (!k.payment_date) {
    unbezahlt++;
    console.log(`ID ${k.id} | ${k.invoice_number} | ${k.vorname} ${k.familienname}`);
    console.log(`  Erstellt: ${erstellt.toLocaleDateString('de-DE')} (vor ${tageAlt} Tagen)`);
    console.log(`  Email: ${k.email}`);
    
    if (tageAlt >= 21) {
      console.log('  -> LETZTE MAHNUNG faellig');
      ueberfaellig21++;
    } else if (tageAlt >= 14) {
      console.log('  -> 1. MAHNUNG faellig');
      ueberfaellig14++;
    } else if (tageAlt >= 7) {
      console.log('  -> ZAHLUNGSERINNERUNG faellig');
      ueberfaellig7++;
    } else {
      console.log('  -> Noch nicht ueberfaellig');
    }
    console.log('');
  }
});

console.log('ZUSAMMENFASSUNG:');
console.log('  Unbezahlt:', unbezahlt);
console.log('  Zahlungserinnerung faellig (7+ Tage):', ueberfaellig7);
console.log('  1. Mahnung faellig (14+ Tage):', ueberfaellig14);
console.log('  Letzte Mahnung faellig (21+ Tage):', ueberfaellig21);

db.close();
