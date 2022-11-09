const express = require("express");
const app = express();

app.use(express.json());

const server = app.listen(5000, async () => {
  console.log(`up and running on ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(`Logged error ${reason}`);

  server.close(() => process.exit(1));
});
module.exports = app;
