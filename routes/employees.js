const express = require("express");
const { Employee, validate } = require("../models/employee");
const bcrypt = require("bcrypt");

const router = express.Router();

// Create new employee
router.get("/new", (req, res) => {
  res.render("employees/new", {
    title: "New employee",
    navlink: {
      text: "See all employees",
      url: "/employees",
    },
  });
});

// Get login page
router.get("/login", (req, res) => {
  res.render("employees/login", { title: "Login" });
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
    title: "All employees",
    navlink: {
      text: "Add new employee",
      url: "/employees/new",
    },
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
router.post("/new", async (req, res) => {
  try {
    let employee = await Employee.findOne({ email: req.body.email });

    if (employee) {
      res.status(200).send("Employee already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.phone, salt);

    console.log(salt);
    console.log(hashedPassword);

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.phone);

    await Employee.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    res.redirect("/employees/new");
  } catch (err) {
    console.error(err);
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

// Delete an employee
router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  res.send(employee);
});

// Login
router.post("/login", async (req, res) => {
  try {
    const employee = await Employee.find(req.body.email);
    if (employee == null) return res.status(404).send("Employee not found");
    if (await bcrypt.compare(employee.password === req.body.password)) {
      res.send("password matched");
    }
  } catch {
    res.send("invalid credentials");
  }
});

module.exports = router;
