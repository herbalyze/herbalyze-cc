const express = require('express');
const router = express.Router();
const multer = require('multer');
const predictionController = require('../controllers/predictionController');

const storage = multer.memoryStorage(); // Menggunakan memory storage untuk multer
const upload = multer({ storage: storage }); // Inisialisasi multer dengan storage

router.post('/predict', upload.single('image'), predictionController.predictPlant);

module.exports = router;
