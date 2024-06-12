const tf = require('@tensorflow/tfjs-node');
require('dotenv').config();

const loadModel = async () => {
  const MODEL_URL = process.env.MODEL_URL;

  try {
    console.log(`Attempting to load model from: ${MODEL_URL}`);
    const model = await tf.loadLayersModel(MODEL_URL);
    console.log('Model loaded successfully');
    // console.log(model.summary());
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
};

module.exports = loadModel;
