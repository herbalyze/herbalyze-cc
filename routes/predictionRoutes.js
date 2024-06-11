const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const multer = require('multer');
const upload = multer();

router.post('/predict', upload.single('image'), predictionController.predictPlant);

module.exports = router;
