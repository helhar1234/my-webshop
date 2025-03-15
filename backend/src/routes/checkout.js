const express = require('express');
const { getSessionById } = require('../models/session');
const { addToCart, getCartByUserId, clearCartByUserId, removeFromCart } = require('../models/cart');

const router = express.Router();

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


router.post('/', authenticateSession, async (req, res) => {
    try {
        await clearCartByUserId(req.user.userId);
        console.log("🗑️ User hat eine Bestellung aufgegeben:", req.user.userId);
        res.json({ message: "Checkout erfolgreich" });
    } catch (error) {
        console.error("❌ Fehler beim checkout:", error);
        res.status(500).json({ error: "Fehler beim checkout" });
    }
});

module.exports = router;
