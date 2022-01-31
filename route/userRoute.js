const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); //Password hash
const jwt = require("jsonwebtoken"); //token generator
const upload = require("../middleware/profile.imageUpload");
// const upload = require("../middleware/fileUpload");
// const profileUpload = require("../middleware/profile.imageUpload");

/*** bulk export of the route ***/
const router = new express.Router();
const verifyUser = require("../middleware/auth");

//Register System
router.post("/user/register", function (req, res) {
  const fn = req.body.firstname;
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
      firstname: fn,
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
  console.log(req.body) //--->Checking is the data is coming through frontend
  /*** FIRST, WE NEED USERNAME AND PASSWORD FROM CLIENT ***/
  const emailUser = req.body.emailUser;
  const password = req.body.password;

  /*** SECOND, WE NEED TO CHECK IF THE USERNAME EXIST OR NOT ***/
  userModel
    .findOne({ emailUser: emailUser })
    .then(function (userData) {
      //all the data of username is now in the variable userData
      if (userData === null) {
      console.log(" I m here")

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

router.put( "/profile/image/update/:id", upload.single("profileImage"), function (req, res) {
  const uid = req.params.id;
  console.log(uid)
  console.log(req.file.filename)
  // console.log(req.file)
    if (req.file == undefined) {
      return res
        .status(400)
        .json({ message: "only png/jpeg/gif files are allowed!" });
    }
    userModel.updateOne({ _id: uid }, { profile_picUser : req.file.filename})
      .then(function (result) {
      console.log(result)
        res.status(201).json({ message: "Profile Picture Uploaded!" });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
  }
);

/*****  *****/
router.get("/profile/show/:id", function (req, res) {
  const user_id = req.params.id;
  console.log(req.body);
  userModel
    .findOne({ _id: user_id })
    .then(function (data) {
      res.send({ data: data, success: "true" });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

/** DISPLAYING SINGLE USER DATA **/
router.get("/profile/single/:id", verifyUser.verifyUser, function (req, res) {
  console.log("gesagea")
  const id = req.params.id;
  userModel
    .findById(id)
    .then(function (data) {
      res.send({ data: data, success: true });

      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json({});
    });
});
/** END OF DISPLYING SINGLE USER **/

/************** UPDATING USER PROFILE **************/
router.put("/profile/update/:id", verifyUser.verifyUser, function (req, res) {
  const id = req.params.id;
  const un = req.body.username;
  const em = req.body.emailUser;
  const au = req.body.addressUser;
  const pu = req.body.phoneUser;
  // const profile_pic = req.body.profile_pic;
  userModel
    .updateMany(
      { _id: id },
      { username: un, emailUser: em, phoneUser:pu, addressUser:au }
    )
    .then(function (result) {
      res.status(201).json({ message: "Profile Picture Updated!", success: true });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});
/************** END OF UPDATING USER PROFILE **************/

//delete the data
router.delete("/profile/delete/:id", verifyUser.verifyUser, function (req, res) {
  // console.log("Delete function");
  const id = req.params.id;
  userModel
    .deleteOne({ _id: id })
    .then(function (req, res) {
      res.status(201).json({ message: "Data deleted", success:true });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

/***** show the user data *****/
router.get("/profile/showall", verifyUser.verifyUser, function (req, res) {
  // console.log("Hello World");
  userModel
    .find()
    .then(function (data) {
      res.status(201).json({success: true, data: data});
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

//exporting router
module.exports = router;