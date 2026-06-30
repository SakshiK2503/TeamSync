const app = require("./app");

// Local dev entry point only — Vercel doesn't run this file, it imports
// app.js directly via api/index.js and manages the listening itself.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});