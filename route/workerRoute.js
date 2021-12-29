const express = require("express");
const workerModel = require("../models/workerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const verifyUser = require("../middleware/auth");

router.post("/worker/register", function (req, res) {
    const un = req.body.username;
    const em = req.body.email;
    const pw = req.body.password;

    bcrypt.hash(pw, 10, function (err, hash1) {
        const data = new workerModel({ username: un, email: em, password: hash1 });
        data
        .save()
        .then(function (result) {
            res.status(201).json({ message: "Registered successfully" });
        })
        .catch(function (error) {
            res.status(500).json({ message: error });
        });
    })
})

router.post("/worker/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    workerModel
        .findOne({ username: username })
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
            });
        })
        .catch();
})


module.exports = router;
