const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/plants', homeController.getAllPlants);

module.exports = router;
