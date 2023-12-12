const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/database.js");

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status(200).send();
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/router");
app.use("/api", router);
module.exports = app;
