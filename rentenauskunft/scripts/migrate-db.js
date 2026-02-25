const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'rentenauskunft.db');
const db = new Database(dbPath);

console.log('🔧 Migriere Datenbank...');

try {
  // Prüfe ob Spalten existieren
  const tableInfo = db.prepare("PRAGMA table_info(anfragen)").all();
  const columns = tableInfo.map(col => col.name);
  
  console.log('Vorhandene Spalten:', columns);
  
  // Füge fehlende Spalten hinzu
  if (!columns.includes('geraet')) {
    console.log('➕ Füge Spalte "geraet" hinzu...');
    db.prepare('ALTER TABLE anfragen ADD COLUMN geraet TEXT').run();
  }
  
  if (!columns.includes('browser')) {
    console.log('➕ Füge Spalte "browser" hinzu...');
    db.prepare('ALTER TABLE anfragen ADD COLUMN browser TEXT').run();
  }
  
  if (!columns.includes('betriebssystem')) {
    console.log('➕ Füge Spalte "betriebssystem" hinzu...');
    db.prepare('ALTER TABLE anfragen ADD COLUMN betriebssystem TEXT').run();
  }
  
  console.log('✅ Migration erfolgreich!');
} catch (error) {
  console.error('❌ Fehler bei Migration:', error);
  process.exit(1);
}

db.close();
