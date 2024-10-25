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
    stock_number TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL
    )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT INTO products (stock_number, name, description, price) VALUES (?,?,?,?)";
          db.run(insert, ["ABCDE12345", "product1", "description1", 1.0]);
          db.run(insert, ["FEGHI67890", "product2", "description2", 2.0]);
        }
      }
    );
  }
});

export default db;
