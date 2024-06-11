const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

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
    type: String,
    default: '',
  },
  usage: {
    type: String,
    default: '',
  },
  recipes: [recipeSchema],
});

const Plant = mongoose.model('Plant', PlantSchema);

module.exports = Plant;
