const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  shortDescription: { type: String, required: true },
  benefits: { type: [String], required: true },
  usage: { type: String, required: true }
});

module.exports = mongoose.model('Plant', plantSchema);
