const mongooseProduct = require("mongoose");
const productSchema = new mongooseProduct.Schema({
  image1: {
    type: String,
    required: false,
  },
  image2: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, // mặc định sử dụng ngày hiện tại
  },
});
module.exports = mongooseProduct.model("product", productSchema);
