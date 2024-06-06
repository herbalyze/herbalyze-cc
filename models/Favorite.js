const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
