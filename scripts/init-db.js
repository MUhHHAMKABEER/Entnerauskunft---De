const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('🗄️  Initializing databases...');

// Initialize main database
const dbPath = path.join(dataDir, 'rentenauskunft.db');
const db = new Database(dbPath);

// Create anfragen table
db.exec(`
  CREATE TABLE IF NOT EXISTS anfragen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    vorname TEXT NOT NULL,
    familienname TEXT NOT NULL,
    geburtsname TEXT,
    geburtsdatum TEXT NOT NULL,
    geburtsort TEXT NOT NULL,
    strasse TEXT NOT NULL,
    hausnummer TEXT NOT NULL,
    plz TEXT NOT NULL,
    ort TEXT NOT NULL,
    email TEXT NOT NULL,
    telefon TEXT,
    versicherungsnummer TEXT,
    antragstyp TEXT NOT NULL,
    antragstyp_label TEXT,
    zeitraum_von TEXT,
    zeitraum_bis TEXT,
    jahr_von TEXT,
    jahr_bis TEXT,
    panr TEXT,
    verstorbener_vorname TEXT,
    verstorbener_familienname TEXT,
    verstorbener_geburtsname TEXT,
    rechnungsnummer TEXT UNIQUE,
    kundennummer TEXT,
    auftragsnummer TEXT,
    ip_address TEXT,
    user_agent TEXT,
    geraet TEXT,
    browser TEXT,
    betriebssystem TEXT
  )
`);

// Create page_views table for analytics
db.exec(`
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    path TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    country TEXT,
    city TEXT,
    browser TEXT,
    device TEXT,
    os TEXT,
    session_id TEXT
  )
`);

// Create admin_users table
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert default admin user if not exists
const bcrypt = require('bcrypt');
const defaultPassword = 'fentropsohnistpilot123!';
const passwordHash = bcrypt.hashSync(defaultPassword, 10);

const existingAdmin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get('admin');
if (!existingAdmin) {
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', passwordHash);
  console.log('✅ Default admin user created (username: admin)');
}

console.log('✅ Database initialized successfully!');
db.close();
