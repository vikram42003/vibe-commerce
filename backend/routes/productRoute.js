const express = require("express");
const productRouter = express.Router();
const Product = require("../models/Product");

// GET /api/products - get all products
productRouter.get("/", async (req, res) => {
  try {
    res.json(await Product.find({}));
  } catch (e) {
    const error = new Error("Server error while fetching products");
    error.status = 500;
    error.error = e;

    throw error;
  }
});

module.exports = productRouter;
