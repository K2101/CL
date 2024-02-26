const express = require('express')
const fileRouter = require('./routes/file')
const auth = require('./middlewares/auth')
const app = express()
const config = require('./config/config')
const mongoose = require('mongoose')
const { producer } = require('./config/kafka')
const { fileUploadSubscribe } = require('./controllers/kafka-consumer')
const cors = require('cors');



// For dev
app.use(cors());
app.use(express.json())
app.use(auth)
app.use('/api/v1/file', fileRouter)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'not found' })
});


const start = async () => {
  try {
    console.log('Waiting kafka rebalance...')
    await producer.connect();
    await fileUploadSubscribe();
    console.log('Connected to Kafka...')
    await mongoose.connect(config.mongo);
    console.log('Connected to Mongodb...');
    app.listen(3001, () => console.log('Listening on port 3001...'))
  } catch (err) {
    console.log('error: ', err)
  }
}

start();
