const { Storage } = require('@google-cloud/storage');
const Plant = require('../models/Plant');
const Prediction = require('../models/Prediction');
const path = require('path');

const storage = new Storage({ keyFilename: path.join(__dirname, '../config/serviceAccountKey.json') });
const bucketName = 'herbalyze-users-image';
const modelBucketName = 'herbalyze-ml-model-deployment';

exports.predictPlant = async (req, res) => {
  const { userId, image } = req.body;

  const fileName = `${Date.now()}-${image.originalname}`;
  const file = storage.bucket(bucketName).file(fileName);
  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype
    }
  });

  stream.on('error', (err) => {
    return res.status(500).json({ message: 'Image upload failed' });
  });

  stream.on('finish', async () => {
    const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    const predictedLabel = await predictLabel(imageUrl, modelBucketName);

    const prediction = new Prediction({ userId, imageUrl, predictedLabel });
    await prediction.save();

    const plant = await Plant.findOne({ name: predictedLabel });

    res.status(200).json({ plant });
  });

  stream.end(image.buffer);
};
