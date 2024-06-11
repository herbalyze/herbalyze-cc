const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const serviceAccountKey = require('../config/serviceAccountKey.json');
const mime = require('mime-types');

const storage = new Storage({
  projectId: serviceAccountKey.project_id,
  credentials: {
    client_email: serviceAccountKey.client_email,
    private_key: serviceAccountKey.private_key.replace(/\\n/g, '\n')
  }
});

const bucketName = process.env.BUCKET_NAME;

const uploadFileToGCS = async (fileBuffer, fileName) => {
  const bucket = storage.bucket(bucketName);
  const ext = mime.extension(fileBuffer.type) || 'jpeg'; // Default to jpeg if extension is not recognized
  const gcsFileName = `${uuidv4()}-${fileName}.${ext}`;

  const file = bucket.file(gcsFileName);

  await file.save(fileBuffer, {
    metadata: {
      contentType: fileBuffer.type,
      cacheControl: 'public, max-age=31536000',
    },
    resumable: false,
  });

  return file;
};

module.exports = uploadFileToGCS;
