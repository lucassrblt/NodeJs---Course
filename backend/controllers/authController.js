const user = require("../models/user");
const bcrypt = require("bcrypt");

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
    });

    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
  } catch (error) {
    console.log(error);
  }
};
