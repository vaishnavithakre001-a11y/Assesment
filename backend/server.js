const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");

const connectDB = require("./config/db");

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// CONNECT DATABASE
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  }),
);

// BODY PARSER
app.use(express.json());

// STATIC FOLDER
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
