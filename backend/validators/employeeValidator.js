const { body } = require("express-validator");

exports.employeeValidation = [
  body("name").notEmpty().withMessage("Name required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("designation").notEmpty().withMessage("Designation required"),

  body("department").notEmpty().withMessage("Department required"),

  body("salary").notEmpty().withMessage("Salary required"),
];
