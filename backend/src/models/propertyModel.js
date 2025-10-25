const pool = require('../db');

const getAll = async (filters = {}) => {
  let query = 'SELECT * FROM properties';
  const values = [];
  const cond = [];

  if (filters.location) { cond.push(`location ILIKE $${values.length + 1}`); values.push(`%${filters.location}%`); }
  if (filters.minPrice) { cond.push(`price >= $${values.length + 1}`); values.push(filters.minPrice); }
  if (filters.maxPrice) { cond.push(`price <= $${values.length + 1}`); values.push(filters.maxPrice); }
  if (filters.type) { cond.push(`type = $${values.length + 1}`); values.push(filters.type); }

  if (cond.length) query += ' WHERE ' + cond.join(' AND ');
  const res = await pool.query(query, values);
  return res.rows;
};

const getById = async (id) => {
  const res = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
  return res.rows[0];
};

const create = async (userId, title, desc, loc, price, type, images = []) => {
  const res = await pool.query(
    'INSERT INTO properties (user_id, title, description, location, price, type, images) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [userId, title, desc, loc, price, type, images]
  );
  return res.rows[0];
};

const update = async (id, userId, title, desc, loc, price, type, images) => {
  const existing = await getById(id);
  const allImages = [...(existing.images || []), ...images];
  const res = await pool.query(
    'UPDATE properties SET title=$1, description=$2, location=$3, price=$4, type=$5, images=$6 WHERE id=$7 AND user_id=$8 RETURNING *',
    [title, desc, loc, price, type, allImages, id, userId]
  );
  return res.rows[0];
};

const remove = async (id, userId) => {
  await pool.query('DELETE FROM properties WHERE id = $1 AND user_id = $2', [id, userId]);
};

module.exports = { getAll, getById, create, update, remove };