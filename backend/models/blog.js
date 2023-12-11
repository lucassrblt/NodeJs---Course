const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },

  subject: {
    type: String,
    required: false,
  },
});

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
