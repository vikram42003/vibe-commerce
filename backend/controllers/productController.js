const Product = require("../models/Product");

const getAllProducts = async () => {
  return Product.find();
}