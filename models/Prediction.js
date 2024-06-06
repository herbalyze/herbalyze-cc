const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  predictedLabel: { type: String, required: true }
});

module.exports = mongoose.model('Prediction', predictionSchema);
