const Prediction = require('../models/Prediction');
const { loadModel, inferenceService } = require('../services/inferenceService');
const Plant = require('../models/Plant');
const uploadFileToGCS = require('../middleware/upload');

let model;
loadModel().then(loadedModel => {
  model = loadedModel;
}).catch(err => {
  console.error('Error loading model:', err);
});

const predictPlant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size exceeds 5MB limit' });
    }

    const fileBuffer = req.file.buffer;

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const contentType = req.file.mimetype;
    if (!allowedMimeTypes.includes(contentType)) {
      return res.status(400).json({ error: 'File is not an image (JPEG, PNG, GIF)' });
    }

    const gcsFile = await uploadFileToGCS(fileBuffer, req.file.originalname);
    const gcsUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${gcsFile.name}`;
    
    const predictionResult = await inferenceService(model, fileBuffer);

    const predictedPlant = await Plant.findOne({ name: predictionResult });

    if (!predictedPlant) {
      return res.status(404).json({ error: 'No matching plant found' });
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
    });
  } catch (error) {
    console.error('Error predicting plant:', error);
    res.status(500).json({ error: 'Failed to predict plant' });
  }
};

module.exports = {
  predictPlant,
};
