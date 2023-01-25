require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const pino = require("pino-http")();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const { protect } = require("./middleware/auth");

connectDB();

app.use(express.json());

app.use(pino);

app.use("/api/auth", require("./routes/auth"));

app.use(protect);

app.use("/api/group", require("./routes/group"));

app.use(errorHandler);

module.exports = app;
