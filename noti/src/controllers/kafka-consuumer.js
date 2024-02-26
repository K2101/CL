const { kafka, topic } = require('../config/kafka')
const { mailSender } = require('../utils/email')
const config = require('../config/config')

const subscribeAndConsume = async () => {
  const consumer = kafka.consumer({ groupId: 'noti' });
  await consumer.connect()
  await consumer.subscribe({ topic: topic.fileUpload, fromBeginning: true })


  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('consume')
      const msObj = JSON.parse(message.value)


      const { email, message: kafkaMessage, fileName, fileType, url, size } = msObj;

      const newUrl = `${config.path}/${url}`

      try {
        await mailSender(email, kafkaMessage, fileName, fileType, newUrl, size);
        console.log('email sent.')
      } catch (err) {
        console.log('error', err)
      }
    },
  })

}


module.exports = { subscribeAndConsume }