const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    documents: [String], // Array of document names
    image: { type: String, default: "https://mamatafertility.com/wp-content/themes/consultix/images/no-image-found-360x250.png" },
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

module.exports = mongoose.model("Service", ServiceSchema);
