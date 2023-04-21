const Account = require("../models/account");
const AccountAddress = require("../models/accountAddress");
const bcrypt = require("bcrypt");
const jwtService = require("jsonwebtoken");
type bodyType = {
  username: string;
  email: string;
  password: string;
  role: string;
};
const createAccountService = async (body: bodyType) => {
  const info = {
    username: body.username,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
    role: body.role,
  };
  const result = await Account.create(info);
  return { result, message: "success" };
};
const loginAccountGoogleService = async (body: bodyType) => {
  const account = await Account.findOne({ email: body.email });
  let userID = account._id.toString();
  if (!account) {
    const info = {
      username: body.username,
      email: body.email,
      role: body.role,
    };
    const result = await Account.create(info);
    userID = result._id.toString();
  }
  const data = {
    userID,
    username: body.username,
    email: body.email,
    role: body.role,
  };
  const accessToken = await jwtService.sign(
    data,
    process.env.ACCESS_TOKEN_SECRET
  );
  return { token: accessToken, message: "Đăng nhập thành công" };
};
const loginAccountService = async (body: bodyType) => {
  const { email, password } = body;
  const account = await Account.findOne({ email: email });
  if (account) {
    const dataToken = {
      email,
      username: account.username,
      userID: account._id.toString(),
      role: account.role,
    };
    const checkPassword = await bcrypt.compare(password, account.password);
    if (checkPassword) {
      const accessToken = await jwtService.sign(
        dataToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      return { token: accessToken, message: "Đăng nhập thành công" };
    }
    throw new Error("Mật khẩu không chính xác");
  }
  throw new Error("Tài khoản không tồn tại");
};
const createAccountAddressService = async (body: any) => {
  const info = {
    userID: body.userID,
    username: body.username,
    phone: body.phone,
    address: body.address,
  };
  const result = await AccountAddress.create(info);
  return { result, message: "success" };
};
const getAllAccountAddressByUsernameService = async (query: any) => {
  const count = await AccountAddress.count();
  const result = await AccountAddress.find({ usernameID: query.usernameID });
  return { count, result, message: "success" };
};
const getAccountAddressByStatusService = async () => {
  const result = await AccountAddress.find({ status: true });
  return { result, message: "success" };
};
const DeleteAccountAddressByIDService = async (query: any) => {
  const accountAddress = await AccountAddress.findOne({ _id: query._id });
  if (accountAddress.status === true) {
    return { status: 404, message: "Không được xóa địa chỉ mặc định" };
  } else {
    const result = await AccountAddress.deleteOne({
      _id: query._id,
    });
    return { result, message: "Xóa thành công" };
  }
};
const UpdateStatusAccountAddressByIDService = async (query: any) => {
  const result1 = await AccountAddress.updateMany({ $set: { status: false } });
  const result = await AccountAddress.update(
    {
      _id: query._id,
    },
    { $set: { status: true } }
  );
  return { result, message: "success" };
};
module.exports = {
  createAccountService,
  loginAccountService,
  loginAccountGoogleService,
  createAccountAddressService,
  getAllAccountAddressByUsernameService,
  DeleteAccountAddressByIDService,
  UpdateStatusAccountAddressByIDService,
  getAccountAddressByStatusService,
};
