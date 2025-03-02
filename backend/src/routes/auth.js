const express = require('express');
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await createUser(username, password);
        res.status(201).json({ message: "Benutzer erfolgreich registriert" });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Erstellen des Benutzers" });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) return res.status(401).json({ error: "Benutzer nicht gefunden" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: "Falsches Passwort" });

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Fehler beim Login" });
    }
});

module.exports = router;
