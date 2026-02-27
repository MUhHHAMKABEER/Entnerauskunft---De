import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'rentenauskunft.db');
const dbDir = path.dirname(dbPath);

// Erstelle data Verzeichnis falls nicht vorhanden
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Migration: Füge neue Spalten hinzu falls sie nicht existieren
try {
  const tableInfo = db.prepare("PRAGMA table_info(anfragen)").all() as any[];
  const hasPaymentStatus = tableInfo.some((col: any) => col.name === 'payment_status');

  if (!hasPaymentStatus) {
    console.log('🔄 Migriere Datenbank: Füge Zahlungsstatus-Felder hinzu...');
    db.exec("ALTER TABLE anfragen ADD COLUMN payment_status TEXT DEFAULT 'unbezahlt'");
    db.exec("ALTER TABLE anfragen ADD COLUMN payment_date DATETIME");
    db.exec("ALTER TABLE anfragen ADD COLUMN payment_method TEXT");
    console.log('✅ Zahlungsstatus-Felder hinzugefügt');
  }

  const hasReminderSent = tableInfo.some((col: any) => col.name === 'last_reminder_sent');
  if (!hasReminderSent) {
    console.log('🔄 Migriere Datenbank: Füge Reminder-Tracking-Felder hinzu...');
    db.exec("ALTER TABLE anfragen ADD COLUMN last_reminder_sent TEXT");
    db.exec("ALTER TABLE anfragen ADD COLUMN last_reminder_at DATETIME");
    console.log('✅ Reminder-Tracking-Felder hinzugefügt');
  }
} catch (e) {
  // Tabelle existiert noch nicht, wird gleich erstellt
}

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
    invoice_filename TEXT,
    
    -- Zahlungsstatus
    payment_status TEXT DEFAULT 'unbezahlt',
    payment_date DATETIME,
    payment_method TEXT,

    -- Reminder Tracking
    last_reminder_sent TEXT,
    last_reminder_at DATETIME
  );

  CREATE INDEX IF NOT EXISTS idx_email ON anfragen(email);
  CREATE INDEX IF NOT EXISTS idx_status ON anfragen(status);
  CREATE INDEX IF NOT EXISTS idx_erstellt_am ON anfragen(erstellt_am);
  CREATE INDEX IF NOT EXISTS idx_invoice_number ON anfragen(invoice_number);
  CREATE INDEX IF NOT EXISTS idx_payment_status ON anfragen(payment_status);
`);

// Mahnungen-Tabelle
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
  );

  CREATE INDEX IF NOT EXISTS idx_anfrage_id ON mahnungen(anfrage_id);
  CREATE INDEX IF NOT EXISTS idx_mahnung_stufe ON mahnungen(mahnung_stufe);
  CREATE INDEX IF NOT EXISTS idx_versendet ON mahnungen(versendet);
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

// Email-Vorlagen Tabelle
db.exec(`
  CREATE TABLE IF NOT EXISTS email_vorlagen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    betreff TEXT NOT NULL,
    inhalt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Entwurf',
    vorlagen_typ TEXT,
    erstellt_am DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_email_vorlagen_status ON email_vorlagen(status);
  CREATE INDEX IF NOT EXISTS idx_email_vorlagen_erstellt_am ON email_vorlagen(erstellt_am);

  -- Email Logs
  CREATE TABLE IF NOT EXISTS email_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    anfrage_id INTEGER NOT NULL,
    template_id INTEGER,
    subject TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    recipient TEXT,
    status TEXT DEFAULT 'sent',
    FOREIGN KEY (anfrage_id) REFERENCES anfragen(id)
  );

  CREATE INDEX IF NOT EXISTS idx_email_logs_anfrage_id ON email_logs(anfrage_id);
  CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
`);
try {
  const emailLogColumns = db.prepare(`PRAGMA table_info(email_logs)`).all() as { name: string }[];
  const emailLogColumnSet = new Set(emailLogColumns.map((c) => c.name));

  if (!emailLogColumnSet.has('milestone_step')) {
    db.exec(`ALTER TABLE email_logs ADD COLUMN milestone_step INTEGER`);
  }
  if (!emailLogColumnSet.has('milestone_day')) {
    db.exec(`ALTER TABLE email_logs ADD COLUMN milestone_day REAL`);
  }
} catch (e) {
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

export function getNextMahnungNumber(): string {
  const result = db.prepare(`
    SELECT mahnung_number FROM mahnungen 
    WHERE mahnung_number IS NOT NULL 
    ORDER BY CAST(SUBSTR(mahnung_number, 3) AS INTEGER) DESC 
    LIMIT 1
  `).get() as { mahnung_number: string } | undefined;

  if (!result) {
    return 'M-30250001';
  }

  const currentNumber = parseInt(result.mahnung_number.substring(2));
  return `M-${(currentNumber + 1).toString()}`;
}

// ==================== EMAIL VORLAGEN ====================

export type EmailVorlage = {
  id: number;
  name: string;
  betreff: string;
  inhalt: string;
  status: "Entwurf" | "Aktiv";
  vorlagen_typ: string | null;
  erstellt_am: string;
};

export function erstelleEmailVorlage(input: {
  name: string;
  betreff: string;
  inhalt: string;
  status?: "Entwurf" | "Aktiv";
  vorlagen_typ?: string | null;
}) {
  const stmt = db.prepare(`
    INSERT INTO email_vorlagen (name, betreff, inhalt, status, vorlagen_typ)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(
    input.name,
    input.betreff,
    input.inhalt,
    input.status ?? "Entwurf",
    input.vorlagen_typ ?? null
  );
}

export function listeEmailVorlagen() {
  return db
    .prepare(
      `SELECT id, name, betreff, inhalt, status, vorlagen_typ, erstellt_am
       FROM email_vorlagen
       ORDER BY erstellt_am DESC`
    )
    .all() as EmailVorlage[];
}

export function holeEmailVorlageById(id: number) {
  return db
    .prepare(
      `SELECT id, name, betreff, inhalt, status, vorlagen_typ, erstellt_am
       FROM email_vorlagen
       WHERE id = ?`
    )
    .get(id) as EmailVorlage | undefined;
}

export function aktualisiereEmailVorlage(
  id: number,
  input: { name: string; betreff: string; inhalt: string; status: "Entwurf" | "Aktiv"; vorlagen_typ?: string | null }
) {
  const stmt = db.prepare(`
    UPDATE email_vorlagen
    SET name = ?, betreff = ?, inhalt = ?, status = ?, vorlagen_typ = ?
    WHERE id = ?
  `);
  return stmt.run(
    input.name,
    input.betreff,
    input.inhalt,
    input.status,
    input.vorlagen_typ ?? null,
    id
  );
}

export function loescheEmailVorlage(id: number) {
  return db.prepare(`DELETE FROM email_vorlagen WHERE id = ?`).run(id);
}