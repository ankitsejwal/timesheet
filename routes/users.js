const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

// get all user
router.get("/", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

// create a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(200).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(200).send("User already exists");
    return;
  }

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
