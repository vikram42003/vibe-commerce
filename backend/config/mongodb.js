const mongoose = require("mongoose");
const config = require("../utils/env");

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const closeDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectDB, closeDB };
