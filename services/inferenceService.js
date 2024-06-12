const tf = require('@tensorflow/tfjs-node');
const loadModel = require('./loadModel');

const inferenceService = async (model, imageData) => {
  const imageTensor = tf.node.decodeImage(Buffer.from(imageData, 'base64'));
  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
  const expandedImage = resizedImage.expandDims(0);
  const prediction = model.predict(expandedImage);
  const predictionData = await prediction.data();
  const predictedIndex = tf.argMax(predictionData).dataSync()[0];
  return {
    predictedIndex,
    predictionScore: predictionData[predictedIndex],
  };
};

module.exports = inferenceService;
