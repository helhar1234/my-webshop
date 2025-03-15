const express = require('express');
const { getSessionById } = require('../models/session');
const { addToCart, getCartByUserId, clearCartByUserId, removeFromCart } = require('../models/cart');

const router = express.Router();

// 🛠️ Middleware zum Authentifizieren der Session aus der DB
const authenticateSession = async (req, res, next) => {
    try {
        const sessionId = req.cookies.user_sid;
        if (!sessionId) {
            return res.status(401).json({ error: "Nicht eingeloggt" });
        }

        const session = await getSessionById(sessionId);
        if (!session) {
            return res.status(401).json({ error: "Session abgelaufen oder ungültig" });
        }

        req.user = session; // Speichere den User aus der DB-Session für nachfolgende Requests
        next();
    } catch (error) {
        console.error("❌ Fehler beim Authentifizieren der Session:", error);
        res.status(500).json({ error: "Fehler beim Authentifizieren der Session" });
    }
};

// 🛠️ Produkt in den Warenkorb legen
router.post('/add', authenticateSession, async (req, res) => {
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

// 🛠️ Warenkorb abrufen
router.get('/', authenticateSession, async (req, res) => {
    try {
        const cartItems = await getCartByUserId(req.user.userId);
        console.log("🛒 Warenkorb abrufen:", cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error("❌ Fehler beim Abrufen des Warenkorbs:", error);
        res.status(500).json({ error: "Fehler beim Abrufen des Warenkorbs" });
    }
});


// 🛠️ Warenkorb leeren
router.delete('/clear', authenticateSession, async (req, res) => {
    try {
        await clearCartByUserId(req.user.userId);
        console.log("🗑️ Warenkorb geleert für Benutzer:", req.user.userId);
        res.json({ message: "Warenkorb geleert" });
    } catch (error) {
        console.error("❌ Fehler beim Leeren des Warenkorbs:", error);
        res.status(500).json({ error: "Fehler beim Leeren des Warenkorbs" });
    }
});

router.delete('/remove/:productId', authenticateSession, async (req, res) => {
    const { productId } = req.params; // aus der URL
    try {
        // Hier das Produkt mit passendem userId und productId entfernen
        await removeFromCart(req.user.userId, productId);
        console.log(`❌ Produkt ${productId} wurde aus dem Warenkorb entfernt`);
        res.json({ message: "Produkt entfernt" });
    } catch (error) {
        console.error("❌ Fehler beim Entfernen des Produkts:", error);
        res.status(500).json({ error: "Fehler beim Entfernen des Produkts" });
    }
});

module.exports = router;
