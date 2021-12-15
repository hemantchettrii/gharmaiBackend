const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

// const seller = require('../models/seller');

//guard
module.exports.verifyUser = function (req, res, next) {
  try {
    //we have to receive the token from the client...
    // console.log(req.body)
    const token = req.headers.authorization.split(" ")[1];
    //it tires to verify the token provided by client...
    const data = jwt.verify(token, "anysecretkey");

    //user id is in data now...
    Users.findOne({ _id: data.userId })
      .then(function (result) {
        //all the data of the logged in user is now available in result...
        // console.log("verify vayo hoi");
        req.userData = result;
        next();
      })
      .catch(function (error) {
        res.status(401).json({ error: error });
      });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

/*** 
//if single table...
module.exports.verifyAdmin = function(req, res, next) {
    if (!req.userData) {
        return res.status(401).json({ message: "Unauthorized!" })
    } else if (req.userData.userType !== 'Admin') {
        return res.status(401).json({ message: "Unauthorized!" })
    }
    next();
}
***/
