// Import required modules
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");
require("dotenv").config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: "https://jan-seva-kendra-phi.vercel.app/", // Specify your frontend domain
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));

// Define the Service schema and model
const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    documents: [String],
    image: {
        type: String,
        default: "https://mamatafertility.com/wp-content/themes/consultix/images/no-image-found-360x250.png",
    },
});
const Service = mongoose.model("Service", ServiceSchema);

// Initialize AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload files directly to S3
app.post("/api/submit-form", upload.array("documents"), async (req, res) => {
    const { fullName, mobile, email, services } = req.body;
    const files = req.files;

    try {
        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `uploads/${Date.now()}_${file.originalname}`, // Create unique file name
                    Body: file.buffer, // Use file buffer from memory storage
                    ContentType: file.mimetype,
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

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        return res.status(200).json({ message: "Authentication successful" });
    }

    res.status(401).json({ message: "Invalid username or password" });
});

// CRUD Operations for Services
app.get("/api/services", async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

app.delete("/api/services/:id", async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

// Fetch service image by ID
app.get("/api/services/image/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service || !service.image) {
            return res.status(404).send("Image not found");
        }

        res.set("Content-Type", "image/png"); // Adjust based on your image format
        res.send(service.image);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});