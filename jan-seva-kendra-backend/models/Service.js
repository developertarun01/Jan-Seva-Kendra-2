const mongoose = require("mongoose");

// Define the Service schema
const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    documents: [String], // Array of document names
    image: {
        type: String,
        default: "https://mamatafertility.com/wp-content/themes/consultix/images/no-image-found-360x250.png",
    },
});

// Prevent OverwriteModelError
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

module.exports = Service;
