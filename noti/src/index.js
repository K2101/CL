const { subscribeAndConsume } = require("./controllers/kafka-consuumer");

const start = async () => {
  console.log('Wait for kafka rebalance...')
  await subscribeAndConsume();
  console.log('Subscribed and consume...')
}




start();