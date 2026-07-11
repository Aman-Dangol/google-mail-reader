import { authUrl, getTokens, getUserInfo, setCredentials } from "@src/auth";
import { CustomRequest } from "@src/types/customRequest";
import { logger } from "@src/winston";
import { Request, Response } from "express";

export const getAuth = async (
  req: CustomRequest<{
    query: {
      code: string;
    };
  }>,
  res: Response,
) => {
  const authCode = req.query.code;

  const tokens = await getTokens(authCode);

  // setting credentials so that the oauth client can work with it

  try {
    setCredentials(tokens);

    const data = await getUserInfo();

    logger.info(`${data.email} tried to login`);

    res.cookie("access_token", tokens.access_token, {
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
      secure: true,
    });

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "none",
      secure: true,
    });

    res.json({ message: `Login success`, data }).sendStatus(200);
  } catch {
    res.json("an error occured").sendStatus(403);
  }
};

export const getAuthUrl = (_: Request, res: Response) => {
  logger.info("new auth url sent");
  res.json({ url: authUrl });
};
