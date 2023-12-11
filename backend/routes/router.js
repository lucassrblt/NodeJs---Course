const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/api", function (req, res, next) {
  res.send("Main root");
});

router.post("/createArticle", blogController.createArticle);

module.exports = router;
