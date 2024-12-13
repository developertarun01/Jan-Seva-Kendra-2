const submissions = []; // Replace with your database fetch logic

// Middleware for authenticating admin
const authenticateAdmin = (req, res, next) => {
    const { username, password } = req.headers;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        next(); // Authentication successful, proceed to the next middleware
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// Protected route to fetch submissions
router.get("/submissions", authenticateAdmin, (req, res) => {
    res.status(200).json(submissions);
});