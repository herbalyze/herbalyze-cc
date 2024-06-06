const { Storage } = require('@google-cloud/storage');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const storage = new Storage({ keyFilename: path.join(__dirname, '../config/serviceAccountKey.json') });

const modelBucketName = 'herbalyze-ml-model-deployment';
const loadModel = async (modelBucketName) => {
  const modelPath = `gs://${modelBucketName}/model.json`;
  const model = await tf.loadGraphModel(modelPath);
  return model;
};

const preprocessImage = async (imageUrl) => {
  const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());
  const imageTensor = tf.node.decodeImage(new Uint8Array(imageBuffer), 3)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();
  return imageTensor;
};

const predictLabel = async (imageUrl, modelBucketName) => {
  const model = await loadModel(modelBucketName);
  const inputTensor = await preprocessImage(imageUrl);
  const predictions = model.predict(inputTensor);
  const predictedLabel = predictions.argMax(-1).dataSync()[0];
  const labelMap = {
    0: 'Lidah Buaya',
    1: 'Seledri',
    2: 'Jambu Biji',
    3: 'Jahe',
    4: 'Daun Kemangi',
    5: 'Mentimun'
  };
  return labelMap[predictedLabel];
};

module.exports = { predictLabel };
