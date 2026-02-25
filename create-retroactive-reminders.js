const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');

console.log('=== RÜCKWIRKENDE MAHNUNGEN ERSTELLEN ===');
console.log('WICHTIG: Mahnungen werden NICHT automatisch versendet!');
console.log('Versendung nur manuell über Admin-Buttons.\n');

// Gebührenstruktur
const FEES = {
  1: { verzugskosten: 2.50, mahngebuehr: 0.00 },   // Zahlungserinnerung
  2: { verzugskosten: 2.50, mahngebuehr: 2.50 },   // 1. Mahnung
  3: { verzugskosten: 2.50, mahngebuehr: 5.00 }    // Letzte Mahnung
};

const ORIGINAL_AMOUNT = 29.90;

// Hole alle unbezahlten Kunden
const kunden = db.prepare(`
  SELECT id, invoice_number, customer_number, order_number, anrede, vorname, 
         familienname, strasse, hausnummer, plz, ort, email, erstellt_am
  FROM anfragen 
  WHERE payment_date IS NULL
  ORDER BY erstellt_am ASC
`).all();

console.log(`Gefunden: ${kunden.length} unbezahlte Kunden\n`);

let erstelltGesamt = 0;
let fehlerGesamt = 0;

kunden.forEach(kunde => {
  const erstelltAm = new Date(kunde.erstellt_am);
  const heute = new Date();
  const tageAlt = Math.floor((heute - erstelltAm) / (1000 * 60 * 60 * 24));
  
  console.log(`\n--- Kunde ID ${kunde.id}: ${kunde.vorname} ${kunde.familienname} ---`);
  console.log(`Rechnung: ${kunde.invoice_number} | Erstellt: ${erstelltAm.toLocaleDateString('de-DE')} (vor ${tageAlt} Tagen)`);
  
  // Bestimme welche Mahnungen fällig sind
  const faelligeMahnungen = [];
  if (tageAlt >= 7) faelligeMahnungen.push(1);
  if (tageAlt >= 14) faelligeMahnungen.push(2);
  if (tageAlt >= 21) faelligeMahnungen.push(3);
  
  if (faelligeMahnungen.length === 0) {
    console.log('  -> Noch keine Mahnung fällig');
    return;
  }
  
  console.log(`  -> Fällige Mahnungen: ${faelligeMahnungen.join(', ')}`);
  
  // Prüfe welche Mahnungen bereits existieren
  const vorhandeneMahnungen = db.prepare(
    'SELECT mahnung_stufe FROM mahnungen WHERE anfrage_id = ?'
  ).all(kunde.id).map(m => m.mahnung_stufe);
  
  faelligeMahnungen.forEach(stufe => {
    if (vorhandeneMahnungen.includes(stufe)) {
      console.log(`  Stufe ${stufe}: Bereits vorhanden (übersprungen)`);
      return;
    }
    
    try {
      // Berechne historisches Mahnungsdatum
      const mahnungDatum = new Date(erstelltAm);
      mahnungDatum.setDate(mahnungDatum.getDate() + (stufe * 7));
      
      // Generiere Mahnungsnummer
      const mahnungNumber = `M${kunde.invoice_number}-${stufe}`;
      
      // Berechne Gebühren
      const fees = FEES[stufe];
      const totalFee = fees.verzugskosten + fees.mahngebuehr;
      const totalAmount = ORIGINAL_AMOUNT + totalFee;
      
      // Erstelle Mahnung in DB (OHNE PDF, OHNE Email)
      db.prepare(`
        INSERT INTO mahnungen (
          anfrage_id, mahnung_number, mahnung_stufe, betrag, 
          mahngebuehr, gesamtbetrag, versendet, erstellt_am
        ) VALUES (?, ?, ?, ?, ?, ?, 0, ?)
      `).run(
        kunde.id,
        mahnungNumber,
        stufe,
        ORIGINAL_AMOUNT,
        totalFee,
        totalAmount,
        mahnungDatum.toISOString()
      );
      
      console.log(`  ✓ Stufe ${stufe} erstellt: ${mahnungNumber} | ${totalAmount.toFixed(2)} EUR | Datum: ${mahnungDatum.toLocaleDateString('de-DE')}`);
      erstelltGesamt++;
      
    } catch (error) {
      console.log(`  ✗ Fehler bei Stufe ${stufe}: ${error.message}`);
      fehlerGesamt++;
    }
  });
});

console.log('\n=== ZUSAMMENFASSUNG ===');
console.log(`Mahnungen erstellt: ${erstelltGesamt}`);
console.log(`Fehler: ${fehlerGesamt}`);
console.log('\nWICHTIG:');
console.log('- Mahnungen sind NICHT versendet (versendet = 0)');
console.log('- Keine PDFs generiert (werden beim ersten Öffnen erstellt)');
console.log('- Versendung nur manuell über Admin-Buttons');
console.log('- Historische Daten korrekt (Mahnungsdatum = Erstellungsdatum + 7/14/21 Tage)');

db.close();
