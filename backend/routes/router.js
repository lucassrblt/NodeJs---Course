const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Spécifiez le dossier de destination
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg"); // Spécifiez le nom du fichier
  },
});

const upload = multer({ storage: storage });

router.get("/api", function (req, res, next) {
  res.send("Main root");
});

router.post("/createArticle", blogController.createArticle);
router.post("/register", authController.register);
router.post("/registerWithGoogle", authController.registerWithGoogle);
router.post("/verify", authController.verifyEmail);
router.post("/login", authController.login);

router.post("/verifyAuthent", authController.verifyEmail);
router.post("/profile", upload.single("fileValue"), authController.userProfile);

module.exports = router;
