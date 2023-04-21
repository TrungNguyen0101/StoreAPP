const Product = require("../models/product");
const ProductCart = require("../models/productCart");

type bodyTypeProduct = {
  brand: string;
  image1: string;
  image2: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  _id: string;
};
const createProductService = async (body: bodyTypeProduct) => {
  const info = {
    brand: body.brand,
    image1: body.image1,
    image2: body.image2,
    name: body.name,
    price: body.price,
    quantity: body.quantity,
    size: body.size,
  };
  const result = await Product.create(info);

  return { result, message: "success" };
};
const findAllProductService = async () => {
  const result = await Product.find({ delete: false });
  const result_1 = await ProductCart.find({ status: true });
  let counts = result_1.reduce((acc: any, obj: any) => {
    let key = obj.productID;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;

    return acc;
  }, {});
  return { result, counts, message: "success" };
};
const findAllStorageProductService = async () => {
  const result = await Product.find({ delete: true });
  return { result, message: "success" };
};
const findProductByIdService = async (query: any) => {
  const { id } = query;
  const result = await Product.findOne({ _id: id });
  return { result, message: "success" };
};
const updateProductByIdService = async (body: bodyTypeProduct, query: any) => {
  const { id } = query;
  const result = await Product.update(
    { _id: id },
    {
      brand: body.brand,
      image1: body.image1,
      image2: body.image2,
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      size: body.size,
    }
  );

  return { result, message: "success" };
};
const updateDeleteByIdService = async (body: any, query: any) => {
  const { id } = query;
  const result = await Product.update({ _id: id }, { delete: true });
  return { result, message: "success" };
};
const updateDeleteByIdAdminService = async (body: any, query: any) => {
  const { id } = query;
  const result = await Product.update({ _id: id }, { delete: false });
  return { result, message: "success" };
};
/* ------------------------------------------- */
const createProductCartService = async (body: any) => {
  const info = {
    accountID: body.accountID,
    productID: body.productID,
  };
  const product = await Product.findOne({ _id: body.productID });
  if (product) {
    if (parseInt(product.quantity) >= 1) {
      let quantityNew = parseInt(product.quantity) - 1;
      await ProductCart.create(info);
      await Product.update(
        { _id: body.productID },
        { quantity: quantityNew.toString() }
      );
    } else return { product, message: "Sản phẩm đã hết hàng" };
  } else return { product, message: "success" };
};
const findAllProductByUserIdService = async (query: any) => {
  const { accountID } = query;
  const result = await ProductCart.find({ accountID, status: false });
  return { result, message: "success" };
};
module.exports = {
  createProductService,
  findAllProductService,
  updateProductByIdService,
  findProductByIdService,
  updateDeleteByIdService,
  findAllStorageProductService,
  createProductCartService,
  findAllProductByUserIdService,
  updateDeleteByIdAdminService,
};
