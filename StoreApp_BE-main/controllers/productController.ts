import { Request, Response } from "express";

const productService = require("../services/productService");
const createProduct = async (req: Request, res: Response) => {
  try {
    let product = await productService.createProductService(req.body);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const findAllProduct = async (req: Request, res: Response) => {
  try {
    let product = await productService.findAllProductService();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const findAllStorageProduct = async (req: Request, res: Response) => {
  try {
    let product = await productService.findAllStorageProductService();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const findProductById = async (req: Request, res: Response) => {
  try {
    let product = await productService.findProductByIdService(req.query);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    let product = await productService.updateProductByIdService(
      req.body,
      req.query
    );

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateDeleteById = async (req: Request, res: Response) => {
  try {
    let product = await productService.updateDeleteByIdService(
      req.body,
      req.query
    );
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateDeleteByIdAdmin = async (req: Request, res: Response) => {
  try {
    let product = await productService.updateDeleteByIdAdminService(
      req.body,
      req.query
    );
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
/* ---------------------------------------------- */
const createProductCart = async (req: Request, res: Response) => {
  try {
    let product = await productService.createProductCartService(req.body);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const findAllProductByUserId = async (req: Request, res: Response) => {
  try {
    let product = await productService.findAllProductByUserIdService(req.query);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  createProduct,
  findAllProduct,
  updateProductById,
  findProductById,
  updateDeleteById,
  findAllStorageProduct,
  createProductCart,
  findAllProductByUserId,
  updateDeleteByIdAdmin,
};
