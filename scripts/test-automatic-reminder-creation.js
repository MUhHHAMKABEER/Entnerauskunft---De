const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Test: Automatische Mahnungserstellung ===\n');

const kunde = db.prepare('SELECT * FROM anfragen WHERE id = 23').get();
const mahnungen = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = 23 ORDER BY mahnung_stufe ASC').all();

const erstelltAm = new Date(kunde.erstellt_am);
const jetzt = new Date();
const differenzMs = jetzt.getTime() - erstelltAm.getTime();
const tageUeberfaellig = Math.floor(differenzMs / (1000 * 60 * 60 * 24));
const stundenUeberfaellig = Math.floor(differenzMs / (1000 * 60 * 60));
const minutenUeberfaellig = Math.floor(differenzMs / (1000 * 60));

console.log('Kunde #23:');
console.log('  Erstellt am: ' + erstelltAm.toLocaleString('de-DE'));
console.log('  Jetzt: ' + jetzt.toLocaleString('de-DE'));
console.log('  Differenz: ' + tageUeberfaellig + ' Tage, ' + (stundenUeberfaellig % 24) + ' Stunden, ' + (minutenUeberfaellig % 60) + ' Minuten');

console.log('\nErwartete Mahnungen:');
if (tageUeberfaellig >= 7) {
  console.log('  - Zahlungserinnerung (Tag 7): FAELLIG');
} else {
  const zahlungserinnerungDatum = new Date(erstelltAm);
  zahlungserinnerungDatum.setDate(zahlungserinnerungDatum.getDate() + 7);
  console.log('  - Zahlungserinnerung (Tag 7): Faellig am ' + zahlungserinnerungDatum.toLocaleString('de-DE'));
}

if (tageUeberfaellig >= 14) {
  console.log('  - 1. Mahnung (Tag 14): FAELLIG');
} else if (tageUeberfaellig >= 7) {
  const mahnung1Datum = new Date(erstelltAm);
  mahnung1Datum.setDate(mahnung1Datum.getDate() + 14);
  console.log('  - 1. Mahnung (Tag 14): Faellig am ' + mahnung1Datum.toLocaleString('de-DE'));
}

if (tageUeberfaellig >= 21) {
  console.log('  - Letzte Mahnung (Tag 21): FAELLIG');
} else if (tageUeberfaellig >= 14) {
  const mahnung3Datum = new Date(erstelltAm);
  mahnung3Datum.setDate(mahnung3Datum.getDate() + 21);
  console.log('  - Letzte Mahnung (Tag 21): Faellig am ' + mahnung3Datum.toLocaleString('de-DE'));
}

console.log('\nVorhandene Mahnungen:');
if (mahnungen.length === 0) {
  console.log('  Keine Mahnungen vorhanden');
} else {
  mahnungen.forEach(m => {
    const titel = m.mahnung_stufe === 1 ? 'Zahlungserinnerung' : m.mahnung_stufe === 2 ? '1. Mahnung' : 'Letzte Mahnung';
    console.log('  - ' + titel + ': ' + m.gesamtbetrag.toFixed(2) + ' EUR (erstellt am ' + new Date(m.erstellt_am).toLocaleString('de-DE') + ')');
  });
}

console.log('\nAutomatische Erstellung:');
console.log('  Die Mahnungen werden automatisch erstellt, wenn:');
console.log('  1. Die Detailseite geladen wird (useEffect)');
console.log('  2. Das Faelligkeitsdatum erreicht ist (auf die Sekunde genau)');
console.log('  3. Die Mahnung noch nicht existiert');

console.log('\nTest:');
console.log('  1. Oeffne: http://localhost:3000/admin/anfragen/23');
console.log('  2. Die Seite prueft automatisch, welche Mahnungen faellig sind');
console.log('  3. Fehlende Mahnungen werden sofort erstellt');
console.log('  4. Lade die Seite neu (F5) um die Mahnungen zu sehen\n');

db.close();
