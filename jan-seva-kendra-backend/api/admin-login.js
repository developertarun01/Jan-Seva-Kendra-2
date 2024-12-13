const express = require("express");
const router = express.Router();

// Hardcoded admin credentials (replace with environment variables or database in production)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

// Middleware to check admin credentials
router.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ error: "Invalid username or password" });
    }
});

module.exports = router;
