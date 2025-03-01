// Setting up a Kafka client using the kafkajs library in a Node.js environment.
const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
