const Plant = require('../models/Plant');

exports.getPlantDetail = async (req, res) => {
  const plantId = req.params.plantId;
  try {
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plant detail', error });
  }
};
