const { req, res, request } = require("express");
const express = require("express");
const router = new express.Router();
const subscriptionModel = require("../models/cartModel");
const serviceModel = require("../models/serviceModel");
const userModel = require("../models/userModel");
const verifyUser = require("../middleware/auth");

router.post(
  "/service/subscribe/:id",
  verifyUser.verifyUser,
  async (req, res) => {
    console.log("Hit")
    const userId = req.params.id;
    const serviceid = req.body.serviceID;
    try {
      const users = await userModel.findOne({userId: userId})
      const user = await serviceModel.findOne({ user: userId, serviceId: serviceid });
      const service = await subscriptionModel.findOne({serviceID: serviceid})
            console.log(
              "users "+users, 
              "user "+user, 
              "service "+service)
      if (!user){
        res.json({ success: false, message: "product already booked"});
        console.log("i m here")
      }
      else{
        const data = new subscriptionModel({
          user: users,
          // ServiceId: serviceid,
          service: user

        });

        console.log(data)
        data
        .save()
        .then(function (result) {
          console.log("save" + data);
          res.status(201).json({ message: "Booked", success: true });
        })
        .catch(function (err) {
          res.status(500).json({ message: err });
          console.log(err);
        });
      }

    
    } catch {
      (error) => {
        res.json({ success: "false", error: error });
      };
    }
  }
);

router.get("/user/getCart", async (req, res) => {
  const userId = req.params.id;
console.log("booking hit ")

  subscriptionModel
  .find()
  .then(function (data) {
    res.status(201).json({ 
      success: true, 
      data: data, 
     });
    console.log("service data "+  data)
  })

  .catch(function (err) {
    res.status(500).json({ message: err });
  });
  // try {
  //   const subItem = await cartModel.findOne({ user_ID: userId });
  //   console.log(subItem);
  //   if (subItem && subItem.course.length > 0) {
  //     return res.send({ success: "true", SubItem: subItem });
  //   } else {
  //     res.send({ check: "empty" });
  //   }
  // } catch (error) {
  //   res.status(404).json({ success: "false", error: error });
  // }
});

// delete cart item
router.delete("/user/deleteItem/:id/:serviceid", async (request, response) => {
  const userId = request.params.id;
  const serviceid = request.params.serviceid;
  console.log(userId, serviceid);
  try {
    let subitem = await cartModel.findOne({ user_ID: userId });
    let itemIndex = subitem.course.findIndex((p) => p.serviceid == serviceid);
    console.log(itemIndex);

    if (itemIndex > -1) {
      subitem.course.splice(itemIndex, 1);
    }

    subitem.save();
    return response.send({ success: "true", SubItem: subitem });
  } catch (error) {
    response.status(404).json({ success: "false", error: error });
  }
});

module.exports = router;
