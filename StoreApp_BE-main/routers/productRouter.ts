const ProductRouter = require("express").Router();
const productController = require("../controllers/productController");
const { checkRole } = require("../middlewares/checkRoleMW");

ProductRouter.post(
  "/createProduct",
  checkRole(["admin", "manage"]),
  productController.createProduct
);
ProductRouter.put(
  "/updateProductById",
  checkRole(["admin", "manage"]),
  productController.updateProductById
);
ProductRouter.put(
  "/updateDeleteById",
  checkRole(["admin", "manage"]),
  productController.updateDeleteById
);
ProductRouter.put(
  "/updateDeleteByIdAdmin",
  checkRole(["admin"]),
  productController.updateDeleteByIdAdmin
);
ProductRouter.get("/findAllProduct", productController.findAllProduct);
ProductRouter.get(
  "/findAllStorageProduct",
  productController.findAllStorageProduct
);
ProductRouter.get("/findProductById", productController.findProductById);
/* --------------------------------------------------- */
ProductRouter.post(
  "/createProductCart",
  checkRole(["user", "admin", "manage"]),
  productController.createProductCart
);
ProductRouter.get(
  "/findAllProductByUserId",
  productController.findAllProductByUserId
);

module.exports = ProductRouter;
