import express from "express";
import db from "./database/database.js"; // Import the database connection
const app = express();
const PORT = 3000;

// middleware to parse incoming data
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// fetch all products from the database
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "success",
      payload: rows,
    });
  });
});

// fetch a single product by stock number
app.get("/api/products/:stock_number", (req, res) => {
  const sql = "SELECT * FROM products WHERE stock_number = ?";
  const params = [req.params.stock_number];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "success",
      payload: row,
    });
  });
});

// add a new products to the database
app.post("/api/products", (req, res) => {
  const errors = [];
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (!req.body.price) {
    errors.push("No price specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  const sql = "INSERT INTO products (name, description, price) VALUES (?,?,?)";
  const params = [data.name, data.description, data.price];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: "success",
      payload: data,
      changes: this.changes,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
