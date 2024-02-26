const { kafka, topic } = require('../config/kafka')
const file = require('../models/file')

const fileUploadSubscribe = async () => {
  const consumer = kafka.consumer({ groupId: 'file' });
  await consumer.connect()
  await consumer.subscribe({ topic: topic.fileUpload, fromBeginning: true })


  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msObj = JSON.parse(message.value)

      const { fileName, fileType, url, size } = msObj;

      try {
        await file.create({
          fileName, fileType, url, size
        });

      } catch (err) {
        console.log('insert to db error: ', err)
        // retry in exponential backoff time.
        await file.create({
          fileName, fileType, url,
        });
      }
    },
  })
}


module.exports = { fileUploadSubscribe }