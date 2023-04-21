const jwt = require("jsonwebtoken");
function authenToken(req, res, next) {
  const authorizationHeader = req?.headers["authorization"];
  // 'Beaer [token]'
  const token = authorizationHeader.split(" ")[1];
  if (token === "null") {
    return res.status(401).json("Vui lòng đăng nhập"); // lỗi chưa đăng nhập
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) return res.status(403).json("Không có quyền truy cập"); // không có quyền
      next();
    });
  }
}
module.exports = {
  authenToken,
};
