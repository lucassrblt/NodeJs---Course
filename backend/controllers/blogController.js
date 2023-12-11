const blog = require("../models/blog");

module.exports.createArticle = async (req, res) => {
  try {
    const { name, author, subject } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const newBlog = new blog({
      name: name,
    });

    const blogSaved = await newBlog.save();
    res.status(201).json(blogSaved);
  } catch (error) {
    console.log(error);
  }
};
