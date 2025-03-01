// Setting up a Kafka admin client to interact with Kafka topics and partitions
const { kafka } = require("./client");

const init = async () => {
  // Create a Kafka admin client to interact with Kafka topics and partitions
  const admin = kafka.admin();
  console.log("Connecting the admin...");
  admin.connect();
  console.log("Admin connected sucessfuly...");

  // Create a new topic with 2 partitions
  console.log("Creating Topic [rider-updates]");
  await admin.createTopics({
    topics: [{ topic: "rider-updates", numPartitions: 2 }],
  });
  console.log("Topic created sucessfully");

  // admin disconnect
  await admin.disconnect();
};

init();
