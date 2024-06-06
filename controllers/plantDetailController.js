const Plant = require('../models/Plant');

exports.getPlantDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve plant details' });
  }
};
