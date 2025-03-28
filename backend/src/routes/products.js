const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const router = express.Router();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

router.get("/", async (req, res) => {
  try {
    console.log("🔄 Verbindung zur Datenbank...");
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Produkte:", error.message);
    res.status(500).json({ error: "Fehler beim Abrufen der Produkte" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produkt nicht gefunden" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fehler beim Abrufen des Produkts:", error);
    res.status(500).json({ error: "Fehler beim Abrufen des Produkts" });
  }
});

module.exports = router;
