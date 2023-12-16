const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

router.get("/api", function (req, res, next) {
  res.send("Main root");
});

router.post("/createArticle", blogController.createArticle);
router.post("/register", authController.register);
router.post("/registerWithGoogle", authController.registerWithGoogle);
router.post("/verify", authController.verifyEmail);
router.post("/login", authController.login);

router.post("/verifyAuthent", authController.verifyEmail);

module.exports = router;
