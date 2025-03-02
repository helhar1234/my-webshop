const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.cart || req.body.cart.length === 0) {
        return res.status(400).json({ error: "Warenkorb ist leer" });
    }
    res.json({ message: "Checkout erfolgreich", orderDetails: req.body.cart });
});

module.exports = router;
