const express = require("express");
const router = new express.Router();

const upload = require("../middleware/fileUpload");

const verifyUser = require("../middleware/auth");
const Services = require("../models/serviceModel");

/** insert code **/
router.post('/service/insert', upload.single('serviceImage'),  function (req, res) {
    const serviceName = req.body.serviceName;
    const categoryID = req.body.categoryID;
    const serviceDetails = req.body.serviceDetails;
    const servicePrice = req.body.servicePrice;
    const serviceImage = req.body.filename;

    /*** INSERT CODE HERE ***/
    const data = new Services({
        categoryID: categoryID,
        serviceName: serviceName,
        serviceDetails: serviceDetails,
        servicePrice: servicePrice,
        serviceImage: serviceImage,
    });
    data
        .save()
        .then(function(result) {
            res.status(201).json({ message: "Service Inserted!" });
        })
        .catch(function(err) {
            res.status(500).json({ message: err });
        });
})

module.exports = router;