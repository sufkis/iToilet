const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existentUser = await User.findOne({ email });

    if (!existentUser)
      return res.status(404).json({ message: "User does'nt exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existentUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Email or Password are incorrect" });


    res.status(200).json({ result: existentUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existentUser = await User.findOne({ email });

    if (existentUser)
      return res.status(400).json({ message: "User already exists" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords do not match!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });


    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports = {
  signIn,
  signUp,
};
