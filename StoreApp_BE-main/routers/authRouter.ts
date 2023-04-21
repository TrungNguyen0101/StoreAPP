const AccountRouter = require("express").Router();
const authController = require("../controllers/authController");
// const { authenToken } = require('../middlewares/token')

AccountRouter.post("/createAccount", authController.createAccount);
AccountRouter.post(
  "/createAccountAddress",
  authController.createAccountAddress
);
AccountRouter.get(
  "/getAllAccountAddressByUsername",
  authController.getAllAccountAddressByUsername
);
AccountRouter.get(
  "/getAccountAddressByStatus",
  authController.getAccountAddressByStatus
);
AccountRouter.delete(
  "/DeleteAccountAddressByID",
  authController.DeleteAccountAddressByID
);
AccountRouter.put(
  "/UpdateStatusAccountAddressByID",
  authController.UpdateStatusAccountAddressByID
);
AccountRouter.post("/loginAccount", authController.loginAccount);
AccountRouter.post("/loginAccountGoogle", authController.loginAccountGoogle);

module.exports = AccountRouter;
