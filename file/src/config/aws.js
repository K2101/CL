const { S3Client } = require("@aws-sdk/client-s3");
const config = require('./config')

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.awsAccess,
    secretAccessKey: config.awsSecret,
  },
  region: config.awsRegion,
})


module.exports = { s3 }