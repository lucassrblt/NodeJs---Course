const user = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

//Create json web token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "2h" });
};

dotenv.config();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are not null
    if (!email || !password) {
      return res.json({ status: "FAILED", message: "Please fill all files" });
    }

    // Check if email already exist
    const isMailExist = await user.find({ email: email });
    if (isMailExist.length !== 0) {
      return res.json({
        status: "FAILED",
        message: "Email already exist",
        res: isMailExist,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new user({
      email: email,
      password: hashedPassword,
      verified: false,
    });

    //Save user un bdd
    const userSaved = await newUser.save();

    // Send verification email
    if (newUser.verified === false) {
      VerfificationEmail(userSaved, res);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.registerWithGoogle = async (req, res) => {
  try {
    const { email, verified, password, profile } = req.body;
    if ((!email || !profile, !verified || !password)) {
      return res.json({ status: "FAILED", error: "Error about send data" });
    }

    const newUser = new user({ email, password, verified, profile });
    const userSaved = await newUser.save();
    if (userSaved) {
      return res.json({ status: "SUCCESS", message: "User saved" });
    }
  } catch (error) {
    console.log("Error about register with google", error);
  }
};

const VerfificationEmail = async ({ _id, email }, res) => {
  try {
    // Create mail to send
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email verification",
      // html: `<p>Enter <b>${otp}</b> in the app to verify your email adress</p>`,
      html: `Please verify your email adress by visit this link : <a href="http://localhost:5173/verify/${_id}">Link</a>`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    // Response if mail is sent
    res.json({
      status: "PENDING",
      message: "verification email sent",
      data: {
        userId: _id,
        email: email,
      },
    });
  } catch (error) {
    // Response if mail is not sent
    res.json({
      status: "FAILED",
      message: "Verification email failed to send",
      data: {
        userId: _id,
        email: email,
      },
    });
  }
};

module.exports.verifyEmail = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }
    await user.findByIdAndUpdate(id, { verified: true });
    res.json({
      status: "SUCCESS",
      message: "Email verified",
      data: {
        userId: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const userCollection = await user.findOne({ email: email });
    console.log(userCollection);

    if (!userCollection) {
      return res.json({ status: "FAILED", message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, userCollection.password);
    if (!isMatch) {
      return res.json({ status: "FAILED", message: "Password Invalid" });
    }

    if (!userCollection.verified) {
      return res.json({ status: "FAILED", message: "Email not verified" });
    }

    // Create jwt

    const token = createToken(userCollection._id);

    // Response + jsonWebToken
    res.json({
      status: "SUCCESS",
      message: "Login successfully",
      user: {
        _id: userCollection._id,
        email: userCollection.email,
        token: token,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal Server Error" });
  }
};
