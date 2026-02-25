const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Erstelle alle 3 Mahnungen für Test-Kunden ===\n');

// Lösche alte Mahnungen
db.prepare('DELETE FROM mahnungen WHERE anfrage_id = 22').run();
console.log('1. Alte Mahnungen gelöscht');

// Hole Kunde
const kunde = db.prepare('SELECT * FROM anfragen WHERE id = 22').get();
if (!kunde) {
  console.log('Kunde nicht gefunden!');
  process.exit(1);
}

console.log('2. Kunde gefunden:', kunde.vorname, kunde.familienname);

// Erstelle alle 3 Mahnungen
const mahnungen = [
  { stufe: 1, gebuehr: 5.00 },
  { stufe: 2, gebuehr: 10.00 },
  { stufe: 3, gebuehr: 15.00 }
];

const betrag = 49.99; // Standard-Betrag
const timestamp = Date.now();

for (const mahnung of mahnungen) {
  const mahnungNumber = `M-${timestamp}${mahnung.stufe}`;
  const gesamtbetrag = betrag + mahnung.gebuehr;
  
  db.prepare(`
    INSERT INTO mahnungen (
      anfrage_id, mahnung_number, mahnung_stufe,
      betrag, mahngebuehr, gesamtbetrag,
      mahnung_path, mahnung_filename,
      versendet, erstellt_am
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
  `).run(
    22,
    mahnungNumber,
    mahnung.stufe,
    betrag,
    mahnung.gebuehr,
    gesamtbetrag,
    `/data/mahnungen/${mahnungNumber}.pdf`,
    `${mahnungNumber}.pdf`
  );
  
  console.log(`3.${mahnung.stufe} Mahnung Stufe ${mahnung.stufe} erstellt: ${mahnungNumber}`);
}

// Prüfe Ergebnis
const created = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = 22 ORDER BY mahnung_stufe').all();
console.log(`\n✅ Erfolgreich ${created.length} Mahnungen erstellt:`);
created.forEach(m => {
  console.log(`   - ${m.mahnung_number} (Stufe ${m.mahnung_stufe}) - ${m.gesamtbetrag.toFixed(2)} EUR`);
});

console.log('\n🔗 Öffne jetzt: http://localhost:3000/admin/anfragen/22');
console.log('   Bei Rechnungsinformationen sollten 3 Download-Buttons erscheinen');
console.log('   Bei Zahlungsstatus sollten 3 Versand-Buttons erscheinen\n');

db.close();
