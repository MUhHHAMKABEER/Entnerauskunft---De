const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Letzte Kunden ===\n');

const kunden = db.prepare('SELECT id, invoice_number, vorname, familienname, erstellt_am, payment_status FROM anfragen ORDER BY id DESC LIMIT 5').all();

kunden.forEach(k => {
  const tage = Math.floor((Date.now() - new Date(k.erstellt_am).getTime()) / (1000 * 60 * 60 * 24));
  console.log(`ID ${k.id}: ${k.vorname} ${k.familienname}`);
  console.log(`  Rechnung: ${k.invoice_number}`);
  console.log(`  Tage überfällig: ${tage}`);
  console.log(`  Status: ${k.payment_status}`);
  console.log(`  Link: http://localhost:3000/admin/anfragen/${k.id}\n`);
});

db.close();
