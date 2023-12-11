const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/database.js");

connectDB();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./routes/router");
app.use("/api", router);
module.exports = app;
