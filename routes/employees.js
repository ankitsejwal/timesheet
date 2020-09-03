const express = require("express");
const { User, validate } = require("../models/employee");

const router = express.Router();

// Create new employee
router.get("/new", (req, res) => {
  res.render("employees/new");
});

// Get all user
router.get("/", async (req, res) => {
  const result = await User.find();
  res.status(200).send(result);
});

// Get a user
router.get("/:id", async (req, res) => {
  const result = await User.findById(req.params.id);
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).end();
});

// Create a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(200).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(200).send("User already exists");
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

// Update user
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.set({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    const result = await user.save();

    res.status(200).send(result);
    return;
  }
  res.status(404).send("User doesn't exists");
});

// Delete a course
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

module.exports = router;
