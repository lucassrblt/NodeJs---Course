const blog = require("../models/blog");

module.exports.createArticle = async (req, res) => {
  try {
    const { name, author, subject } = req.body;

    const newBlog = new blog({
      name: name,
      author: author,
      subject: subject,
    });

    const blogSaved = await newBlog.save();
    res.status(201).json(blogSaved);
  } catch (error) {
    console.log(error);
  }
};
