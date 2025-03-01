// Setting up a Kafka consumer to read messages from a Kafka topic named "rider-updates"
const { kafka } = require("./client");

const group = process.argv[2];

const init = async () => {
  // Create a Kafka consumer to read messages from a Kafka topic
  const consumer = kafka.consumer({
    groupId: group,
  });

  await consumer.connect();
  // Subscribe the consumer to a topic
  await consumer.subscribe({
    topic: "rider-updates",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      /* Print the message details actual application may process this data and
      send bulk data to the database in a single query request*/
      console.log({
        group,
        topic,
        partition,
        value: message.value.toString(),
      });
    },
  });
};

init();
