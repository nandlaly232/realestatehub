const pool = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const res = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
    [username, email, hash]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

module.exports = { createUser, findUserByEmail };