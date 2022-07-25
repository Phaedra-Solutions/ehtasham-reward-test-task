const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./router");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);

app.use("/", (req, res) => {
  res.send("Service is running");
});

app.use("*", (req, res) => {
  res.send("Route Not Defined");
});

module.exports = app;
