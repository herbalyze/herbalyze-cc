const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  },
  result: {
    type: String,
    enum: ['Success', 'Failed'],
    required: true,
  },
  message: {
    type: String,
  },
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
