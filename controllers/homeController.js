const Plant = require('../models/Plant');

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({}, '_id name imageUrl description');
    res.status(200).json(plants);
  } catch (error) {
    console.error('Error getting plants:', error);
    res.status(500).json({ error: 'Failed to get plants' });
  }
};

module.exports = {
  getPlants,
};
