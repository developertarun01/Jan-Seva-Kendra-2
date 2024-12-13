const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// Get all services
router.get("/api/services", async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
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

// Delete a service
router.delete("/api/services/:id", async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/api/clients/submit", upload.array("documents"), (req, res) => {
    const { fullName, mobile, email } = req.body;
    const documents = req.files;

    console.log("Client Submission:", { fullName, mobile, email, documents });

    // Save to database or send email notification as required

    res.status(200).json({ message: "Form submitted successfully" });
});

app.get("/api/services/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id); // Fetch service by ID
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;