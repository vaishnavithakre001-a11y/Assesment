const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({
      ...req.body,
      image: req.file ? req.file.filename : "",
      createdBy: req.user.id,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const search = req.query.search || "";

    const employees = await Employee.find({
      name: { $regex: search, $options: "i" },
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
