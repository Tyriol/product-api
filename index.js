import express from "express";
import cors from "cors";

import {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
} from "./utils/helpers.js";

const app = express();
const PORT = 3001;

app.use(cors());

// middleware to parse incoming data
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// fetch all products from the database
app.get("/api/products", getAllProducts);

// fetch a single product by stock number
app.get("/api/products/:stock_number", getOneProduct);

// add a new products to the database
app.post("/api/products", addProduct);

// update an existing product
app.patch("/api/products/:stock_number", updateProduct);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
