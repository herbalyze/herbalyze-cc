const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const serviceAccountKey = require('../config/serviceAccountKey.json');

const bucketName = process.env.BUCKET_NAME;
const storage = new Storage({ projectId: serviceAccountKey.project_id, credentials: serviceAccountKey });

const bucket = storage.bucket(bucketName);

const uploadFileToGCS = async (fileBuffer, originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg') {
    throw new Error('File bukan gambar JPG/JPEG');
  }

  const gcsFileName = `${uuidv4()}${ext}`;
  const file = bucket.file(gcsFileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: 'image/jpeg',
    },
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {
      resolve(gcsFileName);
    });

    stream.end(fileBuffer);
  });
};

module.exports = uploadFileToGCS;
