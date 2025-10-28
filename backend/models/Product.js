const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: String,
    stock: { type: Number, required: true, default: 50 },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
