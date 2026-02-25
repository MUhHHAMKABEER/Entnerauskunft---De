const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'rentenauskunft.db');
const db = new Database(dbPath);

try {
  // Prüfe ob Spalten bereits existieren
  const tableInfo = db.pragma('table_info(anfragen)');
  const hasInvoicePath = tableInfo.some(col => col.name === 'invoice_path');
  const hasInvoiceFilename = tableInfo.some(col => col.name === 'invoice_filename');
  
  if (!hasInvoicePath) {
    db.exec('ALTER TABLE anfragen ADD COLUMN invoice_path TEXT');
    console.log('✅ Spalte invoice_path hinzugefügt');
  } else {
    console.log('ℹ️  Spalte invoice_path existiert bereits');
  }
  
  if (!hasInvoiceFilename) {
    db.exec('ALTER TABLE anfragen ADD COLUMN invoice_filename TEXT');
    console.log('✅ Spalte invoice_filename hinzugefügt');
  } else {
    console.log('ℹ️  Spalte invoice_filename existiert bereits');
  }
  
  console.log('✅ Fertig!');
} catch (error) {
  console.error('❌ Fehler:', error);
} finally {
  db.close();
}
