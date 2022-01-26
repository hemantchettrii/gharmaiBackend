const jwt = require("jsonwebtoken");
const Workers = require("../models/workerModel");

// const seller = require('../models/seller');

//guard
module.exports.verifyWorker = function (req, res, next) {
    try {
        //we have to receive the token from the client...
        // console.log(req.body)
        const token = req.headers.authorization.split(" ")[1];
        //it tires to verify the token provided by client...
        const data = jwt.verify(token, "anysecretkey");

        //worker id is in data now...
        Workers.findOne({ _id: data.workerId })
        .then(function (result) {
            //all the data of the logged in worker is now available in result...
            // console.log("verify vayo hoi");
            req.workerData = result;
            next();
        })
        .catch(function (error) {
            res.status(401).json({ error: error });
        });
    } catch (error) {
        res.status(401).json({ error: error });
    }
};
