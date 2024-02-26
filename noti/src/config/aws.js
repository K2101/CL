const { SESClient } = require('@aws-sdk/client-ses');
const config = require('./config')

const ses = new SESClient({
  credentials: {
    accessKeyId: config.awsAccess,
    secretAccessKey: config.awsSecret,
  },
  region: config.awsRegion,
})


module.exports = { ses }