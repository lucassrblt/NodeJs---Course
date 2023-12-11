const mongoose = require("mongoose"); // Récupère le package mongoose
require("dotenv").config(); // Récupère le package dotenv
const DB_URI =
  "mongodb+srv://lucas:4ZInDSb1tFmwjD3R@cluster0.vuj1iyk.mongodb.net/";

// Connexion à la base de données

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
