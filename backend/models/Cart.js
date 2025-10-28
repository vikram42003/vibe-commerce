const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  userId: { type: String, default: "mock_user" },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
