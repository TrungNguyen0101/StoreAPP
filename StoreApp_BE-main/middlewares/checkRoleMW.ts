import { Request, Response, NextFunction } from "express";
function checkRole(roles: string[] = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req?.headers;
    console.log(
      "🚀 ~ file: checkRoleMW.ts:8 ~ return ~ authorization:",
      authorization
    );
    try {
      if (!authorization) {
        return res.status(401).json("Vui lòng đăng nhập");
      }
      const token = authorization.split(" ")[1];
      const parseToken = parseJwt(token);
      console.log(
        "🚀 ~ file: checkRoleMW.js:13 ~ return ~ parseToken",
        parseToken
      );
      // const user = await authServices.verifyJwt(authorization);
      // Allow other middleware to access the authenticated user detail
      if (roles.length && !roles.includes(parseToken.role)) {
        return res.status(401).json("Không có quyền thực hiện");
      }
      return next();
    } catch (error) {
      return res.status(401).json("Lỗi");
    }
  };
}

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export { checkRole };
