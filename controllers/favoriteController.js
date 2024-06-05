const Favorite = require('../models/Favorite');

exports.getFavorites = async (req, res) => {
  const userId = req.params.userId;
  try {
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

exports.addFavorite = async (req, res) => {
  const { userId, plantId } = req.body;
  try {
    const favorite = new Favorite({ userId, plantId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorite', error });
  }
};

exports.removeFavorite = async (req, res) => {
  const { userId, plantId } = req.params;
  try {
    await Favorite.findOneAndDelete({ userId, plantId });
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite', error });
  }
};
