const mongooseAccountAddress = require("mongoose");
const accountAddressSchema = new mongooseAccountAddress.Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongooseAccountAddress.model(
  "AccountAddress",
  accountAddressSchema
);
