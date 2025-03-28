const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const getSessionById = async (sid) => {
  const result = await pool.query(
    "SELECT sess, expire FROM session WHERE sid = $1",
    [sid]
  );
  if (result.rows.length === 0) {
    return null;
  }

  const { sess, expire } = result.rows[0];
  if (new Date(expire) < new Date()) {
    await pool.query("DELETE FROM session WHERE sid = $1", [sid]);
    return null;
  }

  return sess;
};

const saveSession = async (sid, sessionData, expireAt) => {
  await pool.query(
    `INSERT INTO session (sid, sess, expire) 
         VALUES ($1, $2, $3)
         ON CONFLICT (sid) 
         DO UPDATE SET sess = EXCLUDED.sess, expire = EXCLUDED.expire`,
    [sid, sessionData, expireAt]
  );
};

const deleteSessionById = async (sid) => {
  await pool.query("DELETE FROM session WHERE sid = $1", [sid]);
};

module.exports = { getSessionById, saveSession, deleteSessionById };
