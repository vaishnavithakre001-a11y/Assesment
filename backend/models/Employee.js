const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Employee", employeeSchema);
