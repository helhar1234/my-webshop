const express = require('express');
const router = express.Router();

let cart = [];

router.post('/add', (req, res) => {
    const { productId, quantity } = req.body;
    cart.push({ productId, quantity });
    res.json({ message: "Produkt zum Warenkorb hinzugefügt", cart });
});

router.get('/', (req, res) => {
    res.json(cart);
});

router.delete('/clear', (req, res) => {
    cart = [];
    res.json({ message: "Warenkorb geleert" });
});

module.exports = router;
