const Plant = require('../models/Plant');

exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find({}, 'name imageUrl shortDescription');
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve plants' });
  }
};
