const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db.sqlite3');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    db.run('PRAGMA foreign_keys = ON');
    initializeTables();
  }
});

function initializeTables() {
  db.serialize(() => {
    // Create psychologist table
    db.run(`
      CREATE TABLE IF NOT EXISTS contact_psychologist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        crp TEXT NOT NULL UNIQUE,
        specialty TEXT NOT NULL,
        description TEXT,
        full_bio TEXT,
        education TEXT,
        photo_url TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create contact request table
    db.run(`
      CREATE TABLE IF NOT EXISTS contact_contactrequest (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        psychologist_id INTEGER,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (psychologist_id) REFERENCES contact_psychologist(id) ON DELETE SET NULL
      )
    `);
  });
}

module.exports = db;
