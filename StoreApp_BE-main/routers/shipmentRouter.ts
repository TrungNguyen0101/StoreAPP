const ShipmentRouter = require("express").Router();
const shipmentController = require("../controllers/shipmentController");
// const { checkRole } = require("../middlewares/checkRoleMW");
ShipmentRouter.post("/createShipment", shipmentController.createShipment);
ShipmentRouter.get("/findAllShipment", shipmentController.findAllShipment);
module.exports = ShipmentRouter;
