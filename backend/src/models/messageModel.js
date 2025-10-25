const pool = require('../db');

async function getMessagesForUser(userId) {
  const query = 'SELECT m.*, u.username AS sender_username FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.receiver_id = $1 OR m.sender_id = $1 ORDER BY created_at DESC';
  const res = await pool.query(query, [userId]);
  return res.rows;
}

async function sendMessage(senderId, receiverId, propertyId, message) {
  const query = 'INSERT INTO messages (sender_id, receiver_id, property_id, message) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [senderId, receiverId, propertyId, message];
  const res = await pool.query(query, values);
  return res.rows[0];
}

module.exports = { getMessagesForUser, sendMessage };