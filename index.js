import express from "express";
import db from "./database/database.js"; // Import the database connection
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
