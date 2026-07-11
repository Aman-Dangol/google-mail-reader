import { NextFunction, Response } from "express";
import { oauth2 } from "../auth";

const userInfoSetter = (_: Request, __: Response, next: NextFunction) => {
  oauth2.userinfo.get();
  next();
};

export { userInfoSetter };
