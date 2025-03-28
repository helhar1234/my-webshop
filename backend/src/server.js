require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  "https://webshop-frontend-adaptive.onrender.com",
  "https://webshop-frontend-responsive.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin)
      );
      isAllowed
        ? callback(null, true)
        : callback(new Error("CORS policy does not allow origin: " + origin));
    },
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`📢 Request: ${req.method} ${req.originalUrl}`);
  next();
});

const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const searchRouter = require("./routes/search");

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/search", searchRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend läuft auf http://0.0.0.0:${PORT}`);
});
