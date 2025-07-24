const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

function initializeDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      manager_id INTEGER,
      employment_start_date TEXT,
      vacation_days_base INTEGER
    )`);

    db.run(`CREATE TABLE leave_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      leave_type TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      days_count INTEGER NOT NULL,
      status TEXT NOT NULL,
      comment TEXT
    )`);

    db.run(`INSERT INTO users (name, email, password, role, manager_id, employment_start_date, vacation_days_base)
            VALUES ('Jan Kowalski', 'jan.kowalski@example.com', 'password123', 'Pracownik', 2, '2020-01-01', 26)`);

    db.run(`INSERT INTO users (name, email, password, role, manager_id, employment_start_date, vacation_days_base)
            VALUES ('Anna Nowak', 'anna.nowak@example.com', 'password123', 'Pracownik', 2, '2021-06-01', 20)`);

    db.run(`INSERT INTO users (name, email, password, role, manager_id, employment_start_date, vacation_days_base)
            VALUES ('Piotr Przełożony', 'piotr.szef@example.com', 'password123', 'Przełożony', NULL, '2015-03-01', 26)`);

    db.run(`INSERT INTO users (name, email, password, role, manager_id, employment_start_date, vacation_days_base)
            VALUES ('Halina HR', 'halina.hr@example.com', 'password123', 'HR', NULL, '2010-05-01', 26)`);
  });
}

module.exports = { db, initializeDatabase };