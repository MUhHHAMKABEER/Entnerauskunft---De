const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('🔄 Migriere Datenbank...\n');

try {
  console.log('1. Füge payment_status Felder hinzu...');
  
  try {
    db.exec("ALTER TABLE anfragen ADD COLUMN payment_status TEXT DEFAULT 'unbezahlt'");
    console.log('   ✅ payment_status hinzugefügt');
  } catch (e) {
    if (e.message.includes('duplicate column')) {
      console.log('   ℹ️  payment_status existiert bereits');
    } else {
      throw e;
    }
  }

  try {
    db.exec('ALTER TABLE anfragen ADD COLUMN payment_date DATETIME');
    console.log('   ✅ payment_date hinzugefügt');
  } catch (e) {
    if (e.message.includes('duplicate column')) {
      console.log('   ℹ️  payment_date existiert bereits');
    } else {
      throw e;
    }
  }

  try {
    db.exec('ALTER TABLE anfragen ADD COLUMN payment_method TEXT');
    console.log('   ✅ payment_method hinzugefügt');
  } catch (e) {
    if (e.message.includes('duplicate column')) {
      console.log('   ℹ️  payment_method existiert bereits');
    } else {
      throw e;
    }
  }

  console.log('\n2. Erstelle Mahnungen-Tabelle...');
  db.exec(`
    CREATE TABLE IF NOT EXISTS mahnungen (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      anfrage_id INTEGER NOT NULL,
      mahnung_number TEXT UNIQUE NOT NULL,
      mahnung_stufe INTEGER NOT NULL,
      betrag REAL NOT NULL,
      mahngebuehr REAL NOT NULL,
      gesamtbetrag REAL NOT NULL,
      mahnung_path TEXT,
      mahnung_filename TEXT,
      versendet BOOLEAN DEFAULT 0,
      versendet_am DATETIME,
      erstellt_am DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (anfrage_id) REFERENCES anfragen(id)
    )
  `);
  console.log('   ✅ Mahnungen-Tabelle erstellt');

  console.log('\n3. Erstelle Indizes...');
  db.exec('CREATE INDEX IF NOT EXISTS idx_payment_status ON anfragen(payment_status)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_anfrage_id ON mahnungen(anfrage_id)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_mahnung_stufe ON mahnungen(mahnung_stufe)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_versendet ON mahnungen(versendet)');
  console.log('   ✅ Indizes erstellt');

  db.close();
  console.log('\n✅ Migration erfolgreich abgeschlossen!\n');

} catch (error) {
  console.error('\n❌ Fehler bei der Migration:', error.message);
  db.close();
  process.exit(1);
}
