const express = require("express");
const workerModel = require("../models/workerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const workerUpload = require("../middleware/worker.imageUpload")
const verifyWorker = require("../middleware/workerAuth");

//worker register
router.post("/worker/register", function (req, res) {
    console.log("register hit")
    const workerName = req.body.workerName;
    const workerEmail = req.body.workerEmail;
    const workerPassword = req.body.workerPassword;
    const workerProfile_pic = req.body.filename;
    const workerDateOfBirth = req.body.workerDateOfBirth;
    const workerAddress = req.body.workerAddress;
    const workerGender = req.body.workerGender;
    const workerContactNo = req.body.workerContactNo;

    bcrypt.hash(workerPassword, 10, function (err, hash1) {
        const data = new workerModel({
        workerName: workerName,
        workerEmail: workerEmail,
        workerProfile_pic: workerProfile_pic,
        workerDateOfBirth: workerDateOfBirth,
        workerAddress: workerAddress,
        workerGender: workerGender,
        workerContactNo: workerContactNo,
        workerPassword: hash1,
      });
      console.log(data);
      data
        .save()
        .then(function (result) {
          res
            .status(201)
            .json({ message: "Registered successfully", success: true });
          console.log("Register Success");
        })
        .catch(function (error) {
          res.status(500).json({ message: error });
        });
    });
})


//worker login
// router.post("/worker/login", function (req, res) {
    

//     workerModel
//         .findOne({ workerEmail: workerEmail })
//         .then(function (userData) {
//             if (userData === null) {
//             return res.status(403).json({ message: "Invalid Credentials!" });
//             }
//             bcrypt.compare(password, userData.password, function (err, result) {
//             if (result === false) {
//                 return res.status(403).json({ message: "Invalid Credentials!" });
//             }
//             const token = jwt.sign({ userId: userData._id }, "anysecretkey");
//             res
//                 .status(200).json({
//                     token: token, userId: userData._id, success: true, message: "Authorization Success!!!",
//                 });
//             });
//         })
//         .catch();
// })

/***** LOGIN SYSTEM *****/
router.post("/worker/login", function (req, res) {
  console.log(req.body) //--->Checking is the data is coming through frontend
  /*** FIRST, WE NEED USERNAME AND PASSWORD FROM CLIENT ***/
  const workerEmail = req.body.workerEmail;
  const workerPassword = req.body.workerPassword;

  /*** SECOND, WE NEED TO CHECK IF THE USERNAME EXIST OR NOT ***/
  workerModel
    .findOne({ workerEmail: workerEmail })
    .then(function (userData) {
      //all the data of username is now in the variable userData
      if (userData === null) {
        console.log(" I m here");

        //if the username not found.that means they are invalid users!!
        return res.status(403).json({ message: "Invalid Credentials!" });
      }
      //valid users in terms of username
      //now compare the stored password with the given password
      bcrypt.compare(workerPassword, userData.workerPassword, function (err, result) {
        if (result === false) {
          //if password is incorrect...
          return res.status(403).json({ message: "Invalid Credentials!" });
        }
        //if both username and password are correct...

        //Now we need to create a token...
        const token = jwt.sign({ userId: userData._id }, "anysecretkey");
        res.status(200).json({
          token: token,
          userId: userData._id,
          success: true,
          message: "Authorization Success!!!"
        });
      });
    })
    .catch();
});


//update account
router.put("/worker/profile/update/:id", verifyWorker.verifyWorker, function (req, res) {
    const id = req.params.id;
    const workerName = req.body.workerName;
    const workerEmail = req.body.workerEmail;
    const workerPassword = req.body.workerPassword;
    const workerDateOfBirth = req.body.workerDateOfBirth;
    const workerAddress = req.body.workerAddress;
    const workerGender = req.body.workerGender;
    const workerContactNo = req.body.workerContactNo;
    // const profile_pic = req.body.profile_pic;
    workerModel
        .updateMany(
        { _id: id },
            {
            workerName: workerName,
            workerEmail: workerEmail,
            workerPassword: workerPassword,
            workerDateOfBirth: workerDateOfBirth,
            workerAddress: workerAddress,
            workerGender: workerGender,
            workerContactNo: workerContactNo,
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
});

//Photo upload
router.post( "/worker/profile/update", verifyWorker.verifyWorker, workerUpload.single("myimage"), function (req, res) {
    const wid = req.userData._id;
    // console.log(req.file)
        if (req.file == undefined) {
        return res
            .status(400)
            .json({ message: "only png/jpeg/gif files are allowed!" });
        }
        // const data = new userModel({
        //   profile_pic: req.file.filename,
        // });
        workerModel
        .updateOne({ _id: wid }, { profile_pic : req.file.filename})
        .then(function (result) {
            res.status(201).json({ message: "Profile Picture Uploaded!" });
        })
        .catch(function (error) {
            res.status(500).json({ message: error });
        });
    }
);

//view account
router.get("/worker/profile/show/:id", verifyWorker.verifyWorker, function (req, res) {
    const worker_id = req.params.id;
    console.log(req.body);
    workerModel
        .findOne({ _id: worker_id })
        .then(function (data) {
        res.send({ data: data, success: "true" });
        })
        .catch(function (err) {
        res.status(500).json({ message: err });
        });
});

//delete account
router.delete("/worker/profile/delete/:id", verifyWorker.verifyWorker, function (req, res) {
  // console.log("Delete function");
    const id = req.params.id;
    workerModel
        .deleteOne({ _id: id })
        .then(function (req, res) {
        res.status(201).json({ message: "Data deleted", success:true });
        })
        .catch(function (error) {
        res.status(500).json({ message: error });
        });
});

// show all
router.get("/worker/showAll", function (req, res) {
  console.log("Hello worker");
  workerModel
    .find()
    .then(function (data) {
      console.log(data);
      res.status(201).json({ success: true, data: data });
    })
    .catch(function (error) {
      res.status(500).json({ message: "Error aayo hai" });
    });
});

module.exports = router;
