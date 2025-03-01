// Setting up a Kafka producer to send a message to a Kafka topic named "rider-updates"
const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const init = async () => {
  // Initialize
  const producer = kafka.producer();

  console.log("Connecting the producer");
  await producer.connect();
  console.log("Producer connected");

  // read user input from the console
  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");

    // send messages by producer
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: riderName, location: location }),
        },
      ],
    });
  }).on("close", async () => {
    // close connection when reader is closed
    await producer.disconnect();
  });
};

init();
