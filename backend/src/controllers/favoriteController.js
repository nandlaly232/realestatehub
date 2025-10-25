const { getFavorites, addFavorite, removeFavorite } = require('../models/favoriteModel');

const getUserFavorites = async (req, res) => {
  try {
    const favorites = await getFavorites(req.user.id);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites', error: err });
  }
};

const addToFavorites = async (req, res) => {
  try {
    await addFavorite(req.user.id, req.params.propertyId);
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding favorite', error: err });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    await removeFavorite(req.user.id, req.params.propertyId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error removing favorite', error: err });
  }
};

module.exports = { getUserFavorites, addToFavorites, removeFromFavorites };