const mongoose = require("mongoose");

// Cache the connection across serverless invocations (Vercel reuses warm
// function instances, so without this we'd open a new Mongo connection on
// every request and quickly exhaust the connection pool).
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    console.error("FATAL: MONGO_URI environment variable is not set. Set it in your hosting provider's dashboard (e.g. Vercel > Project Settings > Environment Variables).");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
}

module.exports = connectDB;