const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: [
    {
      username:{
        type: String
      },
      emailUser:{
        type: String
      },
      phoneUser:{
        type: String
      },
      address:{
        type: String
      }
    }
  ],
  ServiceId:{
    type: String
  },
  service: [
    {
      serviceName: {
        type: String,
      },
      serviceDetails: {
        type: String,
      },
      servicePrice: {
        type: String,
      },
      serviceCategory: {
        type: String,
      },
    },
  ]
});

const addtocart = mongoose.model("addToCart_table", cartSchema);

module.exports = addtocart;
