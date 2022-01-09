const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_ID: {
    type: String,
  },
  cart: [
    {
      serviceID: {
        type: String,
      },
      serviceName: {
        type: String,
      },
      seviceDetails: {
        type: String,
      },
      servicePhoto: {
        type: String,
      },
    },
  ],
});

const addtocart = mongoose.model("addToCart_table", cartSchema);

module.exports = addtocart;
