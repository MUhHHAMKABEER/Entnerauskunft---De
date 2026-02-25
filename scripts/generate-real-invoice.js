const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');

const kundeId = process.argv[2] || 23;

console.log('\n=== Generiere echte Rechnung mit invoice-generator-html.ts ===\n');

// Hole Kunde
const kunde = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(kundeId);
if (!kunde) {
  console.log('❌ Kunde nicht gefunden!');
  process.exit(1);
}

console.log(`Kunde: ${kunde.vorname} ${kunde.familienname}`);
console.log(`Rechnungsnummer: ${kunde.invoice_number}\n`);

// Importiere den Invoice Generator
const { generateInvoiceHTML } = require('../lib/invoice-generator-html.ts');

async function generateInvoice() {
  try {
    const customerData = {
      invoiceNumber: kunde.invoice_number,
      customerNumber: kunde.customer_number,
      orderNumber: kunde.order_number,
      salutation: kunde.anrede,
      firstName: kunde.vorname,
      lastName: kunde.familienname,
      street: `${kunde.strasse} ${kunde.hausnummer}`,
      zipCode: kunde.plz,
      city: kunde.ort,
      country: kunde.land
    };

    console.log('📄 Generiere Rechnung mit invoice-generator-html.ts...');
    const result = await generateInvoiceHTML(customerData);
    
    console.log(`✅ Rechnung generiert: ${result.fileName}`);
    console.log(`   Pfad: ${result.filePath}`);
    
    // Update DB
    db.prepare('UPDATE anfragen SET invoice_path = ?, invoice_filename = ? WHERE id = ?').run(
      result.filePath,
      result.fileName,
      kundeId
    );
    
    console.log('✅ Datenbank aktualisiert');
    
    console.log('\n📋 Rechnung enthält:');
    console.log('   - Professionelles Design');
    console.log('   - REGIS DATASEC LTD Header');
    console.log('   - Dienstleistung: 25,13 EUR (Netto)');
    console.log('   - MwSt. 19%: 4,77 EUR');
    console.log('   - Gesamtbetrag: 29,90 EUR');
    console.log('   - Bankverbindung');
    console.log('   - Footer mit Firmendetails');
    
    console.log('\n🔗 Öffne: http://localhost:3000/admin/anfragen/' + kundeId);
    console.log('   Jetzt "Rechnung herunterladen" klicken!\n');
    
  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
}

generateInvoice().then(() => db.close());
