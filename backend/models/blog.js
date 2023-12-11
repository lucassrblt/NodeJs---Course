const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("blog", blogSchema);

module.exports = user;
