const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// 🛠️ Produkt zum Warenkorb hinzufügen oder Menge erhöhen
const addToCart = async (userId, productId, quantity) => {
  await pool.query(
    `INSERT INTO cart (user_id, product_id, quantity) 
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, product_id) 
         DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity`,
    [userId, productId, quantity]
  );
};

// 🛠️ Warenkorb für einen Benutzer abrufen
// models/cart.js
const getCartByUserId = async (userId) => {
  const result = await pool.query(
    `
        SELECT 
            c.product_id,
            c.quantity,
            p.name AS product_name,
            p.price AS product_price
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = $1
    `,
    [userId]
  );
  return result.rows;
};

// 🛠️ Warenkorb eines Benutzers leeren
const clearCartByUserId = async (userId) => {
  await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);
};

const removeFromCart = async (userId, productId) => {
  await pool.query("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [
    userId,
    productId,
  ]);
};
module.exports = {
  addToCart,
  getCartByUserId,
  clearCartByUserId,
  removeFromCart,
};
