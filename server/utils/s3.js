require("dotenv").config();

const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_BUCKET_REGION;
const bucket = process.env.S3_BUCKET_NAME;

var S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const s3 = new S3({
  region,
  accessKey,
  secretKey,
});

function uploadFile(file) {
  console.log("Trying to upload...");
  let fileStream = fs.createReadStream(file.path);
  // setup upload paramters S3
  const uploadParams = {
    Bucket: bucket,
    Key: file.filename,
    Body: fileStream,
  };
  // upload file and return promise
  return s3.upload(uploadParams).promise();
}

function getFile(fileKey) {
  const downloadParams = {
    Bucket: bucket,
    Key: fileKey,
  };

  let fileStream = s3.getObject(downloadParams).createReadStream();
  return fileStream;
}

function downloadFile(fileKey) {
  let fileStream = getFile(fileKey);
  return fileStream;
}

module.exports = {
  uploadFile,
  getFile,
  downloadFile,
};
