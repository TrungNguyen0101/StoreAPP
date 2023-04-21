import { Request, Response } from "express";

const shipmentService = require("../services/shipmentService");
const createShipment = async (req: Request, res: Response) => {
  try {
    let shipment = await shipmentService.createShipmentService(req.body);

    return res.status(200).json(shipment);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const findAllShipment = async (req: Request, res: Response) => {
  try {
    let shipment = await shipmentService.findAllShipmentService(req.query);

    return res.status(200).json(shipment);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  createShipment,
  findAllShipment,
};
