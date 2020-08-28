const express = require("express");
const User = require("../models/user");

const router = express.Router();

// get all user
router.get("/", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

// create a new user
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(200).send("User already exists");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  await user.save();

  res.send(user);
});

module.exports = router;
