const express = require("express");
const { Employee, validate } = require("../models/employee");
const bcrypt = require("bcrypt");

const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  const query = req.query.name;

  let searchOptions = {};

  if (query) {
    searchOptions.name = new RegExp(query, "i");
  }

  const employees = await Employee.find(searchOptions);
  res.render("employees/index", {
    title: "All employees",
    employees: employees,
    searchOptions: req.query,
  });
});

// Create new employee
router
  .get("/new", (req, res) => {
    res.render("employees/new", {
      title: "New employee",
    });
  })
  .post("/new", async (req, res) => {
    try {
      let employee = await Employee.findOne({ email: req.body.email });

      if (employee) {
        res.status(200).send("Employee already exists");
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.phone, salt);

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

// Delete an employee
router
  .get("/delete", async (req, res) => {
    const query = req.query.name;

    let searchOptions = {};

    if (query) {
      searchOptions.name = new RegExp(query, "i");
    }

    const employees = await Employee.find(searchOptions);
    res.render("employees/delete", {
      title: "Delete employee",
      employees: employees,
      searchOptions: req.query,
    });
  })
  .post("/delete", async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.body.id);
      console.log(employee);
      res.redirect("/employees/delete");
    } catch (err) {
      console.error(err);
      res.redirect("/employees/delete");
    }
  });

// Get login page
router
  .get("/login", (req, res) => {
    res.render("employees/login", { title: "Login" });
  })
  .post("/login", async (req, res) => {
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
