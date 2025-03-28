const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Bitte einen Suchbegriff angeben." });
  }

  try {
    console.log(`🔍 Suche nach: ${query}`);

    const result = await pool.query(
      `SELECT * FROM products WHERE LOWER(name) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)`,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Fehler bei der Produktsuche:", error.message);
    res.status(500).json({ error: "Fehler bei der Produktsuche" });
  }
});

module.exports = router;
