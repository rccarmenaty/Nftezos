require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use(errorHandler);

module.exports = app;
