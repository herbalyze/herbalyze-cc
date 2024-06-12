const Prediction = require('../models/Prediction');
const loadModel = require('../services/loadModel');
const inferenceService = require('../services/inferenceService');
const Plant = require('../models/Plant');
const uploadFileToGCS = require('../middleware/upload');
const fs = require('fs');
const path = require('path'); // Pastikan ini diimpor

const bucketName = process.env.BUCKET_NAME;
let model;

loadModel()
  .then((loadedModel) => {
    model = loadedModel;
  })
  .catch((err) => {
    console.error('Error loading model:', err);
  });

const predictPlant = async (req, res) => {
  try {
    // Cek apakah file disertakan
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang disertakan' });
    }

    // Cek apakah file adalah gambar dengan ekstensi yang valid
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return res.status(400).json({ error: 'File bukan gambar JPG/JPEG/PNG' });
    }

    const fileBuffer = req.file.buffer;

    try {
      const gcsFile = await uploadFileToGCS(fileBuffer, req.file.originalname);
      const gcsUrl = `https://storage.googleapis.com/${bucketName}/${gcsFile}`;

      const predictionResult = await inferenceService(model, fileBuffer);

      console.log('Predicted Index:', predictionResult.predictedIndex);
      console.log('Predicted Plant Name:', getPlantNameFromIndex(predictionResult.predictedIndex));
      console.log('Prediction Score:', predictionResult.predictionScore);

      const plantName = getPlantNameFromIndex(predictionResult.predictedIndex);
      const predictionScore = predictionResult.predictionScore;

      const predictedPlant = await Plant.findOne({ name: plantName });

      if (!predictedPlant) {
        return res.status(404).json({ error: `No matching plant found for: ${plantName}` });
      }

      const newPrediction = new Prediction({
        userId: req.body.userId,
        name: predictedPlant.name,
        imageUrl: gcsUrl,
        description: predictedPlant.description,
      });

      const savedPrediction = await newPrediction.save();

      res.status(200).json({
        _id: savedPrediction._id,
        name: savedPrediction.name,
        imageUrl: savedPrediction.imageUrl,
        description: savedPrediction.description,
        createdAt: savedPrediction.createdAt,
        predictionScore: predictionScore,
      });
    } catch (error) {
      console.error('Error uploading file to GCS:', error.message);
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error predicting plant:', error);
    res.status(500).json({ error: 'Failed to predict plant' });
  }
};

function getPlantNameFromIndex(index) {
  switch (index) {
    case 0:
      return 'Daun Kemangi (Ocimum basilicum)';
    case 1:
      return 'Jahe (Zingiber officinale Roxb)';
    case 2:
      return 'Jambu Biji (Psidium guajava L)';
    case 3:
      return 'Lidah Buaya (Aloe vera L)';
    case 4:
      return 'Mentimun (Cucumis sativus L.)';
    case 5:
      return 'Seledri (Apium graveolens L)';
    default:
      return null;
  }
}

module.exports = {
  predictPlant,
};
