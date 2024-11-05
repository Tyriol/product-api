import db from "../database/database.js"; // Import the database connection
import { validateFormInputs } from "./validate-form-inputs.js";

// GET all
export const getAllProducts = async (req, res) => {
  const sql = "SELECT * FROM products";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      rows,
    });
  });
};

// GET one
export const getOneProduct = async (req, res) => {
  const sql = "SELECT * FROM products WHERE stock_number = ?";
  const params = [req.params.stock_number];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      payload: row,
    });
  });
};

// POST new product
export const addProduct = async (req, res) => {
  // validate request info fulfills the requirements
  const errors = validateFormInputs(req);
  if (errors) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }
  // gather data to add to db
  const data = {
    stock_number: req.body.stockNumber,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  const sql =
    "INSERT INTO products (stock_number, name, description, price) VALUES (?,?,?,?)";
  const params = [data.stock_number, data.name, data.description, data.price];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({
      data,
    });
  });
};

// PATCH update product
export const updateProduct = async (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  db.run(
    `UPDATE products set 
             name = COALESCE(?,name), 
             description = COALESCE(?,description), 
             price = COALESCE(?,price) 
             WHERE stock_number = ?`,
    [data.name, data.description, data.price, req.params.stock_number],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.status(200).json({
        payload: data,
      });
    }
  );
};
