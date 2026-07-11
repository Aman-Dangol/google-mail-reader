import { getUserInfo } from "@src/auth";
import { Request, Response } from "express";

export const getCurrentUserInfo = async (_req: Request, res: Response) => {
  const data = await getUserInfo();

  res.json(data);
};
