
# Render Deployment Guide — Employee Management System

## 1. Push Backend Code to GitHub

### Initialize Git

```bash
git init
```

### Add Files

```bash
git add .
```

### Commit Code

```bash
git commit -m "Initial backend upload"
```

### Connect GitHub Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Push Code

```bash
git branch -M main

git push -u origin main
```

---

# 2. Backend Folder Structure

```txt
backend/
│
├── config/
│   └── db.js
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── validators/
├── uploads/
│
├── .env
├── package.json
├── server.js
└── .gitignore
```

---

# 3. Create `.gitignore`

```txt
node_modules
.env
uploads
```

---

# 4. Update `package.json`

Add scripts:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

# 5. Install Required Packages

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer express-validator
```

Install nodemon:

```bash
npm install --save-dev nodemon
```

---

# 6. Render Deployment Steps

## Open Render

[[https://render.com](https://render.com](https://assesment-1s4t.onrender.com))

---

## Create Web Service

1. Click "New +"
2. Select "Web Service"
3. Connect GitHub
4. Select repository

---

# 7. Render Configuration

## Build Command

```bash
npm install
```

## Start Command

```bash
npm start
```

---

# 8. Add Environment Variables in Render

Go to:

```txt
Environment
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 9. Update `server.js`

Use this version:

```js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

require("dns").setDefaultResultOrder("ipv4first");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
```

---

# 10. Update `db.js`

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

# 11. MongoDB Atlas Settings

## Network Access

Add:

```txt
0.0.0.0/0
```

## Database User

Create:

* Username
* Password
* Read & Write access

---

# 12. Deploy

Click:

```txt
Create Web Service
```

Render will automatically:

* install dependencies
* connect MongoDB
* start server
* generate deployment URL

---

# 13. Example Render URL

```txt
https://employee-management-system.onrender.com
```

---

# 14. API Example

```txt
https://employee-management-system.onrender.com/api/auth/register
```

---

# 15. Frontend Axios Base URL

```js
const api = axios.create({
  baseURL: "https://employee-management-system.onrender.com/api"
});
```

---

# 16. Frontend Deployment

You can deploy frontend on:

* Render
* Vercel
* Netlify

Recommended:

* Backend → Render
* Frontend → Vercel
