const { req, res } = require("express");
const express = require("express");
const router = new express.Router();
const subscriptionModel = require("../models/subscriptionModel");
const cartModel = require("../models/cartModel");
const verifyUser = require("../middleware/auth");

router.post(
  "/service/subscribe/:id",
  verifyUser.verifyUser,
  async (req, res) => {
    console.log("fefa");
    const userId = req.params.id;
    const serviceid = req.body.serviceID;
    try {
      const user = await subscriptionModel.findOne({ user_ID: userId });
      const service = await cartModel.findOne({ _id: serviceid });

      if (!service) {
        res.json({ success: "false", message: "Product does not exist" });
      }

      const serviceName = service.serviceName;
      const seviceDetails = course.seviceDetails;
      const servicePhoto = course.servicePhoto;

      if (user) {
        let itemIndex = user.course.findIndex((p) => p.serviceid == serviceid);

        if (itemIndex > -1) {
          let courseItem = user.course[itemIndex];
          user.course[itemIndex] = courseItem;
          res.send({ success: "false", check: "No" });
        } else {
        
          user.course.push({
            serviceid,
            serviceName,
            seviceDetails,
            servicePhoto,
          });
        }
        // save the favorites
        user.save();
        return res.status(201).json({
          success: "true",
        });
      } else {
        const newsublist = await cartModel.create({
          user_ID: userId,
          service: [{ serviceid, serviceName, seviceDetails, servicePhoto }],
        });
      
        console.log("push");
        return res.status(201).json({ success: "true" });
      }
    } catch {
      (error) => {
        res.json({ success: "false", error: error });
      };
    }
  }
);

router.get("/user/getCart/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const subItem = await cartModel.findOne({ user_ID: userId });
    console.log(subItem);
    if (subItem && subItem.course.length > 0) {
      return res.send({ success: "true", SubItem: subItem });
    } else {
      res.send({ check: "empty" });
    }
  } catch (error) {
    res.status(404).json({ success: "false", error: error });
  }
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