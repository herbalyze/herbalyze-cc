const Favorite = require('../models/Favorite');
const Plant = require('../models/Plant');

exports.getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId }).populate('plantId', 'name imageUrl shortDescription');
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve favorites' });
  }
};

exports.addFavorite = async (req, res) => {
  const { userId, plantId } = req.body;

  try {
    const existingFavorite = await Favorite.findOne({ userId, plantId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Plant already in favorites' });
    }

    const favorite = new Favorite({ userId, plantId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add favorite' });
  }
};

exports.removeFavorite = async (req, res) => {
  const { userId, plantId } = req.body;

  try {
    const favorite = await Favorite.findOneAndDelete({ userId, plantId });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
};
