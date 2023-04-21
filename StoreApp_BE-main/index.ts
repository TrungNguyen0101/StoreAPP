const express = require("express");
const app = express();
// const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongooseConnect = require("mongoose");

// ----------------- Connection mongodb
mongooseConnect.connect(
  "mongodb+srv://trungnguyen010102hl:nguyenvip12@cluster0.siy1luu.mongodb.net/StoreApp",
  { useNewUrlParser: true },
  function check(err: any) {
    if (err) console.log(err);
    else console.log("Connection");
  }
);
//---------------  cho phép đọc yc http post put và định dạng dữ liệu đó  thành đối tượng js
app.use(express.json());
//---------------- Cho phép chia sẽ tài nguyên
app.use(cors());
// var options = {
//   customJs: ["/custom.js", "https://example.com/other-custom.js"],
// };
//---------------- router
const routerAuth = require("./routers/authRouter");
const routerProduct = require("./routers/productRouter");
const routerShipment = require("./routers/shipmentRouter");
app.use("/api/auth", routerAuth);
app.use("/api/product", routerProduct);
app.use("/api/shipment", routerShipment);

app.get("/", function (req: any, res: any) {
  res.send("Trung Nguyên");
});

app.listen(process.env.PORT, function check(err: any) {
  if (err) console.log("error server");
  console.log("Start server");
});
