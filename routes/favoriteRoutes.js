const express = require('express');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.get('/:userId', favoriteController.getFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:userId/:plantId', favoriteController.removeFavorite);

module.exports = router;
