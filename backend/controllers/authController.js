const user = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

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
    if (!email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      email: email,
      password: hashedPassword,
      verified: false,
    });

    const userSaved = await newUser.save();
    VerfificationEmail(userSaved, res);
  } catch (error) {
    console.log(error);
  }
};

const VerfificationEmail = async ({ _id, email }, res) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email verification",
      // html: `<p>Enter <b>${otp}</b> in the app to verify your email adress</p>`,
      html: `Please verify your email adress by visit this link : <a href="http://localhost:5173/verify/${_id}">http://localhost:3000/verify/${_id}</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "verification email sent",
      data: {
        userId: _id,
        email: email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: "verification email failed to send",
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

    if (!userCollection) {
      return res.json({ status: "FAILED", error: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, userCollection.password);
    if (!isMatch) {
      return res.json({ status: "FAILED", error: "Password Invalid" });
    }

    if (!userCollection.verified) {
      return res.json({ status: "FAILED", error: "Email not verified" });
    }

    // Envoyer json web token
    res.json({
      status: "SUCCESS",
      message: "Login successfully",
    });
  } catch (error) {}
};
