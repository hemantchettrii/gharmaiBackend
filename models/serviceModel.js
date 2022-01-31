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
    serviceCategory:{
        type: String,
        enum: ['Salon for Women', 'Salon for Men', 'Plumber', 'Electrician','Cleaning and Disinfection','Carpenter', 'Men Therapy',"Women Therapy", 'other'  ],
        default: ''
    },
});

const Services = mongoose.model("Service", serviceSchema);

module.exports = Services;
