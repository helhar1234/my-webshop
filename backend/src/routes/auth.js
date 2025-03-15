const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Für die Session-ID
const { getUserByUsername, createUser } = require('../models/user');
const { saveSession, deleteSessionById, getSessionById } = require('../models/session');

const router = express.Router();

// 🛠️ Registrierung
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        await createUser(username, password);
        res.status(201).json({ message: "Benutzer erfolgreich registriert" });
    } catch (error) {
        console.error("❌ Fehler bei der Registrierung:", error);
        res.status(500).json({ error: "Fehler beim Erstellen des Benutzers" });
    }
});

// 🛠️ Login (Session wird in der DB gespeichert)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`🔑 Login-Versuch für Benutzer: ${username}`);

    try {
        const user = await getUserByUsername(username);
        if (!user) return res.status(401).json({ error: 'Benutzer nicht gefunden' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Falsches Passwort' });

        // 🔹 Generiere eine Session-ID, falls req.sessionID nicht existiert
        const sessionId = req.sessionID || crypto.randomUUID();
        const sessionData = { userId: user.id, username: user.username };
        const expireAt = new Date(Date.now() + 1000 * 60 * 60); // Ablaufzeit in 1 Stunde

        await saveSession(sessionId, sessionData, expireAt);

        res.cookie("user_sid", sessionId, {
            httpOnly: true,
            secure: false, // Falls HTTPS verwendet wird, auf `true` setzen
            maxAge: 1000 * 60 * 60 // 1 Stunde gültig
        });

        console.log(`✅ Login erfolgreich: ${username}`);
        res.json({ message: 'Login erfolgreich', user: sessionData });

    } catch (error) {
        console.error("❌ Fehler beim Login:", error);
        res.status(500).json({ error: "Fehler beim Login" });
    }
});

// 🛠️ Logout (Session in der DB löschen)
router.post('/logout', async (req, res) => {
    try {
        const sessionId = req.cookies.user_sid;
        if (!sessionId) {
            return res.status(400).json({ error: "Keine aktive Session gefunden" });
        }

        await deleteSessionById(sessionId);
        res.clearCookie("user_sid"); // Session-Cookie löschen

        console.log("✅ Logout erfolgreich");
        res.json({ message: "Logout erfolgreich" });
    } catch (error) {
        console.error("❌ Fehler beim Logout:", error);
        res.status(500).json({ error: "Fehler beim Logout" });
    }
});

// Neue Route für "Profile" (aktuellen User abrufen)
router.get('/profile', async (req, res) => {
    try {
        // Cookie auslesen
        const sessionId = req.cookies.user_sid;
        if (!sessionId) {
            return res.status(401).json({ error: 'Keine Session-ID im Cookie gefunden' });
        }

        // Session aus der Datenbank holen
        const sessionData = await getSessionById(sessionId);
        if (!sessionData) {
            return res.status(401).json({ error: 'Session nicht (mehr) gültig oder abgelaufen' });
        }

        // Sessiondaten sind das, was ihr beim Login gespeichert habt,
        // z.B. { userId, username }. Falls ihr die Spalte in der DB
        // als JSON speichert, könnt ihr direkt zurückgeben:
        res.json({
            username: sessionData.username,
            userId: sessionData.userId,
            // weitere Felder...
        });
    } catch (error) {
        console.error("❌ Fehler beim Laden des Profils:", error);
        res.status(500).json({ error: "Fehler beim Laden des Profils" });
    }
});


module.exports = router;
