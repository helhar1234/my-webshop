require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// 🛠️ Middleware für Cookies
app.use(cookieParser());

// 🛠️ CORS (Frontend & Cookies erlauben)
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  "https://webshop-frontend-adaptive.onrender.com",
  "https://webshop-frontend-responsive.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Wenn kein Origin (z. B. bei Server-zu-Server) → erlauben
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((o) => {
        return typeof o === "string" ? o === origin : o.test(origin);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS policy does not allow this origin: " + origin)
        );
      }
    },
    credentials: true, // Damit Browser die Cookies auch mitschickt
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.set('trust proxy', true)

app.use(express.json());

// 🛠️ Logging für eingehende Anfragen
app.use((req, res, next) => {
  console.log(`📢 Request: ${req.method} ${req.originalUrl}`);
  next();
});

// 🛠️ Routes einbinden
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
