const Shipment = require("../models/shipMent");
const ProductCart_1 = require("../models/productCart");

type bodyTypeShipment = {
  accountID: string;
  date: string;
  time: string;
  money: string;
};
const createShipmentService = async (body: bodyTypeShipment) => {
  const info = {
    accountID: body.accountID,
    date: body.date,
    time: body.time,
    money: body.money,
  };
  await ProductCart_1.update({ accountID: body.accountID }, { status: true });
  const result = await Shipment.create(info);

  return { result, message: "success" };
};
const findAllShipmentService = async (query: any) => {
  const { accountID } = query;
  const result = await Shipment.find({ accountID });
  return { result, message: "success" };
};
module.exports = {
  createShipmentService,
  findAllShipmentService,
};
