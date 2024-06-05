const express = require('express');
const predictionController = require('../controllers/predictionController');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/', upload.single('image'), predictionController.predictPlant);

module.exports = router;
