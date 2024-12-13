// Import required modules
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

// Import the Service model
const Service = require("./Service");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: "https://jan-seva-kendra-wheat.vercel.app/", // Replace with your frontend domain
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI; // MongoDB connection string in the .env file
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// File upload configuration using multer
const upload = multer({ dest: "uploads/" });

// API Routes

// Submit form with document upload
app.post("/api/submit-form", upload.array("documents"), async (req, res) => {
    const { fullName, mobile, email, services } = req.body;
    const files = req.files;

    try {
        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                const fileContent = fs.readFileSync(file.path);
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: file.originalname,
                    Body: fileContent,
                };

                const uploadResponse = await s3.upload(params).promise();
                return uploadResponse.Location;
            })
        );

        console.log("Uploaded Files:", uploadedFiles);
        res.status(200).json({ message: "Form submitted successfully!", uploadedFiles });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ error: "Failed to upload files", details: error.message });
    }
});

// Admin login endpoint
app.post("/api/admin-login", (req, res) => {
    const { username, password } = req.body;

    console.log("Admin Login Attempt:", { username });

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        return res.status(200).json({ message: "Authentication successful" });
    }

    res.status(401).json({ message: "Invalid username or password" });
});

// Fetch all services
app.get("/api/services", async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch single service by ID
app.get("/api/services/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
    }

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Create a new service
app.post("/api/services", async (req, res) => {
    const { name, cost, description, documents, image } = req.body;

    const newService = new Service({ name, cost, description, documents, image });

    try {
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        console.error("Error saving service:", err.message);
        res.status(400).json({ message: err.message });
    }
});

// Update a service
app.put("/api/services/:id", async (req, res) => {
    const { id } = req.params;
    const { name, cost, description, documents, image } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { name, cost, description, documents, image },
            { new: true }
        );
        res.status(200).json(updatedService);
    } catch (err) {
        console.error("Error updating service:", err.message);
        res.status(400).json({ message: err.message });
    }
});

// Delete a service
app.delete("/api/services/:id", async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Email notification for submissions
app.post("/api/clients/submit", upload.array("documents"), async (req, res) => {
    const { fullName, mobile, email } = req.body;
    const documents = req.files;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "tarunbusinessmail@gmail.com", // Replace with your email
            subject: "New Form Submission with Documents",
            text: `You have received a new submission:
Full Name: ${fullName}
Mobile: ${mobile}
Email: ${email}`,
            attachments: documents.map((file) => ({
                filename: file.originalname,
                path: file.path,
            })),
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;