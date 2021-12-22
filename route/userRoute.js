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
router.post('/user/register', function (req, res) {
  const fn = req.body.username;
  const em = req.body.emailUser;
  const pw = req.body.passwordUser;
  const add = req.body.addressUser;
  const gen = req.body.genderUser;
  const phone = req.body.phoneUser;
    // const conpw = req.body.confirmpassword;
    // const dob = req.body.dateofbirth;
    // const add = req.body.address;
    // const gen = req.body.gender;
    // const cont = req.body.contactNo;
    // const pp = req.body.profile_pic;
    // const ut = req.body.userType;

    bcrypt.hash(pw, 10, function(err, hash1) {

      const data = new userModel({ username: fn, emailUser: em, passwordUser: hash1, addressUser: add, genderUser:gen, phoneUser:phone});
      data.save()
          .then(function(result) {
            console.log("Register vayo")
              res.status(201).json({ message: "User Registered successfully", success : true });
          })
          .catch(function(error) {
              res.status(500).json({ message: error })
          })
  })
    //const cpw = req.body.confirmpassword;
})

/***** LOGIN SYSTEM *****/
router.post("/user/login", function (req, res) {
  // console.log(req.body) --->Checking is the data is coming through frontend
  /*** FIRST, WE NEED USERNAME AND PASSWORD FROM CLIENT ***/
  const username = req.body.username;
  const password = req.body.passwordUser;

  /*** SECOND, WE NEED TO CHECK IF THE USERNAME EXIST OR NOT ***/
  userModel
    .findOne({ username: username })
    .then(function (userData) {
      //all the data of username is now in the variable userData
      if (userData === null) {
        //if the username not found.that means they are invalid users!!
        return res.status(403).json({ message: "Invalid Credentials!" });
      }
      //valid users in terms of username
      //now compare the stored password with the given password
      bcrypt.compare(password, userData.password, function (err, result) {
        if (result === false) {
          //if password is incorrect...
          return res.status(403).json({ message: "Invalid Credentials!" });
        }
        //if both username and password are correct...

        //Now we need to create a token...
        const token = jwt.sign({ userId: userData._id }, "anysecretkey");
        console.log("Yp pani vayo")
        res
          .status(200)
          .json({ token: token, userId: userData._id, success: true, message: "Authorization Success!!!", username: userData.username, userProfile : userData.profile_pic });
      });
    })
    .catch();
});

//exporting router
module.exports = router;