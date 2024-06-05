const { Storage } = require('@google-cloud/storage');
const Prediction = require('../models/Prediction');

const storage = new Storage();
const bucketName = 'herbalyze-users-image';

exports.predictPlant = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { originalname, buffer } = req.file;
  const fileName = `uploads/${Date.now()}-${originalname}`;

  const file = storage.bucket(bucketName).file(fileName);

  try {
    await file.save(buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    
    // Inferensi dengan imageUrl
    const predictionResult = {
      plantName: '',
      description: '',
      imageUrl,
    };

    const prediction = new Prediction({
      userId: req.body.userId,
      imageUrl,
      result: predictionResult,
    });

    await prediction.save();

    res.status(200).json(predictionResult);
  } catch (error) {
    res.status(500).json({ message: 'Error predicting plant', error });
  }
};
