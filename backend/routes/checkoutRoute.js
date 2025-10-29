const express = require("express");
const CartItem = require("../models/Cart");
const Product = require("../models/Product");

const checkoutRouter = express.Router();

// POST /api/checkout - Process checkout
checkoutRouter.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const cartItems = await CartItem.find({ userId: "mock_user" }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Make sure we have enough stock of items for checkout
    for (const item of cartItems) {
      if (item.quantity > item.productId.stock) {
        return res.status(400).json({
          message: `${item.productId.name} only has ${item.productId.stock} in stock`,
        });
      }
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    // Update the stock of each item
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } });
    }

    const receipt = {
      orderId: Math.floor(Math.random() * 1000000).toString(),
      customerName: name,
      customerEmail: email,
      items: cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        subtotal: (item.productId.price * item.quantity).toFixed(2),
      })),
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      status: "completed",
    };

    // Clear cart after checkout
    await CartItem.deleteMany({ userId: "mock_user" });

    res.json({
      message: "Checkout successful",
      receipt,
    });
  } catch (e) {
    const error = new Error("Server error while checking out items");
    error.status = 500;
    error.error = e;

    throw error;
  }
});

module.exports = checkoutRouter;
