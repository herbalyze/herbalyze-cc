const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const predictionController = require('../controllers/predictionController');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error('File bukan gambar JPG/JPEG/PNG'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 4 * 1024 * 1024 },
});

router.post('/predict', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, predictionController.predictPlant);

module.exports = router;
