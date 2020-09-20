const express = require("express");
const { Employee, validate } = require("../models/employee");
const bcrypt = require("bcrypt");

const router = express.Router();

// Create new employee
router.get("/new", (req, res) => {
  res.render("employees/new");
});

// Get all employees
router.get("/", async (req, res) => {
  const query = req.query.name;

  let searchOptions = {};

  if (query !== null && query !== "") {
    searchOptions = {
      name: new RegExp(query, "i"),
    };
  }

  const employees = await Employee.find(searchOptions);
  res.render("employees/index", {
    employees: employees,
    searchOptions: req.query,
  });
});

// Get an employee
router.get("/:id", async (req, res) => {
  const result = await Employee.findById(req.params.id);
  if (result) {
    res.status(200).send(result);
  }
  res.status(404).end();
});

// Create a new employee
router.post("/", async (req, res) => {
  try {
    let employee = await Employee.findOne({ email: req.body.email });

    if (employee) {
      res.status(200).send("Employee already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.phone, salt);

    console.log(salt);
    console.log(hashedPassword);

    employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    await employee.save();
    res.render("employees/new");
  } catch {
    res.status(200).send("something went wrong");
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    employee.set({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    const result = await employee.save();

    res.status(200).send(result);
    return;
  }
  res.status(404).send("Employee doesn't exists");
});

// Delete a course
router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  res.send(employee);
});

module.exports = router;
