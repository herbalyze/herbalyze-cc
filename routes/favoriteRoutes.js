const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.get('/favorites/:id', favoriteController.getFavoritesByUserId);
router.post('/favorite', favoriteController.addFavorite);
router.delete('/favorite', favoriteController.removeFavorite);

module.exports = router;
