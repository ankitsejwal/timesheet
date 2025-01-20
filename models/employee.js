const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
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
    maxlength: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

function validate(employee) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().min(5).max(100).required(),
    phone: Joi.string().trim().min(9).max(10).required(),
    password: Joi.string().trim().min(5).max(256).required(),
    admin: Joi.boolean().required(),
  });

  return schema.validate(employee);
}

module.exports = { Employee, validate };
