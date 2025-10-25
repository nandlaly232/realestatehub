const pool = require('../db');

async function getFavorites(userId) {
  const query = 'SELECT p.* FROM favorites f JOIN properties p ON f.property_id = p.id WHERE f.user_id = $1';
  const res = await pool.query(query, [userId]);
  return res.rows;
}

async function addFavorite(userId, propertyId) {
  const query = 'INSERT INTO favorites (user_id, property_id) VALUES ($1, $2) ON CONFLICT DO NOTHING';
  await pool.query(query, [userId, propertyId]);
}

async function removeFavorite(userId, propertyId) {
  const query = 'DELETE FROM favorites WHERE user_id = $1 AND property_id = $2';
  await pool.query(query, [userId, propertyId]);
}

module.exports = { getFavorites, addFavorite, removeFavorite };