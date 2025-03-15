const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// 🛠️ Session abrufen
const getSessionById = async (sid) => {
    const result = await pool.query('SELECT sess, expire FROM session WHERE sid = $1', [sid]);
    if (result.rows.length === 0) {
        return null;
    }

    const { sess, expire } = result.rows[0];
    // Prüfen, ob abgelaufen
    if (new Date(expire) < new Date()) {
        // Session ist abgelaufen -> aus DB löschen
        await pool.query('DELETE FROM session WHERE sid = $1', [sid]);
        return null;
    }

    return sess; // oder JSON.parse(sess), wenn du es als Text speicherst
};


// 🛠️ Session speichern oder aktualisieren
const saveSession = async (sid, sessionData, expireAt) => {
    await pool.query(
        `INSERT INTO session (sid, sess, expire) 
         VALUES ($1, $2, $3)
         ON CONFLICT (sid) 
         DO UPDATE SET sess = EXCLUDED.sess, expire = EXCLUDED.expire`,
        [sid, sessionData, expireAt]
    );
};

// 🛠️ Session löschen
const deleteSessionById = async (sid) => {
    await pool.query('DELETE FROM session WHERE sid = $1', [sid]);
};

module.exports = { getSessionById, saveSession, deleteSessionById };
