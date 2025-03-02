const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();

// PostgreSQL-Verbindung
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Produkte abrufen
router.get('/', async (req, res) => {
    try {
        console.log("🔄 Verbindung zur Datenbank...");
        const result = await pool.query('SELECT * FROM products');
        console.log("✅ Produkte erfolgreich geladen:", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Fehler beim Abrufen der Produkte:", error.message);
        res.status(500).json({ error: "Fehler beim Abrufen der Produkte" });
    }
});

module.exports = router;
