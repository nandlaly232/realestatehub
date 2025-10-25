const { getFavorites, toggleFavorite } = require('../models/favoriteModel');

const getUserFavorites = async (req, res) => res.json(await getFavorites(req.user.id));

const toggle = async (req, res) => {
  const { added } = await toggleFavorite(req.user.id, req.params.id);
  res.json({ added });
};

module.exports = { getUserFavorites, toggle };