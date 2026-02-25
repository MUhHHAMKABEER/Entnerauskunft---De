import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'rentenauskunft.db');

// Erstelle data Verzeichnis falls nicht vorhanden
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Erstelle Tabellen
db.exec(`
  CREATE TABLE IF NOT EXISTS anfragen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Rechnungsinformationen
    invoice_number TEXT UNIQUE,
    customer_number TEXT UNIQUE,
    order_number TEXT UNIQUE,
    
    -- Kontaktdaten
    email TEXT NOT NULL,
    
    -- Persönliche Daten
    anrede TEXT,
    vorname TEXT NOT NULL,
    familienname TEXT NOT NULL,
    geburtsname TEXT,
    geburtsdatum TEXT,
    geburtsort TEXT,
    
    -- Adresse
    strasse TEXT,
    hausnummer TEXT,
    plz TEXT,
    ort TEXT,
    land TEXT DEFAULT 'Deutschland',
    
    -- Versicherungsdaten
    versicherungsnummer TEXT NOT NULL,
    rentenversicherungstraeger TEXT,
    
    -- Weitere Angaben
    staatsangehoerigkeit TEXT,
    familienstand TEXT,
    kinder_anzahl INTEGER,
    telefon TEXT,
    
    -- Antragsdaten
    antragstyp TEXT,
    antragstyp_label TEXT,
    gewuenschter_rentenbeginn TEXT,
    
    -- Zeitraum-Felder (für Rentenbezugsbescheinigung)
    zeitraum_von TEXT,
    zeitraum_bis TEXT,
    
    -- Jahr-Felder (für Finanzverwaltung)
    jahr_von TEXT,
    jahr_bis TEXT,
    
    -- Verstorbene Person (für Hinterbliebenenrente)
    panr TEXT,
    verstorbener_vorname TEXT,
    verstorbener_familienname TEXT,
    verstorbener_geburtsname TEXT,
    
    -- Status & Verwaltung
    status TEXT DEFAULT 'neu',
    notizen TEXT,
    
    -- Tracking
    ip_adresse TEXT,
    user_agent TEXT,
    geraet TEXT,
    browser TEXT,
    betriebssystem TEXT,
    
    -- Zeitstempel
    erstellt_am DATETIME DEFAULT CURRENT_TIMESTAMP,
    aktualisiert_am DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Rechnungs-PDF
    invoice_path TEXT,
    invoice_filename TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_email ON anfragen(email);
  CREATE INDEX IF NOT EXISTS idx_status ON anfragen(status);
  CREATE INDEX IF NOT EXISTS idx_erstellt_am ON anfragen(erstellt_am);
  CREATE INDEX IF NOT EXISTS idx_invoice_number ON anfragen(invoice_number);
`);

// Admin-Tabelle für Login
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    erstellt_am DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Prüfe ob Admin existiert, wenn nicht erstelle einen
const adminExists = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
if (adminExists.count === 0) {
  // Passwort: fentropsohnistpilot123!
  // Hash mit bcrypt (wird später beim ersten Login gesetzt)
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(
    'admin',
    '$2b$10$placeholder' // Wird beim ersten Login ersetzt
  );
}

export default db;

// Helper-Funktionen
export function getNextInvoiceNumber(): string {
  const result = db.prepare(`
    SELECT invoice_number FROM anfragen 
    WHERE invoice_number IS NOT NULL 
    ORDER BY CAST(invoice_number AS INTEGER) DESC 
    LIMIT 1
  `).get() as { invoice_number: string } | undefined;
  
  if (!result) {
    return '20251180'; // Startwert
  }
  
  const currentNumber = parseInt(result.invoice_number);
  return (currentNumber + 1).toString();
}

export function getNextCustomerNumber(): string {
  const result = db.prepare(`
    SELECT customer_number FROM anfragen 
    WHERE customer_number IS NOT NULL 
    ORDER BY CAST(customer_number AS INTEGER) DESC 
    LIMIT 1
  `).get() as { customer_number: string } | undefined;
  
  if (!result) {
    return '15230'; // Startwert
  }
  
  const currentNumber = parseInt(result.customer_number);
  return (currentNumber + 1).toString();
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}-${hash}`;
}
