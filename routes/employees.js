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

// Edit an employee
router
  .get("/edit", async (req, res) => {
    const employee = await Employee.findById(req.query.id);

    res.render("employees/edit", {
      title: "Edit employee details",
      employee: employee,
    });
  })
  .post("/edit", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.phone, salt);

      await Employee.findByIdAndUpdate(req.body.id, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword,
        },
      });
      res.redirect("/employees");
    } catch (err) {
      console.log(err);
      res.redirect("/employees");
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
    renderPage(res, "employees/login", "Login", "", "");
  })
  .post("/login", async (req, res) => {
    try {
      const employee = await Employee.findOne({ email: req.body.email });
      if (employee == null) {
        renderPage(
          res,
          "employees/login",
          "Login",
          "alert-danger",
          "Invalid credentials"
        );
      }
      // if credentials match
      if (await bcrypt.compare(req.body.password, employee.password)) {
        console.log("successful login");
        renderPage(
          res,
          "employees/login",
          "Login",
          "alert-success",
          "Login successful"
        );
      }
      // invalid credentails
      renderPage(
        res,
        "employees/login",
        "Login",
        "alert-danger",
        "Invalid credentials"
      );
    } catch (err) {
      console.log("error");
      console.error(err);
    }
  });

function renderPage(res, path, title, type, text) {
  res.render(path, {
    title: title,
    message: {
      type: type,
      text: text,
    },
  });
}

module.exports = router;
