const user = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const userOTPVerification = require("../models/userOTPVerification");

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
    sendOTPVerfificationEmail(userSaved, res);
  } catch (error) {
    console.log(error);
  }
};

const sendOTPVerfificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email verification",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email adress</p>`,
    };

    const saltRounds = 10;

    const hashedOtp = await bcrypt.hash(otp, saltRounds);

    const newOTPVerification = new userOTPVerification({
      userId: _id,
      OTP: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 360000 * 10, // 1 hour
    });
    await newOTPVerification.save();
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

module.exports.verifyOTP = async (req, res) => {
  try {
    const { id, code } = req.body;
    if (!id || !code) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const otpVerification = await userOTPVerification.findOne({ userId: id });
    if (!otpVerification) {
      return res
        .status(400)
        .json({ error: "Not registred or already verified" });
    }

    const isExpired = Date.now() > otpVerification.expiresAt;
    if (isExpired) {
      return res.status(400).json({ error: "OTP expired" });
    }

    const isMatch = bcrypt.compare(code, otpVerification.OTP);
    if (!isMatch) {
      return res.status(400).json({ error: "OTP doesn't match" });
    }

    await user.findByIdAndUpdate(id, { verified: true });
    res.json({
      status: "SUCCESS",
      message: "OTP verified",
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
