const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); //Password hash
const jwt = require("jsonwebtoken"); //token generator

// const upload = require("../middleware/fileUpload");
// const profileUpload = require("../middleware/profile.imageUpload");

/*** bulk export of the route ***/
const router = new express.Router();
const verifyUser = require("../middleware/auth");

//Register System
router.post("/user/register", function (req, res) {
  console.log("Register hit")
  
  const un = req.body.username;
  const em = req.body.emailUser;
  const pw = req.body.passwordUser;
  const conpw = req.body.confirmpasswordUser;
  const dob = req.body.dateofbirthUser;
  const add = req.body.addressUser;
  const gen = req.body.genderUser;
  const cont = req.body.phoneUser;
  const pp = req.body.profile_picUser;
  const ut = req.body.userType;

  bcrypt.hash(pw, 10, function (err, hash1) {
    const data = new userModel({
      
      username: un,
      emailUser: em,
      passwordUser: hash1,
      confirmpasswordUser: conpw,
      dateofbirthUser: dob,
      addressUser: add,
      genderUser: gen,
      phoneUser: cont,
      profile_picUser: pp,
      userType: ut,
    });
    data
      .save()
      .then(function (result) {
        res.status(201).json({ message: "Registered successfully", success: true });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
  });
  //const cpw = req.body.confirmpassword;
});

/***** LOGIN SYSTEM *****/
router.post("/user/login", function (req, res) {
  console.log("Login hit")
  // console.log(req.body) --->Checking is the data is coming through frontend
  /*** FIRST, WE NEED USERNAME AND PASSWORD FROM CLIENT ***/
  const emailUser = req.body.emailUser;
  const passwordUser = req.body.passwordUser;

  /*** SECOND, WE NEED TO CHECK IF THE USERNAME EXIST OR NOT ***/
  userModel
    .findOne({ emailUser: emailUser })
    .then(function (userData) {
      console.log(userData)
      //all the data of username is now in the variable userData
      if (userData === null) {
        //if the username not found.that means they are invalid users!!
        return res.status(403).json({ message: "Invalid Credentials!" });
      }
      //valid users in terms of username
      //now compare the stored password with the given password
      bcrypt.compare(passwordUser, userData.passwordUser, function (err, result) {
        if (result === false) {
          //if password is incorrect...
          return res.status(403).json({ message: "Invalid Credentials!" });
        }
        //if both username and password are correct...

        //Now we need to create a token...
        const token = jwt.sign({ userId: userData._id }, "anysecretkey");
        console.log("Login done")
        res
          .status(200)
          .json({
            token: token,
            userId: userData._id,
            success: true,
            message: "Authorization Success!!!",
            username: userData.username,
            userProfile: userData.profile_pic,
          });
      });
    })
    .catch();
});

/*****  *****/
router.get("/profile/show/:id",  function (req, res) {
  console.log("Profile Hit")
  const user_id = req.params.id;
  userModel
    .findOne({ _id: user_id })
    .then(function (data) {
      res.send({ data: data, success: true });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

/** DISPLAYING SINGLE USER DATA **/
router.get("/profile/single/:id", function (req, res) {
  console.log("Single")

  const id = req.params.id;
  userModel
    .findById(id)
    .then(function (data) {
      res.send({ data: data, success: true });
      console.log(data)
    })
    .catch(function (err) {
      res.status(500).json({});
    });
});
/** END OF DISPLYING SINGLE USER **/

//exporting router
module.exports = router;