const Favorite = require('../models/Favorite');
const Plant = require('../models/Plant');

const getFavoritesByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const favorites = await Favorite.find({ userId: id }).populate('plantId', '_id name imageUrl description');
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error getting favorites by user ID:', error);
    res.status(500).json({ error: 'Failed to get favorites' });
  }
};

const addFavorite = async (req, res) => {
  const { userId, plantId } = req.body;
  try {
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found in the list of plants' });
    }

    const existingFavorite = await Favorite.findOne({ userId, plantId });
    if (existingFavorite) {
      return res.status(400).json({ error: 'Plant already in favorites!' });
    }

    const newFavorite = new Favorite({ userId, plantId });
    const savedFavorite = await newFavorite.save();

    res.status(200).json(savedFavorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

const removeFavorite = async (req, res) => {
  const { userId, plantId } = req.body;
  try {
    const deletedFavorite = await Favorite.findOneAndDelete({ userId, plantId });
    if (!deletedFavorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.status(200).json({ message: 'Favorite successfully removed' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

module.exports = {
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
};
