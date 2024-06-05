const Plant = require('../models/Plant');

exports.getHome = async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching home data', error });
  }
};
