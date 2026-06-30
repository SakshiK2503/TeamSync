const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://team-sync-zeta-five.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, server-to-server, health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());

// Make sure we're connected to Mongo before handling any request
// (no-op after the first successful connection — see db.js)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Home Route
app.get("/", (req, res) => {
  res.send("TeamSync Backend Running");
});

module.exports = app;