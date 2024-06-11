const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
  