const express = require("express");
const workerModel = require("../models/workerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const verifyUser = require("../middleware/auth");

router.post("/worker/register", function (req, res) {
    console.log("register hit")
    const un = req.body.workerName;
    const em = req.body.workerEmail;
    const pw = req.body.workerPassword;
    const pic = req.body.workerProfile_pic;
    const dob = req.body.workerDateOfBirth;
    const add = req.body.workerAddress;
    const gen = req.body.workerGender;
    const con = req.body.workerContactNo;
    

    bcrypt.hash(pw, 10, function (err, hash1) {
        const data = new workerModel({ 
            workerName: un, 
            workerEmail: em,
            workerProfile_pic: pic,
            workerDateOfBirth: dob, 
            workerAddress: add,   
            workerGender: gen, 
            workerContactNo: con,  
            workerPassword: hash1,
         });
         console.log(data)
        data
        .save()
        .then(function (result) {
            res.status(201).json({ message: "Registered successfully", success:true });
            console.log("Register Success")

        })
        .catch(function (error) {
            res.status(500).json({ message: error });
        });
    })
})

router.post("/worker/login", function (req, res) {
    console.log("Login hit")
    const workerEmail = req.body.workerEmail;
    const password = req.body.workerPassword;

    workerModel
        .findOne({ workerEmail: workerEmail })
        .then(function (userData) {
            if (userData === null) {
            return res.status(403).json({ message: "Invalid Credentials!" });
            }
            bcrypt.compare(password, userData.password, function (err, result) {
            if (result === false) {
                return res.status(403).json({ message: "Invalid Credentials!" });
            }
            const token = jwt.sign({ userId: userData._id }, "anysecretkey");
            res
                .status(200).json({
                    t: token, userId: userData._id, success: true, message: "Authorization Success!!!",
                });
                console.log("Login Success")
            });
        })
        .catch();
})


module.exports = router;
