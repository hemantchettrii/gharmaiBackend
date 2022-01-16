const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    serviceName: {
        type: String,
    },
    serviceDetails: {
        type: String,
    },
    serviceImage: {
        type: String,
    },
    servicePrice: {
        type: String,
    },
});

const Services = mongoose.model("Service", serviceSchema);

module.exports = Services;
