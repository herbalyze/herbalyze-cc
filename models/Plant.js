const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: {
    type: [String],
    default: [],
  },
  usage: {
    type: String,
    default: '',
  },
  recipeName: {
    type: String,
    default: '',
  },
  recipeGuide: {
    type: String,
    default: '',
  },
});

const Plant = mongoose.model('Plant', PlantSchema);

module.exports = Plant;
