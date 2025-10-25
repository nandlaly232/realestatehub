const pool = require('../db');

const getFavorites = async (userId) => {
  const res = await pool.query(
    'SELECT p.* FROM favorites f JOIN properties p ON f.property_id = p.id WHERE f.user_id = $1',
    [userId]
  );
  return res.rows;
};

const toggleFavorite = async (userId, propertyId) => {
  const res = await pool.query(
    'INSERT INTO favorites (user_id, property_id) VALUES ($1, $2) ON CONFLICT (user_id, property_id) DO NOTHING RETURNING *',
    [userId, propertyId]
  );
  if (res.rowCount === 0) {
    await pool.query('DELETE FROM favorites WHERE user_id = $1 AND property_id = $2', [userId, propertyId]);
    return { added: false };
  }
  return { added: true };
};

module.exports = { getFavorites, toggleFavorite };