const express = require("express");
const router = new express.Router();

const serviceUpload = require("../middleware/serviceUpload");

const verifyUser = require("../middleware/auth");
const verifyAdmin = require("../middleware/adminAuth")
const Services = require("../models/serviceModel");

/** insert code **/
router.post(
  "/service/insert",
  serviceUpload.single("serviceImage"),
  function (req, res) {
    console.log("Hit");
    const serviceName = req.body.serviceName;
    const categoryID = req.body.categoryID;
    const serviceDetails = req.body.serviceDetails;
    const servicePrice = req.body.servicePrice;
    const serviceImage = req.body.filename;
    const serviceCategory = req.body.serviceCategory;

    /*** INSERT CODE HERE ***/
    const data = new Services({
      categoryID: categoryID,
      serviceName: serviceName,
      serviceDetails: serviceDetails,
      servicePrice: servicePrice,
      serviceImage: serviceImage,
      serviceCategory: serviceCategory,
    });
    console.log(data);
    data
      .save()
      .then(function (result) {
        console.log("save" + data);

        res.status(201).json({ message: "Service Inserted!", success: true });
      })
      .catch(function (err) {
        res.status(500).json({ message: err });
        console.log(err);
      });
  }
);

// update service
router.put("/service/update/:id", verifyUser.verifyUser, function (req, res) {
  /*** UPDATE CODE HERE ***/
  const serviceId = req.body.id;
  const serviceName = req.body.serviceName;
  const servicePrice = req.body.servicePrice;
  const serviceCategory = req.body.serviceCategory;
  Services.updateOne(
    { _id: serviceId },
    {
      serviceName: serviceName,
      servicePrice: servicePrice,
      serviceCategory: serviceCategory,
    }
  )
    .then(function (result) {
      res.status(201).json({ message: "Category updated" });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

//service delete code
router.delete(
  "/survice/delete/:id",
  verifyUser.verifyUser,
  function (req, res) {
    /**** const id = req.body.id; ****/ // ---> if it comes from form
    const id = req.params.id; // ---> if it comes from url

    Services.deleteOne({ _id: id })
      .then(function (result) {
        res.status(201).json({ message: "Service deleted", success:true });
      })
      .catch(function (err) {
        res.status(500).json({ message: err });
      });
  }
);

//service delete code for admin
router.delete("/admin/service/delete/:id", verifyAdmin.verifyAdmin, function (req, res) {
    console.log("Admin delete service")
    // const id = req.body.id;  // ---> if it comes from form
    const id = req.params.id; // ---> if it comes from url

    console.log(id)
    Services.deleteOne({ _id: id })
      .then(function (result) {
    console.log("i m here")
        res.status(201).json({ message: "Service deleted", success:true });
      })
      .catch(function (err) {
        res.status(500).json({ message: err });
      });
  }
);

//display all the items in service
router.get("/service/showall", verifyAdmin.verifyAdmin, function (req, res) {
  console.log("service showAll")
  Services.find()
    .then(function (data) {
      res.status(201).json({ 
        success: true, 
        data: data, 
        // serviceCategory: serviceCategory.serviceCategory
       });
      console.log("service data "+  data)
    })

    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
