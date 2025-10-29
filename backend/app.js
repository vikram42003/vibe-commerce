const express = require("express");
const logger = require("./utils/logger");

const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const checkoutRouter = require("./routes/checkoutRoute");

const errorHandler = require("./utils/errorHandler");

const app = express();
app.use(express.json());

// Ideally we should use morgan in prod, but since this is just for assignment I made my own logger middleware
app.use(logger);

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Unknown route" });
});

module.exports = app;
