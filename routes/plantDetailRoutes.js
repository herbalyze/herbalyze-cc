const express = require('express');
const plantDetailController = require('../controllers/plantDetailController');

const router = express.Router();

router.get('/:plantId', plantDetailController.getPlantDetail);

module.exports = router;
