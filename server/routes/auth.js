const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get("/", (req, res) => {
  res.json({ message: "hello world from auth.js" });
});

router.post("/register", async (req, res) => {
  const {
    salutation,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    email,
    password,
    profilePicURL,
    mobileNo,
    createdAt,
    updatedAt,
    accountType,
  } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({ error: "UserAlreadyExist" });
    }
    const user = new User({
      salutation,
      firstName,
      lastName,
      dob,
      gender,
      email,
      password,
      mobileNo,
      createdAt,
      updatedAt,
      accountType,
    });
    await user.save();
    return res.status(200).json({ message: "successfully registered" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) return res.json({ error: "invalid credential" });
    if (userLogin) res.json("signed in");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
