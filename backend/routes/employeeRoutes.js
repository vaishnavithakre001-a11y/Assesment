const express = require("express");

const router = express.Router();

const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", protect, getEmployees);

router.get("/:id", protect, getEmployee);

router.post(
  "/",
  protect,
  authorizeRole("admin"),
  upload.single("image"),
  createEmployee,
);

router.put("/:id", protect, authorizeRole("admin"), updateEmployee);

router.delete("/:id", protect, authorizeRole("admin"), deleteEmployee);

module.exports = router;
