require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// 🛠️ Middleware für Cookies
app.use(cookieParser());

// 🛠️ CORS (Frontend & Cookies erlauben)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Damit Browser die Cookies auch mitschickt
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// 🛠️ Logging für eingehende Anfragen
app.use((req, res, next) => {
    console.log(`📢 Request: ${req.method} ${req.originalUrl}`);
    next();
});

// 🛠️ Routes einbinden
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');
const searchRouter = require('./routes/search');

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/search', searchRouter);

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend läuft auf http://localhost:${PORT}`));
