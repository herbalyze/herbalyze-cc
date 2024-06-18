const Plant = require('../models/Plant');

const getPlantById = async (req, res) => {
  const { id } = req.params;
  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(200).json({
      name: plant.name,
      imageUrl: plant.imageUrl,
      description: plant.description,
      benefits: plant.benefits,  // Memperbaiki di sini untuk menampilkan benefits
      usage: plant.usage,
      recipeName: plant.recipeName,
      recipeGuide: plant.recipeGuide,
    });
  } catch (error) {
    console.error('Error getting plant by ID:', error);
    res.status(500).json({ error: 'Failed to get plant' });
  }
};

module.exports = {
  getPlantById,
};
