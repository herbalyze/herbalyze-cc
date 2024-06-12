const tf = require('@tensorflow/tfjs-node');
const loadModel = require('./loadModel');

const inferenceService = async (model, imageData) => {
  try {
    let tensor = tf.node.decodeImage(imageData, 3);

    tensor = tf.image.resizeBilinear(tensor, [224, 224]);
    tensor = tensor.div(255.0);
    tensor = tensor.expandDims(0);

    const prediction = model.predict(tensor);
    const predictionArray = await prediction.array();

    const predictedIndex = tf.argMax(predictionArray[0]).dataSync()[0];
    const predictionScore = predictionArray[0][predictedIndex];

    return {
      predictedIndex,
      predictionScore,
    };
  } catch (error) {
    console.error('Error during inference:', error);
    throw error;
  }
};

module.exports = inferenceService;
