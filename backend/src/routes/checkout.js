const express = require("express");
const jwt = require("jsonwebtoken");
const { clearCartByUserId } = require("../models/cart");

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Kein Token gesendet" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token ungültig" });
    req.user = user;
    next();
  });
};

router.post("/", authenticateToken, async (req, res) => {
  try {
    await clearCartByUserId(req.user.userId);
    console.log("🛒 Bestellung abgeschlossen für Benutzer:", req.user.userId);
    res.json({ message: "Checkout erfolgreich" });
  } catch (error) {
    console.error("❌ Fehler beim Checkout:", error);
    res.status(500).json({ error: "Fehler beim Checkout" });
  }
});

module.exports = router;
