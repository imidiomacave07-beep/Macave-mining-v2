const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", (_req, res) => res.status(200).json({ status: "ok" }));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// The entry point intentionally mounts only routes confirmed to exist in this repository.
app.use("/deposit", require("./routes/deposit.js"));
app.use("/contact", require("./routes/contact.routes.js"));

app.use((err, _req, res, _next) => {
  console.error("Request error:", err.message);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = Number(process.env.PORT) || 3000;
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => console.log(`Macave Mining server listening on port ${PORT}`));
}
module.exports = app;
