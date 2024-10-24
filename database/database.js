import sqlite3 from "sqlite3";

const DBSOURCE = "./database/db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Can't open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE products (
    stock_number INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
    )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT INTO products (name, description, price) VALUES (?,?,?)";
          db.run(insert, ["product1", "description1", 1.00]);
          db.run(insert, ["product2", "description2", 2.00]);
        }
      }
    );
  }
});

export default db;
