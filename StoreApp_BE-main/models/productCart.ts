const mongooseProductCart = require("mongoose");
const productCartSchema = new mongooseProductCart.Schema({
  productID: {
    type: String,
    required: true,
  },
  accountID: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongooseProductCart.model("ProductCart", productCartSchema);
