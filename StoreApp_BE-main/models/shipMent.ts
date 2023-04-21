const mongooseShipment = require("mongoose");
const productShipment = new mongooseShipment.Schema({
  accountID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
  money: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: false,
  },
});
module.exports = mongooseShipment.model("Shipment", productShipment);
