const express = require("express");
const jwt = require("jsonwebtoken");
const {
  addToCart,
  getCartByUserId,
  clearCartByUserId,
  removeFromCart,
} = require("../models/cart");

const router = express.Router();

// 🔐 Middleware: Token prüfen
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Kein Token gesendet" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token ungültig" });
    req.user = user; // z.B. { userId, username }
    next();
  });
};

// 🛒 Produkt in den Warenkorb legen
router.post("/add", authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    await addToCart(req.user.userId, productId, quantity);
    console.log("🛒 Produkt in den Warenkorb gelegt:", productId);
    res.json({ message: "Produkt zum Warenkorb hinzugefügt" });
  } catch (error) {
    console.error("❌ Fehler beim Speichern des Warenkorbs:", error);
    res.status(500).json({ error: "Fehler beim Speichern des Warenkorbs" });
  }
});

// 🛒 Warenkorb abrufen
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cartItems = await getCartByUserId(req.user.userId);
    console.log("🛒 Warenkorb abrufen:", cartItems);
    res.json(cartItems);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen des Warenkorbs:", error);
    res.status(500).json({ error: "Fehler beim Abrufen des Warenkorbs" });
  }
});

// 🗑️ Warenkorb leeren
router.delete("/clear", authenticateToken, async (req, res) => {
  try {
    await clearCartByUserId(req.user.userId);
    console.log("🗑️ Warenkorb geleert für Benutzer:", req.user.userId);
    res.json({ message: "Warenkorb geleert" });
  } catch (error) {
    console.error("❌ Fehler beim Leeren des Warenkorbs:", error);
    res.status(500).json({ error: "Fehler beim Leeren des Warenkorbs" });
  }
});

// ❌ Einzelnes Produkt entfernen
router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;
  try {
    await removeFromCart(req.user.userId, productId);
    console.log(`❌ Produkt ${productId} wurde aus dem Warenkorb entfernt`);
    res.json({ message: "Produkt entfernt" });
  } catch (error) {
    console.error("❌ Fehler beim Entfernen des Produkts:", error);
    res.status(500).json({ error: "Fehler beim Entfernen des Produkts" });
  }
});

module.exports = router;
