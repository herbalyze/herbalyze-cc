const express = require('express');
const router = express.Router();
const plantDetailController = require('../controllers/plantDetailController');

router.get('/plant/:id', plantDetailController.getPlantDetail);

module.exports = router;
