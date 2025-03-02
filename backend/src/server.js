require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
