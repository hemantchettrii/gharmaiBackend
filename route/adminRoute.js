const express = require("express");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs"); //Password hash
const jwt = require("jsonwebtoken"); //token generator
const adminUpload = require("../middleware/admin.imageUpload");
// const upload = require("../middleware/fileUpload");
// const profileUpload = require("../middleware/profile.imageUpload");

/*** bulk export of the route ***/
const router = new express.Router();
const verifyAdmin = require("../middleware/adminAuth");

//Register System
router.post("/admin/register", function (req, res) {
  const adminName = req.body.adminName;
  const adminEmail = req.body.adminEmail;
  const adminPassword = req.body.adminPassword;
  const adminConfirmPassword = req.body.adminConfirmPassword;
  bcrypt.hash(adminPassword, 10, function (err, hash1) {
    const data = new adminModel({
      adminName: adminName,
      adminEmail: adminEmail,
      adminPassword: hash1,
      adminConfirmPassword: adminConfirmPassword,
    });
    data
      .save()
      .then(function (result) {
        res
          .status(201)
          .json({ message: "Registered successfully", success: true });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
  });
});

/***** LOGIN SYSTEM *****/
router.post("/admin/login", function (req, res) {
  console.log(req.body); //--->Checking is the data is coming through frontend
  /*** FIRST, WE NEED adminNAME AND PASSWORD FROM CLIENT ***/
  const adminEmail = req.body.adminEmail;
  const adminPassword = req.body.adminPassword;

  /*** SECOND, WE NEED TO CHECK IF THE adminNAME EXIST OR NOT ***/
  adminModel
    .findOne({ adminEmail: adminEmail })
    .then(function (adminData) {
      //all the data of adminname is now in the variable adminData
      if (adminData === null) {
        console.log(" I m here");

        //if the adminname not found.that means they are invalid admins!!
        return res.status(403).json({ message: "Invalid Credentials!" });
      }
      //valid admins in terms of adminname
      //now compare the stored password with the given password
      bcrypt.compare(
        adminPassword,
        adminData.adminPassword,
        function (err, result) {
          if (result === false) {
            //if password is incorrect...
            return res.status(403).json({ message: "Invalid Credentials!" });
          }
          //if both adminname and password are correct...

          //Now we need to create a token...
          const token = jwt.sign({ adminId: adminData._id }, "anysecretkey");
          res.status(200).json({
            token: token,
            adminId: adminData._id,
            success: true,
            message: "Authorization Success!!!",
          });
        }
      );
    })
    .catch();
});

//update account
router.put(
  "/admin/profile/update/:id",
  verifyAdmin.verifyAdmin,
  function (req, res) {
    const id = req.params.id;
    const adminName = req.body.adminName;
    const adminEmail = req.body.adminEmail;
    const adminPassword = req.body.adminPassword;
    // const profile_pic = req.body.profile_pic;
    adminModel
      .updateMany(
        { _id: id },
        {
          adminName: adminName,
          adminEmail: adminEmail,
          adminPassword: adminPassword
        }
      )
      .then(function (result) {
        res
          .status(201)
          .json({ message: "Profile Picture Updated!", success: true });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
  }
);

//view account
router.get("/admin/profile/show/:id", verifyAdmin.verifyAdmin, function (req, res) {
  const admin_id = req.params.id;
  console.log(req.body);
  adminModel
      .findOne({ _id: admin_id })
      .then(function (data) {
      res.send({ data: data, success: "true" });
      })
      .catch(function (err) {
      res.status(500).json({ message: err });
      });
});

//delete account
router.delete("/admin/profile/delete/:id", verifyAdmin.verifyAdmin, function (req, res) {
  // console.log("Delete function");
    const id = req.params.id;
    adminModel
        .deleteOne({ _id: id })
        .then(function (req, res) {
        res.status(201).json({ message: "Data deleted", success:true });
        })
        .catch(function (error) {
        res.status(500).json({ message: error });
        });
});

//Photo upload
router.post( "/worker/profile/update", verifyAdmin.verifyAdmin, adminUpload.single("adminImage"), function (req, res) {
  const aid = req.adminData._id;
  // console.log(req.file)
      if (req.file == undefined) {
      return res
          .status(400)
          .json({ message: "only png/jpeg/gif files are allowed!" });
      }
      // const data = new userModel({
      //   profile_pic: req.file.filename,
      // });
      adminModel
      .updateOne({ _id: wid }, { profile_pic : req.file.filename})
      .then(function (result) {
          res.status(201).json({ message: "Profile Picture Uploaded!" });
      })
      .catch(function (error) {
          res.status(500).json({ message: error });
      });
  }
);

//exporting router
module.exports = router;