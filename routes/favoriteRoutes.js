const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.get('/favorites/:userId', favoriteController.getFavorites);
router.post('/favorites', favoriteController.addFavorite);
router.delete('/favorites', favoriteController.removeFavorite);

module.exports = router;
