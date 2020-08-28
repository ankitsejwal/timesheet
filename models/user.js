const mongoose = require("mongoose");
const Joi = require("joi");

// set global option to remove warnings in terminal
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb://localhost/timesheet")
  .then("connected to db.")
  .catch((err) => err);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 10,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 256,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().min(5).max(100).required(),
    phone: Joi.string().trim().min(9).max(10).required(),
    password: Joi.string().trim().min(5).max(256).required(),
  });

  return schema.validate(user);
};

module.exports = { User, validate };
