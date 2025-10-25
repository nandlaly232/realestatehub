const { getAll, getById, create, update, remove } = require('../models/propertyModel');

const buildUrls = (files) => files.map(f => `/uploads/${f.filename}`);

const getProperties = async (req, res) => {
  const data = await getAll(req.query);
  res.json(data);
};

const getProperty = async (req, res) => {
  const data = await getById(req.params.id);
  if (!data) return res.status(404).json({ message: 'Not found' });
  res.json(data);
};

const createProperty = async (req, res) => {
  const { title, description, location, price, type } = req.body;
  const images = req.files ? buildUrls(req.files) : [];
  const data = await create(req.user.id, title, description, location, price, type, images);
  res.status(201).json(data);
};

const updateProperty = async (req, res) => {
  const { title, description, location, price, type } = req.body;
  const images = req.files ? buildUrls(req.files) : [];
  const data = await update(req.params.id, req.user.id, title, description, location, price, type, images);
  if (!data) return res.status(404).json({ message: 'Not found' });
  res.json(data);
};

const deleteProperty = async (req, res) => {
  await remove(req.params.id, req.user.id);
  res.status(204).send();
};

module.exports = { getProperties, getProperty, createProperty, updateProperty, deleteProperty };