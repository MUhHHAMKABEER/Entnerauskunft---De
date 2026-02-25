const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'rentenauskunft.db');
const db = new Database(dbPath);

console.log('🔧 Migriere Datenbank (V2)...');

try {
  const tableInfo = db.prepare("PRAGMA table_info(anfragen)").all();
  const columns = tableInfo.map(col => col.name);
  
  console.log('Vorhandene Spalten:', columns.length);
  
  // Neue Spalten hinzufügen
  const newColumns = [
    { name: 'antragstyp_label', type: 'TEXT' },
    { name: 'zeitraum_von', type: 'TEXT' },
    { name: 'zeitraum_bis', type: 'TEXT' },
    { name: 'jahr_von', type: 'TEXT' },
    { name: 'jahr_bis', type: 'TEXT' },
    { name: 'panr', type: 'TEXT' },
    { name: 'verstorbener_vorname', type: 'TEXT' },
    { name: 'verstorbener_familienname', type: 'TEXT' },
    { name: 'verstorbener_geburtsname', type: 'TEXT' }
  ];
  
  newColumns.forEach(col => {
    if (!columns.includes(col.name)) {
      console.log(`➕ Füge Spalte "${col.name}" hinzu...`);
      db.prepare(`ALTER TABLE anfragen ADD COLUMN ${col.name} ${col.type}`).run();
    } else {
      console.log(`✓ Spalte "${col.name}" existiert bereits`);
    }
  });
  
  console.log('✅ Migration V2 erfolgreich!');
} catch (error) {
  console.error('❌ Fehler bei Migration:', error);
  process.exit(1);
}

db.close();
