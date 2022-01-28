const jwt = require("jsonwebtoken");
const Admins = require("../models/adminModel");

// const seller = require('../models/seller');

//guard
module.exports.verifyAdmin = function (req, res, next) {
    try {
        //we have to receive the token from the client...
        // console.log(req.body)
        const token = req.headers.authorization.split(" ")[1];
        //it tires to verify the token provided by client...
        const data = jwt.verify(token, "anysecretkey");

        //admin id is in data now...
        Admins.findOne({ _id: data.adminId })
        .then(function (result) {
            //all the data of the logged in admin is now available in result...
            // console.log("verify vayo hoi");
            req.adminData = result;
            next();
        })
        .catch(function (error) {
            res.status(401).json({ error: error });
        });
    } catch (error) {
        res.status(401).json({ error: error });
    }
};
