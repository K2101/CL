const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { s3 } = require('../config/aws')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const config = require('../config/config')
const { v4: uuidv4 } = require('uuid');
const { producer, topic } = require('../config/kafka');
const file = require('../models/file')

const upload = async (req, res) => {

  const { email, message, fileName, fileType, size } = req.body;

  if (!email || !message, !fileName, !fileType) {
    return res.status(400).json({ message: 'email, message, fileName, fileType are required.' })
  }

  if (size > 10000000) {
    return res.status(400).json({ message: 'file size are too large.' })
  }

  const trimFileType = fileType.trim();

  console.log('trimFileType', trimFileType)

  if (trimFileType !== 'jpeg' && trimFileType !== 'jpg') {
    return res.status(400).json({ message: 'only .jpeg images allowed.' })
  }

  // hardcoding like user id = 1 for better s3 deletion.
  const key = `1/${uuidv4()}.jpeg`
  const params = {
    Bucket: config.s3Bucket,
    ContentType: 'jpeg',
    Key: key,
  };


  const command = new PutObjectCommand(params)
  const signedUrl = await getSignedUrl(s3, command);




  res.status(200).json({ message: { signedUrl, key, fileType } })
}

const publicRequest = async (req, res) => {

  const { email, message, fileName, fileType, url, size } = req.body;

  if (!email || !message || !fileName || !fileType || !url) {
    return res.status(400).json({ message: 'email, message, fileName, fileType, url, size are required.' })
  }


  await producer.send({
    topic: topic.fileUpload,
    messages: [
      { value: JSON.stringify({ email, message, fileName, fileType, url, size }) },
    ],
  })

  res.status(200).json({ message: 'success' })
}

const getFileList = async (req, res) => {
  const data = await file.find({}).sort({ createdAt: -1 });

  res.status(200).json({ message: data })
}


module.exports = { upload, publicRequest, getFileList }