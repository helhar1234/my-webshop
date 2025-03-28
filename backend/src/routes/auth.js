const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser } = require("../models/user");

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

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    await createUser(username, password);
    res.status(201).json({ message: "Benutzer erfolgreich registriert" });
  } catch (error) {
    console.error("❌ Fehler bei der Registrierung:", error);
    res.status(500).json({ error: "Fehler beim Erstellen des Benutzers" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user)
      return res.status(401).json({ error: "Benutzer nicht gefunden" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Falsches Passwort" });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login erfolgreich", token });
  } catch (error) {
    console.error("❌ Fehler beim Login:", error);
    res.status(500).json({ error: "Fehler beim Login" });
  }
});

router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    username: req.user.username,
    userId: req.user.userId,
  });
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout erfolgreich (Token clientseitig löschen)" });
});

module.exports = router;
