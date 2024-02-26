const { Kafka, Partitioners } = require('kafkajs')
const config = require('./config')

const kafka = new Kafka({
  clientId: 'file',
  brokers: [config.kafkaNode],
  ssl: true,
  sasl: {
    mechanism: 'PLAIN',
    username: config.kafkaKey,
    password: config.kafkaSecret,
  },

})

const producer = kafka.producer()

const topic = {
  fileUpload: 'FILE_UPLOAD'
}

module.exports = { kafka, producer, topic };
