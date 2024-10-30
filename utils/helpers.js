import db from "../database/database.js"; // Import the database connection

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
  const errors = [];
  // Check that that stock numnber is alphanumeric and always 10 characters long
  const alphanumericRegex = new RegExp(/^[a-z0-9]{10}$/i);
  let isValidStockNumber = alphanumericRegex.test(req.body.stockNumber);
  if (!isValidStockNumber) {
    errors.push(
      "Stock number is not AlphaNumeric or it's not 10 characters exactly"
    );
  }
  if (!req.body.stockNumber) {
    errors.push("No stock number specified");
  }
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (!req.body.description) {
    errors.push("No description specified");
  }
  if (!req.body.price) {
    errors.push("No price specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

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
      payload: data,
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
